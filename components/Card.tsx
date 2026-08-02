import { getHomestayImage, getHomestayImageFallback } from "../lib/homestayImage";

type CardProps = {
  id: number;
  title: string;
  location: string;
  price: number;
};

export default function Card({ id, title, location, price }: CardProps) {
  return (
    <div className="surface group relative flex flex-col overflow-hidden rounded-card border border-ink/5 bg-paper-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative overflow-hidden">
        <img
          src={getHomestayImage(id, title)}
          alt={title}
          className="h-52 w-full bg-paper-dim object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = getHomestayImageFallback(id);
            if (img.src !== fallback) {
              img.src = fallback;
            }
          }}
        />

        {/* corner postmark, revealed on hover */}
        <div
          className="stamp absolute right-3 top-3 h-14 w-14 border-marigold bg-pine-950/85 text-marigold opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center gap-0.5 font-mono text-[7px] uppercase tracking-[0.2em]">
            <span>Verified</span>
            <span className="text-sm leading-none">★</span>
          </div>
        </div>
      </div>

      {/* perforated ticket divider */}
      <div className="dotted-rule h-px w-full" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-xl text-ink">{title}</h2>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-clay">
            <path
              d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {location}
        </p>

        <p className="mt-3 font-mono text-lg font-semibold text-clay">
          ₹{price.toLocaleString("en-IN")}{" "}
          <span className="text-xs font-normal text-ink-soft">/ night</span>
        </p>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Enjoy authentic rural hospitality, traditional food and scenic
          landscapes.
        </p>

        <button className="mt-5 w-full rounded-full bg-pine-900 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-800">
          View details
        </button>
      </div>
    </div>
  );
}
