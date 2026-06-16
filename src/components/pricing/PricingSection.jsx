"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Card, Chip, Switch } from "@heroui/react";
import { HiCheck } from "react-icons/hi2";
import { useState } from "react";
import { useTheme } from "next-themes";
import { FaCrown } from "react-icons/fa6";
import { IoBarChart, IoFlash } from "react-icons/io5";

const plans = [
  {
    name: "Starter",
    icon: IoFlash,
    iconColor: "text-amber-400",
    price: { monthly: 0, yearly: 0 },
    desc: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    cta: "Choose This Plan",
    href: "/register",
    cardBg: "dark:bg-[#111] bg-gray-50",
    featured: false,
  },
  {
    name: "Growth",
    icon: IoBarChart,
    iconColor: "text-violet-400",
    price: { monthly: 17, yearly: 12 },
    desc: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    cta: "Choose This Plan",
    href: "/register?plan=growth",
    cardBg: "dark:bg-[#0d0d14] bg-violet-50",
    featured: true,
  },
  {
    name: "Premium",
    icon: FaCrown,
    iconColor: "text-blue-400",
    price: { monthly: 99, yearly: 72 },
    desc: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    cta: "Choose This Plan",
    href: "/register?plan=premium",
    cardBg: "dark:bg-[#111] bg-gray-50",
    featured: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section className={`relative min-h-screen overflow-hidden py-28 ${isLight ? "bg-white" : "bg-black"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
            Pricing
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
          </p>

          <h1 className={`mb-4 text-5xl font-black lg:text-6xl ${isLight ? "text-gray-900" : "text-white"}`}>
            Pay for the leverage,<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              not the listings
            </span>
          </h1>

          {/* Toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!yearly ? (isLight ? "text-gray-900" : "text-white") : "text-gray-500"}`}>
              Monthly
            </span>

            <Switch isSelected={yearly} onValueChange={setYearly} />

            <span className={`flex items-center gap-2 text-sm font-medium ${yearly ? (isLight ? "text-gray-900" : "text-white") : "text-gray-500"}`}>
              Yearly
              <Chip size="sm" classNames={{ content: "text-pink-400 text-[10px] font-bold" }}>
                25%
              </Chip>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = yearly ? plan.price.yearly : plan.price.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`h-full border ${plan.cardBg} ${
                    plan.featured
                      ? "border-violet-500/40 shadow-xl shadow-violet-500/10"
                      : isLight
                      ? "border-gray-200"
                      : "border-white/8"
                  }`}
                  shadow="none"
                >
                  {/* CardBody replacement */}
                  <div className="gap-6 p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isLight ? "bg-gray-100" : "bg-white/8"
                        }`}>
                          <Icon className={`h-5 w-5 ${plan.iconColor}`} />
                        </div>
                        <h3 className={`text-lg font-bold ${isLight ? "text-gray-900" : "text-white"}`}>
                          {plan.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className={`text-4xl font-black ${isLight ? "text-gray-900" : "text-white"}`}>
                          ${price}
                        </span>
                        <span className="text-sm text-gray-500">/month</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className={`mb-4 text-sm font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                        {plan.desc}
                      </p>

                      <ul className="flex flex-col gap-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                              isLight ? "border-gray-300 bg-gray-100" : "border-white/10 bg-white/5"
                            }`}>
                              <HiCheck className={`h-3 w-3 ${isLight ? "text-gray-600" : "text-gray-400"}`} />
                            </div>
                            <span className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CardFooter replacement */}
                  <div className="px-7 pb-7 pt-0">
                    <Button
                      as={Link}
                      href={plan.href}
                      fullWidth
                      size="lg"
                      endContent={<span>→</span>}
                      className={`rounded-xl font-semibold ${
                        plan.featured
                          ? "bg-white text-gray-900 shadow-lg hover:shadow-xl"
                          : isLight
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-white/8 text-white hover:bg-white/12"
                      }`}
                    >
                      {plan.cta}
                    </Button>
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