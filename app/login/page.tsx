"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-grow items-center justify-center bg-paper-dim px-6 py-16">
        <div className="ticket surface-light w-full max-w-md rounded-card bg-paper-light p-8 shadow-card-hover">
          <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-clay">
            Welcome back
          </p>

          <h1 className="mt-2 text-center font-display text-3xl text-ink">
            Login
          </h1>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
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

            {error && (
              <p className="text-sm text-clay-dark">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-marigold py-3.5 font-semibold text-pine-950 shadow-[0_10px_30px_-10px_rgba(221,163,40,0.55)] transition-colors hover:bg-marigold-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/15 py-3.5 text-sm font-medium text-ink transition-colors hover:border-marigold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2.2 12 2.2 6.8 2.2 2.6 6.4 2.6 11.8S6.8 21.4 12 21.4c6.9 0 9.6-4.8 9.6-7.3 0-.5 0-.9-.1-1.3H12Z"
                />
              </svg>

              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            New user?{" "}
            <a
              href="/register"
              className="font-semibold text-clay hover:text-clay-dark"
            >
              Register
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}