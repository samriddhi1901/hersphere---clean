import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ananya R.",
    role: "College Student",
    text: "The cycle tracker actually predicted my period two months in a row. The AI assistant explained things in a way that finally made sense to me.",
  },
  {
    name: "Priya M.",
    role: "Working Professional",
    text: "I love that mood and cycle tracking are in one place. It helped me notice patterns I never connected before.",
  },
  {
    name: "Sneha K.",
    role: "Fitness Enthusiast",
    text: "Asking the AI about nutrition during my cycle has genuinely changed how I plan my meals each week.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-28 bg-gradient-to-b from-pink-50 to-[#FFF8FA]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          Loved by <span className="text-pink-600">women everywhere</span>
        </h2>

        <div className="relative bg-white rounded-[30px] shadow-xl border border-pink-100 p-10 min-h-[260px] flex flex-col items-center justify-center">
          <Quote className="text-pink-300 w-10 h-10 mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg text-gray-700 leading-8">
                {testimonials[index].text}
              </p>
              <p className="mt-6 font-semibold text-gray-900">
                {testimonials[index].name}
              </p>
              <p className="text-sm text-pink-600">{testimonials[index].role}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition"
          >
            <ChevronLeft className="text-pink-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition"
          >
            <ChevronRight className="text-pink-600" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-pink-600" : "w-2 bg-pink-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
