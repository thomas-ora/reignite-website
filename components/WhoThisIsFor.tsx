"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const idealFor = [
  "B2B coaches and consultants",
  "Typically working with consultants at ~$500k+/year",
  "Proven offer with client results",
  "Ready to scale predictably",
  "Decision-maker access critical",
  "Best suited for $5k+ services (where one client covers acquisition costs)",
];

const notFor = [
  "Startups without proven offer",
  "B2C or product-based businesses",
  "Revenue under $500k/year",
  "Looking for 'cheap leads'",
  "Not willing to invest in growth",
  "Low-ticket offers under $2k",
];

export default function WhoThisIsFor() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Is ReIgnite Right for You?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We work with established B2B consultants ready to scale. Here's who we're a fit for.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Who This IS For */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border-2 border-accent/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent rounded-full p-2">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Who This IS For</h3>
            </div>

            <ul className="space-y-4">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who This is NOT For */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-400 rounded-full p-2">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Who This ISN'T For</h3>
            </div>

            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            If you're in the left column, let's talk.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              We only work with 20 clients at a time to ensure quality
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
