"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { HiArrowRight } from "react-icons/hi2";
import { useTheme } from "next-themes";

export default function CtaSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className={`relative overflow-hidden py-28 ${
        isLight ? "bg-gray-50" : "bg-black"
      }`}
    >
      {/* Globe */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[600px] w-full max-w-3xl">
          <Image
            src="/cta-bg.png"
            alt=""
            fill
            className={`object-contain ${isLight ? "opacity-15" : "opacity-40"}`}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.2),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className={`mb-6 text-5xl font-black leading-tight lg:text-6xl ${
              isLight ? "text-gray-900" : "text-white"
            }`}
          >
            Your next role is<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              already looking for you
            </span>
          </h2>

          <p className={`mb-12 text-lg ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              as={Link}
              href="/register"
              size="lg"
              endContent={<HiArrowRight className="h-5 w-5" />}
              className="rounded-2xl bg-white px-10 font-semibold text-gray-900 shadow-xl transition hover:scale-105"
            >
              Create a free account
            </Button>
            <Button
              as={Link}
              href="/pricing"
              size="lg"
              variant="bordered"
              className={`rounded-2xl px-10 font-semibold ${
                isLight
                  ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              View pricing
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}