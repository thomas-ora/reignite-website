"use client";

import { motion } from "framer-motion";
import { Target, Clock, Shield } from "lucide-react";

const promises = [
  {
    icon: Target,
    title: "No Prospecting. No Chasing. No Admin.",
    description: "We handle outreach, list building, qualification, and booking — you just show up to calls with ready-to-buy prospects",
  },
  {
    icon: Clock,
    title: "Decision-Makers Only",
    description: "Every call is with someone who has budget, authority, and an active need — not tire-kickers or researchers",
  },
  {
    icon: Shield,
    title: "Pay on Results",
    description: "Only pay for qualified appointments that show up. No show? No charge. Don't hit 8 appointments? You don't pay the minimum.",
  },
];

export default function ResultsPromise() {
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
            What You Get
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A predictable pipeline of qualified appointments. Every single month.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group bg-white rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-300 ${
                  index === 2 ? 'border-accent/30 bg-accent/5' : 'border-gray-100 hover:border-primary/30'
                }`}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {promise.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {promise.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
