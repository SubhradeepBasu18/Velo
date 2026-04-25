import { Home, ArrowRight } from "../icons";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col items-center justify-center px-5">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(#D4A843_0px,#D4A843_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,#D4A843_0px,#D4A843_1px,transparent_1px,transparent_40px)]" />

      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        {/* SVG Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-glow"
          >
            <circle cx="100" cy="100" r="90" stroke="#D4A843" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <circle cx="100" cy="100" r="80" stroke="#D4A843" strokeOpacity="0.3" strokeWidth="1" fill="none" />
            <text x="100" y="115" textAnchor="middle" fill="#D4A843" fontFamily="'Manrope', sans-serif" fontSize="64" fontWeight="800" letterSpacing="-0.04em">
              404
            </text>
            <path
              d="M70 140 L130 140"
              stroke="#D4A843"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
              className="dash-flow"
            />
            <circle cx="75" cy="85" r="4" fill="#D4A843" opacity="0.8" />
            <circle cx="125" cy="85" r="4" fill="#D4A843" opacity="0.8" />
            <path
              d="M85 105 Q100 115 115 105"
              stroke="#D4A843"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeOpacity="0.6"
            />
            <path
              d="M60 60 L80 70 M140 60 L120 70"
              stroke="#D4A843"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />
            <rect x="92" y="55" width="16" height="24" rx="3" fill="#D4A843" fillOpacity="0.15" stroke="#D4A843" strokeWidth="1.5" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
          Page not found
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="gold-btn py-3 px-7 rounded-xl text-[15px] flex items-center gap-2"
          >
            <Home /> Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/")}
            className="ghost-btn py-3 px-7 rounded-xl text-[15px] flex items-center gap-2"
          >
            Home <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};