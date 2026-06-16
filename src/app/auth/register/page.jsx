"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { signUp } from "@/lib/auth-client";
import {
  Input,
  Button,
  Checkbox,
//   Divider,
  RadioGroup,
  Radio,
} from "@heroui/react";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiUser,
  HiArrowRight,
  HiExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { RiUserSearchFill } from "react-icons/ri";
import { FaGithub, FaBriefcase } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";

/* ── Password strength helper ── */
function getStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "", color: "" },
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-orange-400" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-green-500" },
  ];
  return { score, ...map[score] };
}

/* ── Single validation rule row ── */
function Rule({ met, text }) {
  return (
    <li className="flex items-center gap-2 text-xs">
      <HiCheckCircle
        className={`h-3.5 w-3.5 transition ${
          met ? "text-green-400" : "text-gray-600"
        }`}
      />
      <span className={met ? "text-gray-300" : "text-gray-600"}>{text}</span>
    </li>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getStrength(form.password);

  const rules = [
    { met: form.password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(form.password), text: "One uppercase letter" },
    { met: /[0-9]/.test(form.password), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(form.password), text: "One special character" },
  ];

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (form.name.trim().length < 2) return "Name must be at least 2 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Please enter a valid email address.";

    if (strength.score < 3)
      return "Password is too weak. Please follow the requirements below.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    if (!agreed) return "You must agree to the Terms & Privacy Policy.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await signUp.email({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      if (authError) {
        setError(
          authError.message?.includes("already")
            ? "An account with this email already exists. Try signing in."
            : authError.message || "Something went wrong. Please try again."
        );
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    await signUp.social({ provider, callbackURL: "/dashboard" });
  };

  if (success) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          isLight ? "bg-white" : "bg-black"
        }`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl shadow-green-500/30">
            <HiCheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2
            className={`mb-2 text-2xl font-black ${
              isLight ? "text-gray-900" : "text-white"
            }`}
          >
            Account Created!
          </h2>
          <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            Redirecting to your dashboard…
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-h-screen overflow-hidden ${
        isLight ? "bg-gray-50" : "bg-black"
      }`}
    >
      {/* ── Left decorative panel ── */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/globe.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-violet-950/80 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.2),transparent_60%)]" />

        {/* Logo */}
        <div className="relative">
          <Link href="/">
            <h2 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hire
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Loop
              </span>
            </h2>
          </Link>
        </div>

        {/* Center */}
        <div className="relative space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <IoSparklesOutline className="h-3.5 w-3.5" />
            Join 2M+ career professionals
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-black leading-tight text-white">
              Start your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                dream career
              </span>{" "}
              journey
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              AI-powered job matching connects you with the perfect opportunities tailored to your skills.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: "🎯", text: "AI matches jobs to your exact skills" },
              { icon: "⚡", text: "One-click apply to hundreds of roles" },
              { icon: "📊", text: "Real-time salary insights & negotiation tips" },
              { icon: "🏆", text: "Interview coaching powered by AI" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative flex items-center gap-6 rounded-2xl border border-white/8 bg-white/5 p-5">
          <div className="flex -space-x-2">
            {["SC", "MW", "AP", "JR"].map((init, i) => (
              <div
                key={init}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-black text-xs font-bold text-white ${
                  ["bg-violet-500", "bg-blue-500", "bg-pink-500", "bg-green-500"][i]
                }`}
              >
                {init}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              1,200+ hired this week
            </p>
            <p className="text-xs text-gray-500">Average time to hire: 9 days</p>
          </div>
        </div>
      </div>

      {/* ── Right: form ── */}
      <div
        className={`flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12 lg:px-16 ${
          isLight ? "bg-white" : "bg-[#080808]"
        }`}
      >
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <h2 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Hire
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Loop
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
              Create account
            </h2>
            <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-500 transition hover:text-violet-400"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* OAuth */}
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

          {/* <Divider className={`mb-6 ${isLight ? "bg-gray-200" : "bg-white/8"}`}>
            <span className={`px-3 text-xs ${isLight ? "text-gray-400" : "text-gray-600"}`}>
              or register with email
            </span>
          </Divider> */}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <HiExclamationCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div
              className={`rounded-2xl border p-4 ${
                isLight ? "border-gray-200 bg-gray-50" : "border-white/8 bg-white/3"
              }`}
            >
              <p
                className={`mb-3 text-xs font-semibold uppercase tracking-wider ${
                  isLight ? "text-gray-500" : "text-gray-500"
                }`}
              >
                I am a…
              </p>
              <RadioGroup
                value={form.role}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, role: val }))
                }
                orientation="horizontal"
                classNames={{ wrapper: "gap-3" }}
              >
                <Radio
                  value="job_seeker"
                  classNames={{
                    base: `flex-1 cursor-pointer rounded-xl border p-3 transition ${
                      form.role === "job_seeker"
                        ? "border-violet-500/60 bg-violet-500/10"
                        : isLight
                        ? "border-gray-200 hover:border-violet-300"
                        : "border-white/8 hover:border-white/20"
                    }`,
                    label: `text-sm font-medium ${
                      isLight ? "text-gray-700" : "text-gray-300"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <RiUserSearchFill className="h-4 w-4 text-violet-400" />
                    Job Seeker
                  </div>
                </Radio>
                <Radio
                  value="recruiter"
                  classNames={{
                    base: `flex-1 cursor-pointer rounded-xl border p-3 transition ${
                      form.role === "recruiter"
                        ? "border-violet-500/60 bg-violet-500/10"
                        : isLight
                        ? "border-gray-200 hover:border-violet-300"
                        : "border-white/8 hover:border-white/20"
                    }`,
                    label: `text-sm font-medium ${
                      isLight ? "text-gray-700" : "text-gray-300"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="h-4 w-4 text-blue-400" />
                    Recruiter
                  </div>
                </Radio>
              </RadioGroup>
            </div>

            {/* Name */}
            <Input
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange("name")}
              startContent={
                <HiUser
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
              autoComplete="name"
            />

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
            <div className="space-y-2">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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
                autoComplete="new-password"
              />

              {/* Strength bar */}
              {form.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : isLight ? "bg-gray-200" : "bg-white/8"
                        }`}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p className={`text-right text-xs font-medium ${
                      strength.score <= 1 ? "text-red-400" :
                      strength.score === 2 ? "text-orange-400" :
                      strength.score === 3 ? "text-yellow-400" : "text-green-400"
                    }`}>
                      {strength.label}
                    </p>
                  )}
                  <ul className="space-y-1 pl-0.5">
                    {rules.map((r) => (
                      <Rule key={r.text} met={r.met} text={r.text} />
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Confirm password */}
            <Input
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              startContent={
                <HiLockClosed
                  className={`h-4 w-4 ${isLight ? "text-gray-400" : "text-gray-500"}`}
                />
              }
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`transition ${
                    isLight
                      ? "text-gray-400 hover:text-gray-600"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {showConfirm ? (
                    <HiEyeSlash className="h-4 w-4" />
                  ) : (
                    <HiEye className="h-4 w-4" />
                  )}
                </button>
              }
              isInvalid={
                !!form.confirmPassword && form.password !== form.confirmPassword
              }
              errorMessage="Passwords do not match"
              color={
                form.confirmPassword && form.password === form.confirmPassword
                  ? "success"
                  : "default"
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
              autoComplete="new-password"
            />

            {/* Terms */}
            <Checkbox
              isSelected={agreed}
              onValueChange={setAgreed}
              size="sm"
              classNames={{
                base: "items-start",
                label: `text-sm leading-relaxed ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`,
                wrapper:
                  "border-gray-300 dark:border-white/20 before:border-gray-300 dark:before:border-white/20 mt-0.5",
              }}
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-semibold text-violet-500 hover:text-violet-400"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-semibold text-violet-500 hover:text-violet-400"
              >
                Privacy Policy
              </Link>
            </Checkbox>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              isDisabled={!agreed}
              endContent={!loading && <HiArrowRight className="h-4 w-4" />}
              className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:shadow-violet-500/40 disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}