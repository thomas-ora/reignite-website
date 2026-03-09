'use client';

import { useState, useEffect } from 'react';
import { Plus, Copy, Check, ExternalLink, Trash2, AlertCircle, ChevronDown, Sparkles } from 'lucide-react';

interface Webhook {
  id: string;
  client_name: string;
  client_slug: string;
  webhook_path: string;
  webhook_url: string;
  calendly_org_uri: string;
  calendly_webhook_id: string;
  status: 'active' | 'inactive' | 'error';
  created_at: string;
  n8n_workflow_id?: string;
  n8n_workflow_name?: string;
}

interface WebhookFormData {
  clientName: string;
  calendlyApiKey: string;
}

interface OnboardedClient {
  id: string;
  client_name: string;
  client_email: string;
  calendly_token: string;
  calendly_link: string;
  created_at: string;
  has_webhook: boolean;
}

export default function CalendlyWebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<WebhookFormData>({
    clientName: '',
    calendlyApiKey: ''
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdWebhook, setCreatedWebhook] = useState<Webhook | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Auto-fill states
  const [availableClients, setAvailableClients] = useState<OnboardedClient[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState<OnboardedClient | null>(null);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  useEffect(() => {
    if (showCreateForm) {
      fetchAvailableClients();
    }
  }, [showCreateForm]);

  const fetchWebhooks = async () => {
    try {
      const response = await fetch('/api/admin/calendly-webhooks');
      const data = await response.json();
      setWebhooks(data.webhooks || []);
    } catch (err) {
      console.error('Error fetching webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableClients = async () => {
    setLoadingClients(true);
    try {
      const response = await fetch('/api/admin/calendly-webhooks/clients');
      const data = await response.json();
      setAvailableClients(data.clients || []);
    } catch (err) {
      console.error('Error fetching available clients:', err);
    } finally {
      setLoadingClients(false);
    }
  };

  const handleClientSelect = (client: OnboardedClient) => {
    setSelectedClient(client);
    setFormData({
      clientName: client.client_name,
      calendlyApiKey: client.calendly_token
    });
    setShowClientDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/calendly-webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create webhook');
      }

      setCreatedWebhook(data.webhook);
      setFormData({ clientName: '', calendlyApiKey: '' });
      setSelectedClient(null);
      setShowCreateForm(false);
      fetchWebhooks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!confirm(`Delete webhook for ${clientName}? This will also delete the webhook from Calendly.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/calendly-webhooks/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchWebhooks();
      }
    } catch (err) {
      console.error('Error deleting webhook:', err);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading webhooks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Calendly Webhooks</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage Calendly webhook subscriptions for client booking tracking
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Webhook
          </button>
        </div>

        {/* Success Modal */}
        {createdWebhook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Webhook Created for {createdWebhook.client_name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Copy these details for your n8n workflow
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Webhook URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Webhook URL
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono">
                      {createdWebhook.webhook_url}
                    </code>
                    <button
                      onClick={() => copyToClipboard(createdWebhook.webhook_url, 'url')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {copiedField === 'url' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Webhook Path */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Webhook Path (for n8n)
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono">
                      {createdWebhook.webhook_path}
                    </code>
                    <button
                      onClick={() => copyToClipboard(createdWebhook.webhook_path, 'path')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {copiedField === 'path' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Organization URI */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Organization URI
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono text-xs">
                      {createdWebhook.calendly_org_uri}
                    </code>
                    <button
                      onClick={() => copyToClipboard(createdWebhook.calendly_org_uri, 'org')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {copiedField === 'org' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Webhook ID */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Webhook Subscription ID
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono text-xs">
                      {createdWebhook.calendly_webhook_id}
                    </code>
                    <button
                      onClick={() => copyToClipboard(createdWebhook.calendly_webhook_id, 'id')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {copiedField === 'id' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">📝 Next Steps (Manual in n8n):</h3>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Duplicate base workflow in n8n</li>
                  <li>Open "Calendly Webhook" trigger node</li>
                  <li>Update "Path" field to: <code className="bg-white px-1 py-0.5 rounded">{createdWebhook.webhook_path}</code></li>
                  <li>Update Google Sheet IDs in 3 logging nodes</li>
                  <li>Save & Activate workflow</li>
                </ol>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCreatedWebhook(null)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Calendly Webhook</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Auto-fill from Onboarded Clients */}
            {availableClients.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Fill from Onboarded Clients
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowClientDropdown(!showClientDropdown)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">
                        {selectedClient ? selectedClient.client_name : 'Select an onboarded client to auto-fill'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showClientDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showClientDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                      {loadingClients ? (
                        <div className="p-3 text-sm text-gray-500 text-center">Loading clients...</div>
                      ) : (
                        availableClients.map(client => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => handleClientSelect(client)}
                            className="w-full px-4 py-3 hover:bg-gray-50 text-left flex items-center justify-between group"
                          >
                            <div>
                              <div className="font-medium text-gray-900">{client.client_name}</div>
                              <div className="text-xs text-gray-500">{client.client_email}</div>
                            </div>
                            {client.has_webhook && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Has webhook
                              </span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {availableClients.filter(c => !c.has_webhook).length} clients available without webhooks
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => {
                      setFormData({ ...formData, clientName: e.target.value });
                      setSelectedClient(null);
                    }}
                    placeholder="e.g., Lumyna"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      selectedClient ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                    }`}
                  />
                  {selectedClient && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Auto-filled
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calendly API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.calendlyApiKey}
                    onChange={(e) => {
                      setFormData({ ...formData, calendlyApiKey: e.target.value });
                      setSelectedClient(null);
                    }}
                    placeholder="Paste client's Calendly Personal Access Token"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm ${
                      selectedClient ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                    }`}
                  />
                  {selectedClient && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Auto-filled
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedClient
                    ? `✓ API key auto-filled from ${selectedClient.client_name}'s onboarding form`
                    : 'Get from client\'s Calendly account → Integrations → API & Webhooks'
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setError(null);
                    setSelectedClient(null);
                    setFormData({ clientName: '', calendlyApiKey: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Create Webhook'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Webhooks List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Webhooks</h2>
          </div>

          {webhooks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No webhooks configured yet</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Create your first webhook →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {webhook.client_name}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          webhook.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : webhook.status === 'error'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {webhook.status === 'active' ? '✅ Active' :
                           webhook.status === 'error' ? '❌ Error' : '⏸️ Paused'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Webhook:</span>
                          <code className="text-sm font-mono text-gray-700">{webhook.webhook_path}</code>
                          <button
                            onClick={() => copyToClipboard(webhook.webhook_path, `path-${webhook.id}`)}
                            className="p-1 hover:bg-gray-200 rounded transition"
                          >
                            {copiedField === `path-${webhook.id}` ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {webhook.n8n_workflow_name && (
                          <div className="text-xs text-gray-500">
                            n8n Workflow: {webhook.n8n_workflow_name}
                          </div>
                        )}
                        <div className="text-xs text-gray-400">
                          Created {new Date(webhook.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={webhook.webhook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                        title="View webhook URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(webhook.id, webhook.client_name)}
                        className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                        title="Delete webhook"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
