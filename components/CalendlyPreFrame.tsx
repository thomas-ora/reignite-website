"use client";

import { CheckCircle2 } from "lucide-react";

export default function CalendlyPreFrame() {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            What Happens on This Call?
          </h3>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 text-left">
            <p className="text-gray-700 mb-6 text-lg">
              We'll quickly assess in under 30 minutes:
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">
                  Whether your offer is a fit for our acquisition system
                </span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">
                  If we can realistically deliver 8-15 qualified appointments per month
                </span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">
                  What your first 30 days would look like
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-5">
              <p className="text-base font-semibold text-gray-900 text-center">
                If it's not a fit, I'll tell you straight — no pressure, no pitch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
