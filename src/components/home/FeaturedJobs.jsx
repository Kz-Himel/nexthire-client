"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiMapPin, HiClock, HiBriefcase, HiArrowRight } from "react-icons/hi2";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Button, Badge, Chip } from "@heroui/react";
import { useTheme } from "next-themes";

const jobs = [
  {
    id: 1, title: "Senior UI/UX Designer", company: "Figma Inc.", logo: "F",
    logoColor: "from-purple-500 to-pink-500", location: "New York, USA", type: "Hybrid",
    salary: "$35–$40/hour", tags: ["Figma", "Prototyping"], posted: "2d ago", verified: true, featured: true,
  },
  {
    id: 2, title: "Frontend Developer", company: "Vercel", logo: "V",
    logoColor: "from-gray-700 to-gray-900", location: "Remote", type: "Full-time",
    salary: "$45–$60/hour", tags: ["React", "Next.js"], posted: "1d ago", verified: true, featured: false,
  },
  {
    id: 3, title: "Product Manager", company: "Linear", logo: "L",
    logoColor: "from-indigo-500 to-violet-600", location: "San Francisco, USA", type: "Hybrid",
    salary: "$50–$70/hour", tags: ["Roadmap", "Agile"], posted: "3d ago", verified: false, featured: false,
  },
  {
    id: 4, title: "Data Scientist", company: "OpenAI", logo: "O",
    logoColor: "from-green-500 to-teal-600", location: "Remote", type: "Contract",
    salary: "$55–$80/hour", tags: ["Python", "ML"], posted: "5h ago", verified: true, featured: true,
  },
  {
    id: 5, title: "DevOps Engineer", company: "Stripe", logo: "S",
    logoColor: "from-blue-500 to-cyan-500", location: "Dublin, Ireland", type: "Full-time",
    salary: "$40–$55/hour", tags: ["AWS", "K8s"], posted: "1w ago", verified: true, featured: false,
  },
  {
    id: 6, title: "iOS Developer", company: "Airbnb", logo: "A",
    logoColor: "from-rose-500 to-pink-600", location: "Remote", type: "Full-time",
    salary: "$45–$65/hour", tags: ["Swift", "SwiftUI"], posted: "4d ago", verified: false, featured: false,
  },
];

export default function FeaturedJobs() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section className={`relative py-28 ${isLight ? "bg-gray-50/80" : "bg-black"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
            Smart Job Discovery
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
          </p>
          <h2 className={`text-4xl font-black lg:text-5xl ${isLight ? "text-gray-900" : "text-white"}`}>
            The roles you'd never<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              find by searching
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/jobs/${job.id}`}
                className={`job-card group relative flex flex-col gap-4 rounded-2xl p-6 transition-all ${
                  isLight ? "bg-white shadow-sm hover:shadow-md" : ""
                }`}
              >
                {job.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-violet-600/20 px-2.5 py-1 text-[10px] font-semibold text-violet-400 ring-1 ring-violet-500/30">
                    Featured
                  </span>
                )}

                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${job.logoColor} text-lg font-black text-white`}>
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-bold transition group-hover:text-violet-400 ${isLight ? "text-gray-900" : "text-white"}`}>
                        {job.title}
                      </h3>
                      {job.verified && (
                        <RiVerifiedBadgeFill className="h-4 w-4 shrink-0 text-blue-400" />
                      )}
                    </div>
                    <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className={`flex flex-wrap gap-3 text-xs ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                  <span className="flex items-center gap-1">
                    <HiMapPin className="h-3.5 w-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiBriefcase className="h-3.5 w-3.5" /> {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiClock className="h-3.5 w-3.5" /> {job.posted}
                  </span>
                </div>

                {/* Tags + Salary + Apply */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <Chip
                        key={tag}
                        size="sm"
                        variant="flat"
                        classNames={{
                          base: `${isLight ? "bg-gray-100" : "bg-white/5"}`,
                          content: `text-[10px] ${isLight ? "text-gray-500" : "text-gray-400"}`,
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  <p className="shrink-0 text-xs font-semibold text-violet-400">{job.salary}</p>
                </div>

                <Button
                  size="sm"
                  variant="flat"
                  endContent={<HiArrowRight className="h-3.5 w-3.5" />}
                  className="mt-1 w-full justify-between bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"
                >
                  Apply Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            as={Link}
            href="/jobs"
            variant="bordered"
            endContent={<HiArrowRight className="h-4 w-4" />}
            className={`px-8 py-6 ${isLight ? "border-gray-200 text-gray-700 hover:bg-gray-50" : "border-white/10 text-white hover:bg-white/5"}`}
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  );
}