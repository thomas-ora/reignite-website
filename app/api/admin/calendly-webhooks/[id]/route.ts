import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Simple decryption for API keys (match the encryption in the main route)
function decryptApiKey(encrypted: string): string {
  // TODO: Replace with proper decryption
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { data: webhook, error } = await supabase
      .from('calendly_webhooks')
      .select('id, client_name, client_slug, webhook_path, webhook_url, calendly_org_uri, calendly_webhook_id, status, created_at, n8n_workflow_id, n8n_workflow_name')
      .eq('id', id)
      .single();

    if (error || !webhook) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ webhook });

  } catch (error: any) {
    console.error('Error fetching webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { n8n_workflow_id, n8n_workflow_name, status } = body;

    const updates: any = {};
    if (n8n_workflow_id !== undefined) updates.n8n_workflow_id = n8n_workflow_id;
    if (n8n_workflow_name !== undefined) updates.n8n_workflow_name = n8n_workflow_name;
    if (status !== undefined) updates.status = status;

    const { data: webhook, error } = await supabase
      .from('calendly_webhooks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ webhook });

  } catch (error: any) {
    console.error('Error updating webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // 1. Get webhook details
    const { data: webhook, error: fetchError } = await supabase
      .from('calendly_webhooks')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !webhook) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      );
    }

    // 2. Delete from Calendly
    const apiKey = decryptApiKey(webhook.calendly_api_key_encrypted);
    const deleteResponse = await fetch(
      `https://api.calendly.com/webhook_subscriptions/${webhook.calendly_webhook_id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    if (!deleteResponse.ok && deleteResponse.status !== 404) {
      console.error('Failed to delete Calendly webhook, but continuing with database deletion');
    }

    // 3. Delete from database
    const { error: deleteError } = await supabase
      .from('calendly_webhooks')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Webhook for ${webhook.client_name} deleted successfully`
    });

  } catch (error: any) {
    console.error('Error deleting webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
