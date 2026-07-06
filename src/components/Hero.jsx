import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

import {
  ShieldCheck,
  Brain,
  Sparkles,
} from "lucide-react";

import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8FA] pt-32 pb-24">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-200 rounded-full blur-[120px] opacity-40" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-200 rounded-full blur-[120px] opacity-40" />

        <div className="absolute top-40 right-40 w-[250px] h-[250px] bg-teal-200 rounded-full blur-[100px] opacity-40" />

      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-pink-700 font-medium mb-8">

            <Sparkles size={18} />

            AI Powered Women's Health

          </div>

          {/* Heading */}

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-gray-900">

            Understand
            <br />

            Your Body.

            <br />

            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">

              Support Your Health.

            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">

            HerSphere empowers women with trusted guidance on periods,
            hormones, PCOS, nutrition, menopause, mental wellness,
            and everyday health using AI-driven educational support.

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-10">

            <SignUpButton mode="modal">

              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-105 transition">

                Get Started →

              </button>

            </SignUpButton>

            <SignInButton mode="modal">

              <button className="px-8 py-4 rounded-full border border-pink-500 font-semibold hover:bg-pink-50 transition">

                Login

              </button>

            </SignInButton>

          </div>

          {/* Trust Row */}

          <div className="flex flex-wrap gap-8 mt-12">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-pink-600" />

              <span className="text-gray-700">

                Private & Secure

              </span>

            </div>

            <div className="flex items-center gap-3">

              <Brain className="text-purple-600" />

              <span className="text-gray-700">

                AI Powered

              </span>

            </div>

            <div className="flex items-center gap-3">

              <Sparkles className="text-teal-500" />

              <span className="text-gray-700">

                Evidence Based

              </span>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-6 mt-14">

            <div>

              <h2 className="text-3xl font-bold text-pink-600">

                20+

              </h2>

              <p className="text-gray-500">

                Health Topics

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-pink-600">

                4

              </h2>

              <p className="text-gray-500">

                Life Stages

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-pink-600">

                100%

              </h2>

              <p className="text-gray-500">

                Awareness First

              </p>

            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>
  <DashboardPreview />
</motion.div>

      </div>

    </section>
  );
}