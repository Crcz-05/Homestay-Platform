"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/ui/Loader";
import {
  getHomestayImage,
  getHomestayImageFallback,
} from "../../lib/homestayImage";

type Homestay = {
  id: number;
  name: string;
  location: string;
  price: number;
};

export default function Showcase() {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homestays`)
      .then((res) => res.json())
      .then((data) => {
        setHomestays(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow bg-paper">
        <section className="bg-topo bg-pine-950 px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-marigold">
              The showcase
            </p>

            <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
              RuralStay AI showcase
            </h1>

            <p className="mt-4 text-base leading-relaxed text-paper/75">
              Explore real homestays loaded straight from the backend API.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader />
              </div>
            ) : homestays.length === 0 ? (
              <div className="surface mx-auto max-w-xl rounded-card bg-paper-light p-8 text-center shadow-card">
                <h2 className="font-display text-xl text-ink">
                  No homestays available
                </h2>

                <p className="mt-2 text-sm text-ink-soft">
                  Add homestays from the dashboard to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {homestays.map((stay) => (
                  <div
                    key={stay.id}
                    className="surface group flex flex-col overflow-hidden rounded-card border border-ink/5 bg-paper-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={getHomestayImage(stay.id, stay.name)}
                        alt={stay.name}
                        className="h-48 w-full bg-paper-dim object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          const fallback = getHomestayImageFallback(stay.id);

                          if (img.src !== fallback) {
                            img.src = fallback;
                          }
                        }}
                      />
                    </div>

                    <div
                      className="dotted-rule h-px w-full"
                      aria-hidden="true"
                    />

                    <div className="p-6">
                      <h2 className="font-display text-xl text-ink">
                        {stay.name}
                      </h2>

                      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="shrink-0 text-clay"
                        >
                          <path
                            d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />

                          <circle
                            cx="12"
                            cy="9.5"
                            r="2.4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>

                        {stay.location}
                      </p>

                      <p className="mt-3 font-mono text-lg font-semibold text-clay">
                        ₹{stay.price.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-normal text-ink-soft">
                          / night
                        </span>
                      </p>

                      <div className="dotted-rule mt-4 pt-4">
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                          Why stay here
                        </h3>

                        <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                          <li className="flex items-center gap-2">
                            <span className="text-marigold">✔</span>
                            AI-personalized recommendations
                          </li>

                          <li className="flex items-center gap-2">
                            <span className="text-marigold">✔</span>
                            Authentic rural experience
                          </li>

                          <li className="flex items-center gap-2">
                            <span className="text-marigold">✔</span>
                            Secure booking support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}