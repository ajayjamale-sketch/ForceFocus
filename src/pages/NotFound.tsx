import { Link } from "react-router-dom";
import { Home, ArrowLeft, Zap, Search, Timer, Target, BarChart3 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center px-4 text-center">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Force<span className="text-blue-400">Focus</span>
          </span>
        </Link>

        {/* 404 Display */}
        <div className="mb-8">
          <p className="font-display text-[120px] sm:text-[160px] font-black leading-none bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            404
          </p>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Page not found
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md">
          Looks like your focus led you somewhere that doesn't exist. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-blue-glow"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 text-sm mb-4">Or jump to one of these pages:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Search, label: "Features", href: "/features" },
              { icon: Timer, label: "Dashboard", href: "/dashboard" },
              { icon: Target, label: "Pricing", href: "/pricing" },
              { icon: BarChart3, label: "Blog", href: "/blog" },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                to={href}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/40 transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
