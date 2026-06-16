"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { HiXMark, HiBars3 } from "react-icons/hi2";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/30 light:border-black/10 light:bg-white/70 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Next
            </span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Hire
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white dark:text-white/80 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {!user ? (
            <>
              <div className="h-6 w-px bg-white/15" />
              <Link
                href="/auth/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-7 py-3 font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-105"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-white/80 transition hover:text-white">
                Dashboard
              </Link>
              <button className="overflow-hidden rounded-full border-2 border-violet-500">
                <Image
                  src={user?.image || "https://i.pravatar.cc/150?img=3"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center text-white"
          >
            {menuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-white/10" />
            {!user ? (
              <>
                <Link href="/auth/login" className="text-violet-400">Sign In</Link>
                <Link
                  href="/auth/register"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/profile">Profile</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}