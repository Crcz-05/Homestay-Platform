"use client";

import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/ui/Loader";
import Toast from "../../components/ui/Toast";
import { getHomestayImage, getHomestayImageFallback } from "../../lib/homestayImage";

type Homestay = {
  id: number;
  name: string;
  location: string;
  price: number;
};

type FormErrors = {
  name?: string;
  location?: string;
  price?: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/homestays`;

  useEffect(() => {
    const checkAuth = async () => {
      // First check custom JWT
      const token = localStorage.getItem("token");

      if (token) {
        setCheckingAuth(false);
        loadHomestays();
        return;
      }

      // Otherwise check Google OAuth session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setCheckingAuth(false);
        loadHomestays();
      } else {
        router.push("/login");
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Auto-dismiss the success/info toast after a few seconds
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  function authHeaders(json = false): HeadersInit {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (json) headers["Content-Type"] = "application/json";
    return headers;
  }

  async function loadHomestays() {
    setListLoading(true);
    setListError("");

    try {
      const res = await fetch(API, { headers: authHeaders() });

      if (!res.ok) {
        throw new Error("Failed to load homestays.");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setHomestays(data);
      } else {
        setHomestays([]);
      }
    } catch (err) {
      console.log(err);
      setListError(
        "Unable to load homestays. Please make sure the backend server is running."
      );
    } finally {
      setListLoading(false);
    }
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    if (!name.trim()) errors.name = "Homestay name is required.";

    if (!location.trim()) errors.location = "Location is required.";

    if (!price.trim()) {
      errors.price = "Price is required.";
    } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      errors.price = "Price must be a positive number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function resetForm() {
    setName("");
    setLocation("");
    setPrice("");
    setFormErrors({});
    setEditingId(null);
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const isEditing = editingId !== null;

      const res = await fetch(isEditing ? `${API}/${editingId}` : API, {
        method: isEditing ? "PUT" : "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim(),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not save the homestay.");
      }

      setToastMessage(
        isEditing ? "Homestay updated successfully." : "Homestay added successfully."
      );

      resetForm();
      await loadHomestays();
    } catch (err) {
      console.log(err);
      setFormErrors({
        name: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteHomestay(id: number) {
    if (!confirm("Delete this homestay?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) {
        throw new Error("Could not delete the homestay.");
      }

      setToastMessage("Homestay deleted successfully.");

      if (editingId === id) resetForm();

      await loadHomestays();
    } catch (err) {
      console.log(err);
      setListError("Could not delete the homestay. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  function editHomestay(stay: Homestay) {
    setEditingId(stay.id);
    setName(stay.name);
    setLocation(stay.location);
    setPrice(stay.price.toString());
    setFormErrors({});
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {toastMessage && <Toast message={toastMessage} />}

      <main className="flex-grow bg-paper p-4 sm:p-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-clay">
            Host tools
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Admin dashboard
          </h1>

          <div className="surface mt-8 rounded-card bg-paper-light p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl text-ink">
              {editingId === null ? "Add homestay" : "Update homestay"}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Name
                </label>
                <input
                  className={`mt-1.5 w-full rounded-xl border bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none ${
                    formErrors.name ? "border-clay" : "border-ink/15 focus:border-marigold"
                  }`}
                  placeholder="Homestay name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-clay-dark">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Location
                </label>
                <input
                  className={`mt-1.5 w-full rounded-xl border bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none ${
                    formErrors.location ? "border-clay" : "border-ink/15 focus:border-marigold"
                  }`}
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-clay-dark">{formErrors.location}</p>
                )}
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Price per night (₹)
                </label>
                <input
                  type="number"
                  className={`mt-1.5 w-full rounded-xl border bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none ${
                    formErrors.price ? "border-clay" : "border-ink/15 focus:border-marigold"
                  }`}
                  placeholder="e.g. 3500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {formErrors.price && (
                  <p className="mt-1 text-sm text-clay-dark">{formErrors.price}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-full bg-marigold px-6 py-3 font-semibold text-pine-950 shadow-[0_10px_30px_-10px_rgba(221,163,40,0.55)] transition-colors hover:bg-marigold-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? editingId === null
                    ? "Adding..."
                    : "Updating..."
                  : editingId === null
                  ? "Add homestay"
                  : "Update homestay"}
              </button>

              {editingId !== null && (
                <button
                  onClick={resetForm}
                  disabled={submitting}
                  className="rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink-soft transition-colors hover:border-marigold hover:text-clay"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {listLoading ? (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          ) : listError ? (
            <div className="mt-8 rounded-card border border-clay/20 bg-clay/10 p-6 text-center text-clay-dark">
              {listError}
            </div>
          ) : homestays.length === 0 ? (
            <div className="surface mt-8 rounded-card bg-paper-light p-8 text-center shadow-card">
              <h3 className="font-display text-xl text-ink">No homestays yet</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Use the form above to add your first homestay.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {homestays.map((stay) => (
                <div
                  key={stay.id}
                  className="surface flex flex-col overflow-hidden rounded-card border border-ink/5 bg-paper-light shadow-card sm:flex-row"
                >
                  <img
                    src={getHomestayImage(stay.id, stay.name)}
                    alt={stay.name}
                    className="h-40 w-full flex-shrink-0 bg-paper-dim object-cover sm:w-40"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const fallback = getHomestayImageFallback(stay.id);
                      if (img.src !== fallback) img.src = fallback;
                    }}
                  />

                  <div className="flex-1 p-5">
                    <h2 className="font-display text-xl text-ink">{stay.name}</h2>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-clay">
                        <path
                          d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      {stay.location}
                    </p>

                    <p className="mt-2 font-mono font-semibold text-clay">
                      ₹{stay.price.toLocaleString("en-IN")}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => editHomestay(stay)}
                        className="rounded-full bg-pine-900 px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-pine-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteHomestay(stay.id)}
                        disabled={deletingId === stay.id}
                        className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === stay.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
