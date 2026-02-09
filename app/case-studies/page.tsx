"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { caseStudies, CALENDLY_URL } from "@/lib/constants";
import Footer from "@/components/Footer";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Real Results from Real Clients
            </h1>
            <p className="text-xl text-gray-600">
              See how B2B consultants scaled their businesses with predictable, qualified appointments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {study.clientName}
                      </h3>
                      <p className="text-primary font-medium">{study.industry}</p>
                    </div>
                    <div className="bg-accent/20 rounded-full p-2">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-500 mb-2">THE CHALLENGE</div>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                </div>

                {/* Result Headline */}
                <div className="bg-gradient-to-r from-accent to-primary p-6">
                  <div className="text-white text-center">
                    <div className="text-sm font-semibold mb-2">THE RESULT</div>
                    <h4 className="text-2xl font-bold">{study.resultHeadline}</h4>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Before */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="text-sm font-bold text-gray-500 mb-4">{study.beforeMetrics.label}</div>
                      <ul className="space-y-3">
                        {study.beforeMetrics.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6">
                      <div className="text-sm font-bold text-accent mb-4">{study.afterMetrics.label}</div>
                      <ul className="space-y-3">
                        {study.afterMetrics.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-900 font-medium flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-surface rounded-xl p-6 mb-6">
                    <p className="text-gray-700 italic leading-relaxed mb-4">
                      "{study.testimonial}"
                    </p>
                    <div className="text-sm font-medium text-gray-900">{study.clientName}</div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{study.timeline}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    className="btn-primary w-full justify-center inline-flex items-center gap-2"
                  >
                    See If You Qualify
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a discovery call to see how we can fill your calendar with qualified appointments
            </p>
            <Link href={CALENDLY_URL} target="_blank" className="btn-primary inline-flex items-center gap-2">
              See If You Qualify
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
