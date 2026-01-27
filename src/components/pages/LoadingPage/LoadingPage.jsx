import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="top-0 w-full h-full z-[10]  fixed  flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo / Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-2 rounded-2xl bg-white/10 backdrop-blur shadow-xl"
        >
          <img src="/logo.jpg" alt="logo" className="rounded-2xl size-[6rem]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold tracking-wide"
        >
          Inkshade Library
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-neutral-300"
        >
          Loading knowledge, please wait…
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
        </div>

        {/* Footer hint */}
        <span className="text-xs text-neutral-400 mt-6">
          Preserving books. Empowering minds.
        </span>
      </div>
    </div>
  );
}
