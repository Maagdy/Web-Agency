import React from "react";

type ErrorPageProps = {
  status?: number | string;
  title?: string;
  message?: string;
  onBack?: () => void;
  className?: string;
};

// Usage: import ErrorPage from "./ErrorPage" and render <ErrorPage status={404} title="Not Found" message="We couldn't find that page." />

const ErrorPage: React.FC<ErrorPageProps> = ({
  status = 404,
  title = "Page not found",
  message = "Sorry — the page you were looking for doesn't exist or has been moved.",
  onBack,
  className = "",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mainColor)] p-6">
      <div
        className={`max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${className}`}
      >
        {/* Left: Illustration + status */}
        <div className="p-10 flex flex-col justify-center items-start gap-6 md:gap-8">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[var(--mainColor)]/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 stroke-[var(--mainColor)]"
                fill="none"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17a4 4 0 100-8 4 4 0 000 8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--mainColor)]">
                Error
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {title}
              </h1>
            </div>
          </div>

          <div>
            <p className="text-6xl font-black text-[var(--mainColor)]">
              {status}
            </p>
            <p className="mt-2 text-gray-600 text-base">{message}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => (onBack ? onBack() : history.back())}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[var(--mainColor)] bg-white text-[var(--mainColor)] font-semibold hover:shadow-lg transition"
            >
              ← Go back
            </button>

            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--mainColor)] text-white font-semibold hover:opacity-90 transition"
            >
              Home
            </a>
          </div>

          <p className="mt-auto text-xs text-gray-400">
            If the problem persists, contact support.
          </p>
        </div>

        {/* Right: Decorative panel */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-white/40 to-white/10 p-8">
          <div className="w-full max-w-sm text-center">
            {/* Simple SVG/graphic that uses currentColor so it can match --mainColor if needed */}
            <svg
              viewBox="0 0 600 400"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--mainColor)"
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--mainColor)"
                    stopOpacity="0.04"
                  />
                </linearGradient>
              </defs>

              <rect
                x="0"
                y="0"
                width="600"
                height="400"
                rx="16"
                fill="url(#g)"
              />

              <g transform="translate(80,40)">
                <circle cx="160" cy="120" r="70" fill="white" opacity="0.9" />
                <path
                  d="M40 300 C120 180 240 180 320 300"
                  fill="none"
                  stroke="var(--mainColor)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                <rect
                  x="20"
                  y="40"
                  width="220"
                  height="120"
                  rx="12"
                  fill="white"
                  opacity="0.98"
                />
                <text
                  x="40"
                  y="86"
                  fontSize="16"
                  fill="var(--mainColor)"
                  fontWeight={700}
                >
                  Oops!
                </text>
                <text x="40" y="110" fontSize="12" fill="#666">
                  Something went wrong.
                </text>
              </g>
            </svg>

            <p className="mt-6 text-sm text-gray-500">
              This friendly page helps people land after a broken link, server
              error or missing resource.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
