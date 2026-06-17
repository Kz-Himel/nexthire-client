"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { signUp } from "@/lib/auth-client";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Description,
  Button,
} from "@heroui/react";
import {
  HiUser,
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { RiGithubFill, RiUserSearchFill, RiBriefcaseFill } from "react-icons/ri";

function StrengthBar({ password }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const textColors = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-green-400"];

  if (!password) return null;

  return (
    <div className="mt-2.5 space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {[
            { met: password.length >= 8, text: "8+ chars" },
            { met: /[A-Z]/.test(password), text: "Uppercase" },
            { met: /[0-9]/.test(password), text: "Number" },
            { met: /[^A-Za-z0-9]/.test(password), text: "Special" },
          ].map((r) => (
            <span key={r.text} className={`flex items-center gap-1 text-xs ${r.met ? "text-green-400" : "text-gray-600"}`}>
              <HiCheckCircle className="h-3 w-3" />
              {r.text}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-xs font-semibold ${textColors[score]}`}>{labels[score]}</span>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [role, setRole] = useState("job_seeker");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (password !== confirm) { setServerError("Passwords do not match."); return; }
    if (!agreed) { setServerError("You must agree to the Terms & Privacy Policy."); return; }

    setLoading(true);
    setServerError("");
    try {
      const { error } = await signUp.email({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password,
        role,
      });
      if (error) {
        setServerError(
          error.message?.toLowerCase().includes("already")
            ? "An account with this email already exists."
            : error.message || "Something went wrong."
        );
        return;
      }
      router.push("/auth/login");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const surface = isLight
    ? "border-gray-200 bg-gray-50 text-gray-900 hover:border-violet-400 focus:border-violet-500"
    : "border-white/10 bg-white/5 text-white hover:border-violet-500/50 focus:border-violet-500";

  const inputCls = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500/20 ${surface}`;
  const labelCls = `mb-1.5 block text-xs font-semibold ${isLight ? "text-gray-600" : "text-gray-400"}`;

  return (
    <div className={`flex min-h-screen items-center justify-center px-4 py-16 ${isLight ? "bg-gray-50" : "bg-black"}`}>
      <div className={`w-full max-w-md rounded-3xl border p-8 shadow-xl ${isLight ? "border-gray-200 bg-white" : "border-white/8 bg-[#0d0d0d]"}`}>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`mb-1 text-3xl font-black ${isLight ? "text-gray-900" : "text-white"}`}>
            Create account
          </h1>
          <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            Join NextHire and find your dream job
          </p>
        </div>

        {/* OAuth */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => signUp.social({ provider: "google", callbackURL: "/dashboard" })}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition hover:scale-[1.01] ${
              isLight ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm" : "border-white/10 bg-white/5 text-white hover:bg-white/8"
            }`}
          >
            <FcGoogle className="h-5 w-5" /> Google
          </button>
          <button
            type="button"
            onClick={() => signUp.social({ provider: "github", callbackURL: "/dashboard" })}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition hover:scale-[1.01] ${
              isLight ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm" : "border-white/10 bg-white/5 text-white hover:bg-white/8"
            }`}
          >
            <RiGithubFill className={`h-5 w-5 ${isLight ? "text-gray-800" : "text-white"}`} /> GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className={`h-px flex-1 ${isLight ? "bg-gray-200" : "bg-white/8"}`} />
          <span className={`text-xs ${isLight ? "text-gray-400" : "text-gray-600"}`}>or register with email</span>
          <div className={`h-px flex-1 ${isLight ? "bg-gray-200" : "bg-white/8"}`} />
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <HiExclamationCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <Form className="space-y-4" onSubmit={onSubmit} validationBehavior="native">

          {/* Role picker */}
          <div className={`rounded-2xl border p-3 ${isLight ? "border-gray-200 bg-gray-50" : "border-white/8 bg-white/3"}`}>
            <p className={`mb-2.5 text-xs font-semibold uppercase tracking-wider ${isLight ? "text-gray-500" : "text-gray-500"}`}>I am a…</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "job_seeker", icon: <RiUserSearchFill className="h-4 w-4 text-violet-400" />, label: "Job Seeker" },
                { value: "recruiter",  icon: <RiBriefcaseFill  className="h-4 w-4 text-blue-400"   />, label: "Recruiter"  },
              ].map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition ${
                    role === r.value
                      ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                      : isLight
                      ? "border-gray-200 text-gray-600 hover:border-violet-300"
                      : "border-white/8 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full"
            validate={(v) => {
              if (!v?.trim()) return "Full name is required.";
              if (v.trim().length < 2) return "Name must be at least 2 characters.";
            }}
          >
            <Label className={labelCls}>Full name</Label>
            <div className="relative">
              <HiUser className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="John Doe" autoComplete="name" className={`${inputCls} pl-10`} />
            </div>
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(v) => {
              if (!v) return "Email is required.";
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v))
                return "Please enter a valid email address.";
            }}
          >
            <Label className={labelCls}>Email address</Label>
            <div className="relative">
              <HiEnvelope className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="you@example.com" autoComplete="email" className={`${inputCls} pl-10`} />
            </div>
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type={showPass ? "text" : "password"}
            className="w-full"
            onChange={(v) => setPassword(v)}
            validate={(v) => {
              if (!v) return "Password is required.";
              if (v.length < 8) return "At least 8 characters required.";
              if (!/[A-Z]/.test(v)) return "Must contain one uppercase letter.";
              if (!/[0-9]/.test(v)) return "Must contain one number.";
              if (!/[^A-Za-z0-9]/.test(v)) return "Must contain one special character.";
            }}
          >
            <Label className={labelCls}>Password</Label>
            <div className="relative">
              <HiLockClosed className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="Create a strong password" autoComplete="new-password" className={`${inputCls} px-10`} />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition ${isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"}`}
              >
                {showPass ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
              </button>
            </div>
            <StrengthBar password={password} />
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          {/* Confirm password */}
          <TextField
            isRequired
            name="confirm"
            type={showConfirm ? "text" : "password"}
            className="w-full"
            onChange={(v) => setConfirm(v)}
            validate={(v) => {
              if (!v) return "Please confirm your password.";
              if (v !== password) return "Passwords do not match.";
            }}
          >
            <Label className={labelCls}>Confirm password</Label>
            <div className="relative">
              <HiLockClosed className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="Re-enter your password" autoComplete="new-password" className={`${inputCls} px-10`} />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition ${isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"}`}
              >
                {showConfirm ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
              </button>
            </div>
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          {/* Terms checkbox */}
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-violet-600"
            />
            <span className={`text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-violet-500 hover:text-violet-400">Terms</Link>
              {" "}&amp;{" "}
              <Link href="/privacy" className="font-semibold text-violet-500 hover:text-violet-400">Privacy Policy</Link>
            </span>
          </label>

          <Button
            type="submit"
            isLoading={loading}
            isDisabled={!agreed}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </Form>

        <p className={`mt-6 text-center text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-violet-500 hover:text-violet-400 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}