import { motion } from "framer-motion";
import {
  HeartPulse,
  Brain,
  Shield,
  Sparkles,
  Apple,
  Activity,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: HeartPulse,
      title: "Cycle Tracking",
      desc: "Understand your menstrual cycle patterns and symptoms better.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Brain,
      title: "AI Health Assistant",
      desc: "Ask questions and get personalized health awareness support.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Apple,
      title: "Nutrition Guidance",
      desc: "Learn what to eat based on your health and cycle stage.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Activity,
      title: "Health Insights",
      desc: "Track symptoms, mood, sleep and energy patterns.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      desc: "Your data stays secure, private, and fully protected.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "Smart Awareness",
      desc: "Learn about PCOS, hormones, menopause and more.",
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#FFF8FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything you need for{" "}
            <span className="text-pink-600">women’s health awareness</span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            HerSphere combines education, AI, and tracking tools to help you
            understand your body better.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-md mb-6`}
              >
                <feature.icon className="text-white w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}