"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiMagnifyingGlass, HiMapPin } from "react-icons/hi2";
import { RiSparkleFill } from "react-icons/ri";

const popularSearches = ["UI/UX Designer", "React Developer", "Product Manager", "Data Scientist"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* BG Globe image */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
        <div className="relative h-[700px] w-full max-w-4xl">
          <Image
            src="/globe.png"
            alt="Globe"
            fill
            className="object-contain object-bottom opacity-70"
            priority
          />
        </div>
      </div>

      {/* CTA BG */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/cta-bg.png"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Radial glow top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-10 text-center lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
        >
          <RiSparkleFill className="h-4 w-4 text-violet-400" />
          AI-Powered Job Matching Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-white lg:text-7xl"
        >
          Find Your{" "}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Dream Job
          </span>{" "}
          with AI Precision
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          Connect with thousands of top companies. Let our AI match you with the perfect role based on your skills, experience, and career goals.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 w-full max-w-3xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <HiMagnifyingGlass className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords..."
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <HiMapPin className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>
            <button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30">
              Search Jobs
            </button>
          </div>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-gray-500">Popular:</span>
          {popularSearches.map((term) => (
            <Link
              key={term}
              href={`/jobs?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400 transition hover:border-violet-500/50 hover:text-white"
            >
              {term}
            </Link>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-12"
        >
          {[
            { value: "50K+", label: "Active Jobs" },
            { value: "12K+", label: "Companies" },
            { value: "2M+", label: "Job Seekers" },
            { value: "98%", label: "Match Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}