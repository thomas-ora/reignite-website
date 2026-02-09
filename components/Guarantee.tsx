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
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                We guarantee a minimum of <span className="font-bold text-primary">8 qualified appointments per month</span>.
                If we don't hit the minimum, you pay only for the appointments we delivered.
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">No Show? No Charge</div>
                    <p className="text-gray-600 text-sm">We only charge for appointments that show up to the call</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Not Qualified? Refund</div>
                    <p className="text-gray-600 text-sm">If they don't meet your criteria, we refund you immediately</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Decision-Makers Only</div>
                    <p className="text-gray-600 text-sm">Every call is with someone who has budget and authority</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Cancel Anytime</div>
                    <p className="text-gray-600 text-sm">No long-term contracts. Month-to-month only</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8">
                <p className="text-lg font-bold text-gray-900 text-center">
                  We only win when you win. That's the ReIgnite promise.
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
