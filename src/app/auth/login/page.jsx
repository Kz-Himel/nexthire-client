"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { signIn } from "@/lib/auth-client";
import {
  Input,
  Button,
  Checkbox,
//   Divider,
} from "@heroui/react";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiExclamationCircle,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaBriefcase } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";

export default function LoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await signIn.email({
        email: form.email,
        password: form.password,
        rememberMe: remember,
      });

      if (authError) {
        setError(
          authError.message === "Invalid credentials"
            ? "Incorrect email or password. Please try again."
            : authError.message || "Something went wrong. Please try again."
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    await signIn.social({ provider, callbackURL: "/dashboard" });
  };

  return (
    <div
      className={`relative flex min-h-screen overflow-hidden ${
        isLight ? "bg-gray-50" : "bg-black"
      }`}
    >
      {/* ── Left decorative panel (desktop) ── */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden p-12 lg:flex">
        {/* BG globe */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/globe.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-indigo-950/80 to-black/95" />

        {/* Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.2),transparent_60%)]" />

        {/* Logo */}
        <div className="relative">
          <Link href="/">
            <h2 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Next
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Hire
              </span>
            </h2>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <IoSparklesOutline className="h-3.5 w-3.5" />
            Trusted by 2M+ professionals
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-black leading-tight text-white">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                your career
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              Pick up where you left off. Your next opportunity is waiting.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "50K+", label: "Active Jobs" },
              { value: "12K+", label: "Companies" },
              { value: "97%", label: "Match Rate" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/8 bg-white/5 p-4 text-center"
              >
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative rounded-2xl border border-white/8 bg-white/5 p-6">
          <p className="mb-3 text-sm leading-relaxed text-gray-300">
            NextHire matched me with my dream job in just 3 days. The AI recommendations were spot-on!
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
              SC
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Sarah Chen</p>
              <p className="text-xs text-gray-500">Senior Designer @ Figma</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right — form panel ── */}
      <div
        className={`flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16 ${
          isLight ? "bg-white" : "bg-[#080808]"
        }`}
      >
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <h2 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Next
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Hire
              </span>
            </h2>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8">
            <h2
              className={`mb-2 text-3xl font-black ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              Sign in
            </h2>
            <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              Dont have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-violet-500 transition hover:text-violet-400"
              >
                Create one free
              </Link>
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <Button
              variant="bordered"
              onPress={() => handleOAuth("google")}
              startContent={<FcGoogle className="h-5 w-5" />}
              className={`font-medium ${
                isLight
                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              Google
            </Button>
            <Button
              variant="bordered"
              onPress={() => handleOAuth("github")}
              startContent={
                <FaGithub
                  className={`h-5 w-5 ${isLight ? "text-gray-800" : "text-white"}`}
                />
              }
              className={`font-medium ${
                isLight
                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                  : "border-white/10 text-white hover:bg-white/5"
              }`}
            >
              GitHub
            </Button>
          </div>

          {/* <Divider
            className={`mb-6 ${isLight ? "bg-gray-200" : "bg-white/8"}`}
          >
            <span
              className={`px-3 text-xs ${
                isLight ? "text-gray-400" : "text-gray-600"
              }`}
            >
              or continue with email
            </span>
          </Divider> */}

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              <HiExclamationCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              startContent={
                <HiEnvelope
                  className={`h-4 w-4 ${isLight ? "text-gray-400" : "text-gray-500"}`}
                />
              }
              variant="bordered"
              classNames={{
                label: `text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`,
                input: `${isLight ? "text-gray-900" : "text-white"} placeholder:text-gray-500`,
                inputWrapper: `${
                  isLight
                    ? "border-gray-200 bg-gray-50 hover:border-violet-400 focus-within:border-violet-500"
                    : "border-white/10 bg-white/4 hover:border-violet-500/50 focus-within:border-violet-500"
                } transition`,
              }}
              isRequired
              autoComplete="email"
            />

            {/* Password */}
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange("password")}
              startContent={
                <HiLockClosed
                  className={`h-4 w-4 ${isLight ? "text-gray-400" : "text-gray-500"}`}
                />
              }
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`transition ${
                    isLight
                      ? "text-gray-400 hover:text-gray-600"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {showPassword ? (
                    <HiEyeSlash className="h-4 w-4" />
                  ) : (
                    <HiEye className="h-4 w-4" />
                  )}
                </button>
              }
              variant="bordered"
              classNames={{
                label: `text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`,
                input: `${isLight ? "text-gray-900" : "text-white"} placeholder:text-gray-500`,
                inputWrapper: `${
                  isLight
                    ? "border-gray-200 bg-gray-50 hover:border-violet-400 focus-within:border-violet-500"
                    : "border-white/10 bg-white/4 hover:border-violet-500/50 focus-within:border-violet-500"
                } transition`,
              }}
              isRequired
              autoComplete="current-password"
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <Checkbox
                isSelected={remember}
                onValueChange={setRemember}
                size="sm"
                classNames={{
                  label: `text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`,
                  wrapper:
                    "border-gray-300 dark:border-white/20 before:border-gray-300 dark:before:border-white/20",
                }}
              >
                Remember me
              </Checkbox>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-violet-500 transition hover:text-violet-400"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              endContent={
                !loading && <HiArrowRight className="h-4 w-4" />
              }
              className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:shadow-violet-500/40"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p
            className={`mt-8 text-center text-xs ${
              isLight ? "text-gray-400" : "text-gray-600"
            }`}
          >
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-violet-400">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-violet-400">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}