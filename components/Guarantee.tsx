"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";

export default function Guarantee() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Guarantee Badge */}
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-2xl">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Iron-Clad Guarantee
            </h2>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              {/* Guarantee Points */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Minimum 8 qualified appointments per month
                    </div>
                    <p className="text-gray-600">
                      If we don't hit 8, you only pay for what we delivered
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Only pay for calls that show up
                    </div>
                    <p className="text-gray-600">
                      No-show? We refund you immediately — no questions asked
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Not qualified? Immediate refund
                    </div>
                    <p className="text-gray-600">
                      If they don't meet your criteria, we refund the appointment fee
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Decision-makers only
                    </div>
                    <p className="text-gray-600">
                      Every call is with someone who has budget and authority to buy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Cancel anytime
                    </div>
                    <p className="text-gray-600">
                      No long-term contracts — month-to-month only
                    </p>
                  </div>
                </div>
              </div>

              {/* We Only Win Callout */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8">
                <p className="text-lg font-bold text-gray-900 text-center mb-2">
                  We only win when you win.
                </p>
                <p className="text-sm text-gray-700 text-center">
                  Our revenue depends on booked, qualified calls showing up — not empty promises.
                </p>
              </div>

              <div className="text-center">
                <Link href={CALENDLY_URL} target="_blank" className="btn-primary inline-flex items-center gap-2">
                  See If You Qualify
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-sm text-gray-500 mt-4">
                  30-minute discovery call • No obligation • No pressure
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
