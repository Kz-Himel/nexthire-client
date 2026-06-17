"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { HiXMark, HiBars3, HiArrowRightOnRectangle } from "react-icons/hi2";
import { HiViewGrid } from "react-icons/hi";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const navItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setDropOpen(false);
    redirect("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Hire
            </span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Loop
            </span>
          </h1>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {isPending ? (
            /* Loading skeleton */
            <div className="h-10 w-24 animate-pulse rounded-2xl bg-white/10" />
          ) : !user ? (
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
            /* Logged in */
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
              >
                {/* Avatar */}
                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-violet-500">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                {/* Name */}
                <span className="max-w-[100px] truncate text-sm font-medium text-white">
                  {user.name?.split(" ")[0]}
                </span>
                <svg className={`h-4 w-4 text-gray-400 transition-transform ${dropOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />

                  <div className="absolute right-0 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl shadow-black/50">
                    {/* User info */}
                    <div className="border-b border-white/8 px-4 py-3">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="truncate text-xs text-gray-500">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/8 hover:text-white"
                      >
                        <HiViewGrid className="h-4 w-4 text-violet-400" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/8 hover:text-white"
                      >
                        <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-white/8 p-1.5">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <HiArrowRightOnRectangle className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-white/10" />

            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-violet-400"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Mobile user info */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-violet-500">
                    {user.image ? (
                      <Image src={user.image} alt={user.name || ""} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 transition hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 transition hover:text-white"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left text-red-400 transition hover:text-red-300"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}