"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginButton } from "@/components/auth/LoginButton";
import { navLinks } from "@/lib/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-deep-brown">
          The Numen of Banda
        </Link>

        {/* Desktop Navigation */}
        <div className=" md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-deep-brown hover:text-rooster transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Login Button */}
          <div className="border-l border-deep-brown/20 pl-6">
            <LoginButton />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-deep-brown"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-sky/90 md:hidden flex flex-col items-center pb-4 shadow-lg">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-deep-brown hover:text-rooster w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Login Button for Mobile */}
            <div className="w-full border-t border-deep-brown/20 mt-2 pt-2 flex justify-center">
              <LoginButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
