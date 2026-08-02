"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-paper">
        <section className="bg-topo bg-pine-950 px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-marigold">
              About us
            </p>
            <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
              About RuralStay AI
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/75">
              An AI-powered rural homestay booking platform designed to help
              travelers discover authentic village stays across India. Our
              recommendation system suggests homestays based on traveler
              preferences, budget, and interests.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="surface rounded-card bg-paper-light p-8 shadow-card">
              <span className="stamp mb-4 h-11 w-11 border-clay text-clay">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
              <h2 className="font-display text-2xl text-ink">Our mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                To promote sustainable tourism and support local rural
                communities by connecting travelers with unique and
                authentic homestay experiences.
              </p>
            </div>

            <div className="surface rounded-card bg-paper-light p-8 shadow-card">
              <span className="stamp mb-4 h-11 w-11 border-marigold text-marigold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5L15 8m-6 8-2.5 2.5m0-13L9 8m6 8 2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="font-display text-2xl text-ink">How the AI helps</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Instead of filtering by price and distance alone, our
                concierge weighs your written preferences against real
                homestay listings to suggest a genuine fit for your trip.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
