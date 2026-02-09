"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, #111827 1px, transparent 1px), linear-gradient(to bottom, #111827 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6"
            >
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-gray-700">
                Automated Client Acquisition for B2B Consultants
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Get 8-15 Qualified Discovery Calls{" "}
              <span className="block mt-2">Every Month.</span>
              <span className="block text-primary mt-4 text-4xl lg:text-5xl">Guaranteed.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              We build and run your outbound acquisition system end-to-end — so you only
              show up to pre-qualified calls with decision-makers who have budget and authority.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Link href={CALENDLY_URL} target="_blank" className="btn-primary inline-flex items-center gap-2">
                See If You Qualify
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                    SM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                    DC
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                    MT
                  </div>
                </div>
                <span className="font-medium">Trusted by 40+ B2B consultants • Avg. 95% show-up rate</span>
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex items-center gap-2 text-sm text-gray-500"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="font-medium">Serving B2B Coaches & Consultants Since 2024</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>

              {/* Profile Image */}
              <div className="relative z-10 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/profile-photo.png"
                  alt="Thomas Willis - Founder, ReIgnite Acquisition"
                  width={500}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 rounded-full p-3">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Show-Up Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
