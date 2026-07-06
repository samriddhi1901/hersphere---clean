import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Features", href: "#features" },
    { name: "AI Assistant", href: "#ai" },
    { name: "Health Topics", href: "#topics" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center shadow-lg">

            <Heart className="text-white w-6 h-6 fill-white" />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-gray-900">
              HerSphere
            </h1>

            <p className="text-xs text-pink-600 -mt-1">
              Women's Health Platform
            </p>

          </div>
        </motion.div>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-10">

          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 font-medium hover:text-pink-600 transition"
            >
              {item.name}
            </a>
          ))}

        </div>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-4">

          <SignedOut>

            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-full border border-pink-500 text-pink-600 hover:bg-pink-50 transition">
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </SignUpButton>

          </SignedOut>

          <SignedIn>

            <UserButton afterSignOutUrl="/" />

          </SignedIn>

        </div>

        {/* Mobile Menu Button */}

        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-pink-100"
          >

            <div className="px-6 py-6 flex flex-col gap-5">

              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  {item.name}
                </a>
              ))}

              <SignedOut>

                <SignInButton mode="modal">
                  <button className="w-full py-3 rounded-full border border-pink-500 text-pink-600">
                    Login
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="w-full py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                    Get Started
                  </button>
                </SignUpButton>

              </SignedOut>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}