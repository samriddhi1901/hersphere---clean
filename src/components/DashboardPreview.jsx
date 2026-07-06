import { motion } from "framer-motion";
import {
  HeartPulse,
  Droplets,
  Moon,
  CalendarDays,
  Sparkles,
  Activity,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center items-center"
    >
      {/* Floating Pills */}

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-6 left-0 bg-white shadow-xl rounded-full px-5 py-3 flex items-center gap-2"
      >
        <HeartPulse className="text-pink-500" size={18} />
        <span className="text-sm font-medium">Cycle Care</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-24 -right-10 bg-white shadow-xl rounded-full px-5 py-3 flex items-center gap-2"
      >
        <Sparkles className="text-purple-500" size={18} />
        <span className="text-sm font-medium">AI Assistant</span>
      </motion.div>

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-6 left-0 bg-white shadow-xl rounded-full px-5 py-3 flex items-center gap-2"
      >
        <Activity className="text-teal-500" size={18} />
        <span className="text-sm font-medium">Health Insights</span>
      </motion.div>

      {/* Dashboard */}

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-[420px] rounded-[35px] bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-7"
      >
        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <p className="text-gray-500 text-sm">
              Welcome Back 👋
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Today's Wellness
            </h2>

          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">

            <HeartPulse className="text-white" />

          </div>

        </div>

        {/* AI Insight */}

        <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 shadow-lg">

          <p className="text-sm opacity-90">
            AI Insight
          </p>

          <h3 className="text-xl font-bold mt-2">
            You're entering your luteal phase 🌸
          </h3>

          <p className="text-sm mt-3 opacity-90 leading-6">
            Stay hydrated, increase iron-rich foods,
            and prioritize sleep this week.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          {/* Cycle */}

          <div className="rounded-2xl bg-pink-50 p-5">

            <CalendarDays className="text-pink-600 mb-3" />

            <p className="text-gray-500 text-sm">

              Cycle Day

            </p>

            <h3 className="text-3xl font-bold">

              14

            </h3>

          </div>

          {/* Water */}

          <div className="rounded-2xl bg-cyan-50 p-5">

            <Droplets className="text-cyan-600 mb-3" />

            <p className="text-gray-500 text-sm">

              Water

            </p>

            <h3 className="text-3xl font-bold">

              6/8

            </h3>

          </div>

          {/* Sleep */}

          <div className="rounded-2xl bg-purple-50 p-5">

            <Moon className="text-purple-600 mb-3" />

            <p className="text-gray-500 text-sm">

              Sleep

            </p>

            <h3 className="text-3xl font-bold">

              7.8h

            </h3>

          </div>

          {/* Mood */}

          <div className="rounded-2xl bg-emerald-50 p-5">

            <HeartPulse className="text-emerald-600 mb-3" />

            <p className="text-gray-500 text-sm">

              Mood

            </p>

            <h3 className="text-2xl font-bold">

              Happy 😊

            </h3>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <span className="font-medium">
              Wellness Score
            </span>

            <span className="font-bold text-pink-600">
              86%
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-pink-100">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "86%" }}
              transition={{ duration: 1.5 }}
              className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
            />

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}