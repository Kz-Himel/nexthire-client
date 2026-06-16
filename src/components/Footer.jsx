import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_50%)]" />

      {/* Grid Effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/">
              <h2 className="text-4xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Next
                </span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Hire
                </span>
              </h2>
            </Link>

            <p className="max-w-xs leading-8 text-gray-500">
              The AI-native career platform. Built for people who
              take their work seriously.
            </p>

            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:scale-105"
              >
                <FaPinterestP />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-indigo-400">
              Product
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-500 transition hover:text-white"
                >
                  Job Discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai-career"
                  className="text-gray-500 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-gray-500 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary"
                  className="text-gray-500 transition hover:text-white"
                >
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-indigo-400">
              Navigations
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/help"
                  className="text-gray-500 transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-gray-500 transition hover:text-white"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-indigo-400">
              Resources
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/brand-guideline"
                  className="text-gray-500 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-gray-500 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 text-sm text-gray-600 lg:flex-row">
          <p>
            © {new Date().getFullYear()} NextHire. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms & Policy
            </Link>

            <Link
              href="/privacy"
              className="hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}