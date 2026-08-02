export default function Hero() {
  return (
    <section className="bg-topo relative overflow-hidden bg-pine-950 px-6 py-24 text-center sm:py-32">
      {/* floating postmark accent */}
      <div
        className="stamp animate-float-slow absolute right-6 top-10 hidden h-24 w-24 border-marigold/50 text-marigold/80 sm:right-14 sm:flex md:right-20"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center justify-center gap-0.5 font-mono text-[9px] uppercase tracking-[0.25em]">
          <span>Verified</span>
          <span className="text-base leading-none">★</span>
          <span>Rural Stay</span>
        </div>
      </div>

      <div className="animate-rise-in relative mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-marigold">
          Field-tested stays · India
        </p>

        <h1 className="mt-5 font-display text-4xl leading-[1.05] text-paper sm:text-6xl">
          Discover authentic{" "}
          <span className="relative inline-block italic text-marigold">
            rural homestays
            <svg
              className="absolute left-0 top-full w-full text-clay"
              height="10"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 6 Q50 0 100 6 T200 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
          Village life, local culture and hidden-away destinations — matched
          to you by an AI concierge that reads your budget and travel style,
          not just a search filter.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#recommendation"
            className="w-full rounded-full bg-marigold px-8 py-3 text-sm font-semibold text-pine-950 shadow-[0_10px_30px_-10px_rgba(221,163,40,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-marigold-dark sm:w-auto"
          >
            Explore homestays
          </a>
          <a
            href="#how-it-works"
            className="w-full rounded-full border border-paper/25 px-8 py-3 text-sm font-semibold text-paper transition-colors hover:border-marigold hover:text-marigold sm:w-auto"
          >
            See how the AI works
          </a>
        </div>
      </div>
    </section>
  );
}
