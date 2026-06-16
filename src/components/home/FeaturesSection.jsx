"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Card } from "@heroui/react";
import {
  HiMagnifyingGlass, HiChartBar, HiBuildingOffice2,
  HiBookmark, HiCursorArrowRays, HiDocumentText,
  HiPuzzlePiece, HiArrowTrendingUp,
} from "react-icons/hi2";

const features = [
  { icon: HiMagnifyingGlass, title: "Smart Search", desc: "Find your ideal job with advanced filters." },
  { icon: HiChartBar, title: "Salary Insights", desc: "Get real salary data to negotiate confidently." },
  { icon: HiBuildingOffice2, title: "Top Companies", desc: "Apply to vetted companies that are hiring." },
  { icon: HiBookmark, title: "Saved Jobs", desc: "Manage apps & favorites on your dashboard." },
  { icon: HiCursorArrowRays, title: "One-Click Apply", desc: "Simplify your job applications for an easier process!" },
  { icon: HiDocumentText, title: "Resume Builder", desc: "Create professional resumes with modern templates." },
  { icon: HiPuzzlePiece, title: "Skill-Based Matching", desc: "Discover jobs that match your skills and experience." },
  { icon: HiArrowTrendingUp, title: "Career Growth Resources", desc: "Boost your career with quick interview tips." },
];

export default function FeaturesSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section className={`relative py-28 ${isLight ? "bg-white" : "bg-black"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
            Smart Job Discovery
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
          </p>
          <h2 className={`text-4xl font-black lg:text-5xl ${isLight ? "text-gray-900" : "text-white"}`}>
            Everything you need<br />to succeed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card
                  className={`border-none shadow-none ${
                    isLight ? "bg-gray-50" : "bg-white/3"
                  }`}
                >
                  {/* replaced CardBody */}
                  <div className="gap-4 p-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      isLight ? "bg-violet-100" : "bg-white/8"
                    }`}>
                      <Icon className="h-6 w-6 text-violet-500" />
                    </div>

                    <div>
                      <h3 className={`mb-1 font-bold ${isLight ? "text-gray-900" : "text-white"}`}>
                        {f.title}
                      </h3>
                      <p className={`text-sm leading-relaxed text-gray-500`}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}