import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is my health data private?",
    a: "Yes. Your data is tied to your authenticated account only and is never shared with third parties. Only you can see your cycle, mood, and nutrition history.",
  },
  {
    q: "Is HerSphere a replacement for a doctor?",
    a: "No. HerSphere provides educational awareness and tracking tools, not medical diagnoses. Always consult a healthcare professional for medical concerns.",
  },
  {
    q: "How does the AI assistant work?",
    a: "It's powered by Google's Gemini API and answers general questions about periods, hormones, PCOS, nutrition, and wellness in a conversational way.",
  },
  {
    q: "Can I use HerSphere for free?",
    a: "Yes, all core tracking features and the AI assistant are free to use after signing up.",
  },
  {
    q: "Will there be a mobile app?",
    a: "Yes — a native Android/iOS app is in active development so you can track on the go.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-28 bg-[#FFF8FA]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Asked <span className="text-pink-600">Questions</span>
          </h2>
          <p className="mt-6 text-gray-600">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-pink-600" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-gray-600 leading-7">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
