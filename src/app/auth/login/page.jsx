"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { signIn } from "@/lib/auth-client";
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
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiExclamationCircle,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { RiGithubFill } from "react-icons/ri";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setLoading(true);
    setServerError("");
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setServerError(
          error.message === "Invalid credentials"
            ? "Incorrect email or password."
            : error.message || "Something went wrong."
        );
        return;
      }
      router.push("/");
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

  return (
    <div className={`flex min-h-screen items-center justify-center px-4 py-16 ${isLight ? "bg-gray-50" : "bg-black"}`}>
      <div className={`w-full max-w-md rounded-3xl border p-8 shadow-xl ${isLight ? "border-gray-200 bg-white" : "border-white/8 bg-[#0d0d0d]"}`}>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`mb-1 text-3xl font-black ${isLight ? "text-gray-900" : "text-white"}`}>
            Welcome back
          </h1>
          <p className={`text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            Sign in to your HireLoop account
          </p>
        </div>

        {/* OAuth */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => signIn.social({ provider: "google", callbackURL: "/dashboard" })}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition hover:scale-[1.01] ${
              isLight ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm" : "border-white/10 bg-white/5 text-white hover:bg-white/8"
            }`}
          >
            <FcGoogle className="h-5 w-5" />
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn.social({ provider: "github", callbackURL: "/dashboard" })}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition hover:scale-[1.01] ${
              isLight ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm" : "border-white/10 bg-white/5 text-white hover:bg-white/8"
            }`}
          >
            <RiGithubFill className={`h-5 w-5 ${isLight ? "text-gray-800" : "text-white"}`} />
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className={`h-px flex-1 ${isLight ? "bg-gray-200" : "bg-white/8"}`} />
          <span className={`text-xs ${isLight ? "text-gray-400" : "text-gray-600"}`}>or continue with email</span>
          <div className={`h-px flex-1 ${isLight ? "bg-gray-200" : "bg-white/8"}`} />
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <HiExclamationCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        {/* Form */}
        <Form className="space-y-4" onSubmit={onSubmit} validationBehavior="native">

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
            <Label className={`mb-1.5 block text-xs font-semibold ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Email address
            </Label>
            <div className="relative">
              <HiEnvelope className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="you@example.com" autoComplete="email" className={`${inputCls} pl-10`} />
            </div>
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={showPass ? "text" : "password"}
            className="w-full"
            validate={(v) => {
              if (!v) return "Password is required.";
              if (v.length < 8) return "Password must be at least 8 characters.";
            }}
          >
            <div className="flex items-center justify-between">
              <Label className={`mb-1.5 block text-xs font-semibold ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                Password
              </Label>
              <Link href="/auth/forgot-password" className="mb-1.5 text-xs font-medium text-violet-500 hover:text-violet-400 transition">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <HiLockClosed className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
              <Input placeholder="Enter your password" autoComplete="current-password" className={`${inputCls} px-10`} />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition ${isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"}`}
              >
                {showPass ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
              </button>
            </div>
            <FieldError className="mt-1.5 text-xs text-red-400" />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:shadow-violet-500/40"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </Form>

        <p className={`mt-6 text-center text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-violet-500 hover:text-violet-400 transition">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}