"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";

type Homestay = {
  id: number;
  name: string;
  location: string;
  price: number;
};

const STEPS = [
  {
    number: "01",
    title: "Tell us your trip",
    description: "Share your budget and the kind of stay you're after — mountains, waterfalls, quiet farmland, festival season.",
  },
  {
    number: "02",
    title: "AI reads the fit",
    description: "Our concierge weighs your preferences against real homestay listings, not just price and location filters.",
  },
  {
    number: "03",
    title: "Book with confidence",
    description: "Get a matched recommendation plus the full catalogue of verified rural stays to compare and book.",
  },
];

export default function Home() {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/homestays")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load homestays.");
        return res.json();
      })
      .then((data) => {
        setHomestays(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadError("Unable to load homestays right now. Please make sure the backend server is running.");
        setLoading(false);
      });
  }, []);

  async function getRecommendation() {
    if (!budget || !preferences) {
      alert("Please enter budget and preferences.");
      return;
    }

    setAiLoading(true);
    setRecommendation("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
          preferences,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setRecommendation(data.recommendation);
      }
    } catch (err) {
      console.log(err);
      setError("Unable to connect to AI service.");
    }

    setAiLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* How it works — a genuine sequence, so numbering earns its keep */}
        <section id="how-it-works" className="bg-paper px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-clay">
              How it works
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl text-ink sm:text-4xl">
              Three steps between here and a village verandah
            </h2>

            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.number} className="relative">
                  <span className="font-display text-4xl text-marigold/70">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                  {i < STEPS.length - 1 && (
                    <div
                      className="dotted-rule absolute -right-5 top-3 hidden h-px w-10 sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommendation Section */}
        <section id="recommendation" className="bg-paper-dim px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-clay">
              AI Concierge
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Get an AI homestay recommendation
            </h2>
            <p className="mt-3 text-ink-soft">
              A quick note on budget and mood — the concierge does the rest.
            </p>
          </div>

          <div className="ticket surface mx-auto mt-10 max-w-2xl rounded-card border border-ink/5 bg-paper-light p-6 shadow-card-hover sm:p-8">
            <label className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
              Budget (₹ per night)
            </label>
            <input
              type="number"
              placeholder="e.g. 3500"
              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-marigold focus:outline-none"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <label className="mt-5 block font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
              What are you looking for?
            </label>
            <textarea
              placeholder="Example: Peaceful mountain stay with waterfalls, local food and nature."
              className="mt-1.5 h-32 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-marigold focus:outline-none"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />

            <button
              onClick={getRecommendation}
              disabled={aiLoading}
              className="mt-6 w-full rounded-full bg-marigold px-6 py-3.5 font-semibold text-pine-950 shadow-[0_10px_30px_-10px_rgba(221,163,40,0.55)] transition-colors hover:bg-marigold-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {aiLoading ? "Finding your homestay..." : "Get AI recommendation"}
            </button>

            {aiLoading && (
              <div className="mt-6 flex flex-col items-center">
                <Loader />
                <p className="mt-3 text-center text-sm font-medium text-ink-soft">
                  AI is finding your perfect homestay...
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-clay/30 bg-clay/10 p-4 text-sm text-clay-dark">
                {error}
              </div>
            )}

            {recommendation && (
              <div className="dotted-rule mt-6 whitespace-pre-wrap rounded-xl bg-paper pt-6 p-6 text-sm leading-relaxed text-ink">
                <h3 className="mb-3 font-display text-xl text-clay">
                  Your recommendation
                </h3>
                <p>{recommendation}</p>
              </div>
            )}
          </div>
        </section>

        {/* Homestays */}
        <section className="bg-paper px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-center font-mono text-xs uppercase tracking-[0.35em] text-clay">
              The catalogue
            </p>
            <h2 className="mt-3 text-center font-display text-3xl text-ink sm:text-4xl">
              Featured rural homestays
            </h2>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader />
              </div>
            ) : loadError ? (
              <div className="surface mx-auto mt-10 max-w-xl rounded-card border border-clay/20 bg-clay/10 p-6 text-center text-clay-dark">
                {loadError}
              </div>
            ) : homestays.length === 0 ? (
              <div className="surface mx-auto mt-10 max-w-xl rounded-card bg-paper-light p-8 text-center shadow-card">
                <h3 className="font-display text-xl text-ink">No homestays yet</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Homestays added from the dashboard will show up here.
                </p>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {homestays.map((stay) => (
                  <Card
                    key={stay.id}
                    id={stay.id}
                    title={stay.name}
                    location={stay.location}
                    price={stay.price}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-paper px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-clay">
              Why RuralStay
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Built for travelers who take the long way
            </h2>

            <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
              <div className="surface rounded-card border border-ink/5 bg-paper-light p-6 shadow-card">
                <span className="stamp mb-4 h-10 w-10 border-clay text-clay">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5L15 8m-6 8-2.5 2.5m0-13L9 8m6 8 2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="font-display text-xl text-ink">AI recommendations</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Personalized homestays based on your travel preferences, not generic filters.
                </p>
              </div>

              <div className="surface rounded-card border border-ink/5 bg-paper-light p-6 shadow-card">
                <span className="stamp mb-4 h-10 w-10 border-clay text-clay">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-display text-xl text-ink">Authentic experiences</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Stay with local families and experience rural culture first-hand.
                </p>
              </div>

              <div className="surface rounded-card border border-ink/5 bg-paper-light p-6 shadow-card">
                <span className="stamp mb-4 h-10 w-10 border-clay text-clay">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <h3 className="font-display text-xl text-ink">Sustainable tourism</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Support local communities and responsible, low-impact travel.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
