import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-pink-200 rounded-full blur-[130px] opacity-30"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-purple-200 rounded-full blur-[130px] opacity-30"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-teal-200 rounded-full blur-[110px] opacity-25"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
