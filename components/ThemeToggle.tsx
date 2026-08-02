"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="flex items-center gap-1.5 rounded-full border border-paper/25 px-3 py-1.5 text-xs font-medium text-paper/85 transition-colors hover:border-marigold hover:text-marigold"
    >
      {dark ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Dark
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          Light
        </>
      )}
    </button>
  );
}
