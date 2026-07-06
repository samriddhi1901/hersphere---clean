import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Brain,
} from "lucide-react";

export default function AISection() {
  return (
    <section
      id="ai"
      className="py-28 bg-gradient-to-b from-[#FFF8FA] to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-medium">

            <Sparkles size={18} />

            AI Health Companion

          </div>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">

            Meet your
            <span className="text-pink-600"> AI Health Assistant</span>

          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">

            Ask questions about periods, hormones, PCOS, nutrition,
            menopause, mental wellness, and healthy lifestyle habits.
            Get simple educational guidance whenever you need it.

          </p>

        </div>

        {/* Two Columns */}

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <div className="space-y-8">

              <Feature
                icon={<Brain />}
                title="Ask Naturally"
                text="Talk to the AI exactly like chatting with a trusted friend."
              />

              <Feature
                icon={<HeartPulse />}
                title="Personalized Guidance"
                text="Receive awareness tips based on your symptoms and life stage."
              />

              <Feature
                icon={<ShieldCheck />}
                title="Private & Secure"
                text="Your conversations remain confidential and protected."
              />

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Glow */}

            <div className="absolute inset-0 bg-pink-300 blur-[120px] opacity-20 rounded-full"></div>

            {/* Chat Window */}

            <div className="relative bg-white rounded-[35px] shadow-2xl border border-pink-100 overflow-hidden">

              {/* Header */}

              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-5 flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">

                  <Bot />

                </div>

                <div>

                  <h3 className="font-bold">

                    HerSphere AI

                  </h3>

                  <p className="text-sm opacity-80">

                    Always here to help

                  </p>

                </div>

              </div>

              {/* Messages */}

              <div className="p-6 space-y-5">

                <div className="bg-pink-100 p-4 rounded-2xl max-w-xs">

                  Hi! I've been feeling tired lately.
                  Could it be due to iron deficiency?

                </div>

                <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-2xl ml-auto max-w-sm">

                  Fatigue can sometimes be associated with low iron,
                  but many conditions can cause similar symptoms.
                  Eating iron-rich foods and consulting a healthcare
                  professional for persistent symptoms is important.

                </div>

                <div className="bg-pink-100 p-4 rounded-2xl max-w-xs">

                  What foods are rich in iron?

                </div>

                <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-2xl ml-auto max-w-sm">

                  Spinach, lentils, beans, dates, jaggery,
                  pumpkin seeds, and lean meats are great
                  sources of iron.

                </div>

              </div>

              {/* Input */}

              <div className="border-t border-pink-100 p-5 flex gap-3">

                <input
                  disabled
                  placeholder="Ask anything..."
                  className="flex-1 rounded-full border border-gray-200 px-5 py-3 outline-none bg-gray-50"
                />

                <button className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white">

                  <Send size={18} />

                </button>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="flex gap-5 items-start"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center shadow-lg">

        {icon}

      </div>

      <div>

        <h3 className="text-xl font-bold text-gray-900">

          {title}

        </h3>

        <p className="text-gray-600 mt-2 leading-7">

          {text}

        </p>

      </div>

    </motion.div>
  );
}