import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface CreateWebhookRequest {
  clientName: string;
  calendlyApiKey: string;
}

interface CalendlyUserResponse {
  resource: {
    current_organization: string;
    email: string;
    name: string;
    uri: string;
  };
}

interface CalendlyWebhookResponse {
  resource: {
    uri: string;
    callback_url: string;
    state: string;
    events: string[];
    organization: string;
  };
}

// Simple encryption for API keys (use a proper encryption library in production)
function encryptApiKey(apiKey: string): string {
  // TODO: Replace with proper encryption using crypto module
  // For now, just base64 encode (NOT SECURE - replace in production)
  return Buffer.from(apiKey).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateWebhookRequest = await request.json();
    const { clientName, calendlyApiKey } = body;

    // Validate inputs
    if (!clientName || !calendlyApiKey) {
      return NextResponse.json(
        { error: 'Client name and Calendly API key are required' },
        { status: 400 }
      );
    }

    // 1. Validate Calendly API key & get org URI
    const calendlyUserResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${calendlyApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!calendlyUserResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Calendly API key' },
        { status: 401 }
      );
    }

    const calendlyUser: CalendlyUserResponse = await calendlyUserResponse.json();
    const orgUri = calendlyUser.resource.current_organization;

    // 2. Generate webhook details
    const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const webhookPath = `calendly-${clientSlug}`;
    const webhookUrl = `https://n8n.srv974745.hstgr.cloud/webhook/${webhookPath}`;

    // 3. Check if webhook already exists
    const { data: existingWebhook } = await supabase
      .from('calendly_webhooks')
      .select('*')
      .eq('client_slug', clientSlug)
      .single();

    if (existingWebhook) {
      return NextResponse.json(
        { error: `Webhook already exists for client: ${clientName}` },
        { status: 409 }
      );
    }

    // 4. Create Calendly webhook subscription
    const webhookSubscriptionResponse = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${calendlyApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ['invitee.created', 'invitee.canceled'],
        organization: orgUri,
        scope: 'organization'
      })
    });

    if (!webhookSubscriptionResponse.ok) {
      const error = await webhookSubscriptionResponse.json();
      return NextResponse.json(
        { error: `Failed to create Calendly webhook: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    const webhookData: CalendlyWebhookResponse = await webhookSubscriptionResponse.json();
    const webhookId = webhookData.resource.uri.split('/').pop()!;

    // 5. Store in database
    const { data: webhook, error: dbError } = await supabase
      .from('calendly_webhooks')
      .insert({
        client_name: clientName,
        client_slug: clientSlug,
        calendly_api_key_encrypted: encryptApiKey(calendlyApiKey),
        calendly_org_uri: orgUri,
        calendly_webhook_id: webhookId,
        webhook_path: webhookPath,
        webhook_url: webhookUrl,
        status: 'active'
      })
      .select()
      .single();

    if (dbError) {
      // Try to clean up Calendly webhook if database insert fails
      await fetch(`https://api.calendly.com/webhook_subscriptions/${webhookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${calendlyApiKey}`
        }
      });

      return NextResponse.json(
        { error: `Failed to save webhook: ${dbError.message}` },
        { status: 500 }
      );
    }

    // 6. Return success response
    return NextResponse.json({
      success: true,
      webhook: {
        id: webhook.id,
        clientName: webhook.client_name,
        webhookUrl: webhook.webhook_url,
        webhookPath: webhook.webhook_path,
        calendlyOrgUri: webhook.calendly_org_uri,
        calendlyWebhookId: webhook.calendly_webhook_id,
        status: webhook.status
      },
      nextSteps: [
        'Duplicate base workflow in n8n',
        `Update webhook path to: ${webhookPath}`,
        'Update Google Sheet IDs in 3 logging nodes',
        'Save and activate workflow'
      ]
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating Calendly webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: List all webhooks
export async function GET(request: NextRequest) {
  try {
    const { data: webhooks, error } = await supabase
      .from('calendly_webhooks')
      .select('id, client_name, client_slug, webhook_path, webhook_url, status, created_at, n8n_workflow_id, n8n_workflow_name')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ webhooks });

  } catch (error: any) {
    console.error('Error fetching webhooks:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
