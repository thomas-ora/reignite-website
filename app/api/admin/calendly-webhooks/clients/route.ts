import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface OnboardedClient {
  id: string;
  client_name: string;
  client_email: string;
  calendly_token: string;
  calendly_link: string;
  created_at: string;
  has_webhook: boolean;
}

export async function GET(request: NextRequest) {
  try {
    // First, get all existing webhooks to know which clients already have them
    const { data: existingWebhooks } = await supabase
      .from('calendly_webhooks')
      .select('client_name, client_slug');

    const existingClientNames = new Set(
      existingWebhooks?.map(w => w.client_name.toLowerCase()) || []
    );

    // Get all clients from campaign_batches (where onboarding data is stored)
    // This assumes onboarding data is stored here based on the campaigns.js file
    const { data: clients, error } = await supabase
      .from('campaign_batches')
      .select('*')
      .not('form_data', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      return NextResponse.json(
        { error: 'Failed to fetch clients' },
        { status: 500 }
      );
    }

    // Transform and filter the data
    const availableClients: OnboardedClient[] = [];

    for (const client of clients || []) {
      try {
        // Parse form_data if it's a JSON string
        const formData = typeof client.form_data === 'string'
          ? JSON.parse(client.form_data)
          : client.form_data;

        // Extract client info and Calendly data
        const clientName = formData?.q2_brandName ||
                          formData?.client_name ||
                          client.client_name ||
                          'Unknown Client';

        const calendlyToken = formData?.q33_calendlyToken || '';
        const calendlyLink = formData?.q32_calendlyLink || '';

        // Only include clients with Calendly tokens
        if (calendlyToken) {
          availableClients.push({
            id: client.id,
            client_name: clientName,
            client_email: formData?.client_email || client.client_email || '',
            calendly_token: calendlyToken,
            calendly_link: calendlyLink,
            created_at: client.created_at,
            has_webhook: existingClientNames.has(clientName.toLowerCase())
          });
        }
      } catch (parseError) {
        console.error('Error parsing client data:', parseError);
        // Skip this client if data can't be parsed
      }
    }

    // Sort by creation date and whether they have a webhook
    availableClients.sort((a, b) => {
      // Clients without webhooks first
      if (a.has_webhook !== b.has_webhook) {
        return a.has_webhook ? 1 : -1;
      }
      // Then by creation date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return NextResponse.json({
      clients: availableClients,
      total: availableClients.length,
      withWebhooks: availableClients.filter(c => c.has_webhook).length,
      withoutWebhooks: availableClients.filter(c => !c.has_webhook).length
    });

  } catch (error: any) {
    console.error('Error in calendly-webhooks/clients:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}