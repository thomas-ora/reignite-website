"use client";

import { motion } from "framer-motion";
import { Phone, Settings, CalendarCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Fit & Qualification Call",
    description: "We assess your offer, ideal client profile, and buying signals to ensure we can realistically deliver 8-15 qualified appointments per month",
  },
  {
    number: "02",
    icon: Settings,
    title: "Campaign Setup",
    description: "We build your automated acquisition system and dial in your messaging (2-3 weeks)",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Qualified Appointments",
    description: "Start receiving 8-15 qualified discovery calls per month, guaranteed",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to a predictable pipeline
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20"></div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  {/* Step Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (Desktop Only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 text-primary/30">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-accent/20">
            <div className="w-4 h-4 rounded-full bg-accent animate-pulse"></div>
            <div className="text-left">
              <div className="text-sm font-bold text-gray-900">Typical Timeline</div>
              <div className="text-sm text-gray-600">3-4 weeks from call to first appointments</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
