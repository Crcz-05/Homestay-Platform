"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Register() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! Redirecting to Login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-grow items-center justify-center bg-paper-dim px-6 py-16">
        <div className="ticket surface-light w-full max-w-md rounded-card bg-paper-light p-8 shadow-card-hover">
          <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-clay">
            Join the journey
          </p>
          <h1 className="mt-2 text-center font-display text-3xl text-ink">
            Create account
          </h1>

          <form onSubmit={handleRegister} className="mt-7 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-marigold focus:outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-marigold focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-marigold focus:outline-none"
              required
            />

            {error && <p className="text-sm text-clay-dark">{error}</p>}
            {success && <p className="text-sm text-pine-800">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-marigold py-3.5 font-semibold text-pine-950 shadow-[0_10px_30px_-10px_rgba(221,163,40,0.55)] transition-colors hover:bg-marigold-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-clay hover:text-clay-dark">
              Login
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
