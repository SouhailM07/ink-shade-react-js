import { Link } from "react-router-dom";
import { BookX, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-lg">
          <BookX className="h-10 w-10" />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-neutral-600 mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to the library.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            to="/categories"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition"
          >
            Browse Categories
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-xs text-neutral-400">
          Error 404 · Inkshade Digital Library
        </p>
      </motion.div>
    </div>
  );
}
