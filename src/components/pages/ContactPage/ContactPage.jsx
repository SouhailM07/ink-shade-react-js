import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold text-neutral-900">
            Contact Inkshade Library
          </h1>
          <p className="text-neutral-600 mt-2 max-w-xl">
            Have a question, suggestion, or need help with our digital library?
            Reach out — we’d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
              <Mail className="w-6 h-6 text-neutral-700" />
              <div>
                <h3 className="font-medium text-neutral-900">Email</h3>
                <p className="text-sm text-neutral-600">support@inkshade.io</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
              <Phone className="w-6 h-6 text-neutral-700" />
              <div>
                <h3 className="font-medium text-neutral-900">Phone</h3>
                <p className="text-sm text-neutral-600">+1 (555) 245‑8899</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
              <MapPin className="w-6 h-6 text-neutral-700" />
              <div>
                <h3 className="font-medium text-neutral-900">Location</h3>
                <p className="text-sm text-neutral-600">
                  Digital Services Dept.
                  <br />
                  Inkshade Library
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8"
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here…"
                  className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
