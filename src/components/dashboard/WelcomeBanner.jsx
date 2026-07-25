import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const stageMessages = {
  period: "Keep track of your cycle, chat with AI, and stay informed about your health.",
  pregnancy: "Follow your pregnancy journey week by week with personalized guidance.",
  menopause: "Navigate this stage with tools built to support you day to day.",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function WelcomeBanner({ name = "there", lifeStage = "period", goal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-8 text-white shadow-xl overflow-hidden"
    >
      {/* subtle decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -bottom-16 right-24 w-32 h-32 bg-white/10 rounded-full" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="uppercase tracking-wider text-pink-100 text-sm">
            Your Personal Health Space
          </p>

          <h1 className="text-4xl font-bold mt-3">
            {getGreeting()}, {name} 🌸
          </h1>

          <p className="mt-4 text-pink-100 max-w-xl">
            {stageMessages[lifeStage] || stageMessages.period}
          </p>

          {goal && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm">
              <Sparkles size={16} />
              Goal: {goal}
            </div>
          )}
        </div>

        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex h-24 w-24 rounded-full bg-white/20 items-center justify-center"
        >
          <Sparkles size={42} />
        </motion.div>
      </div>
    </motion.div>
  );
}