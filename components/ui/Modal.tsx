"use client";

import { useEffect } from "react";

/**
 * Modal Component
 * Props:
 * - isOpen
 * - onClose
 * - title
 * - children
 */

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pine-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-card border border-ink/10 bg-paper-light p-6 shadow-card-hover">
        <h2 className="font-display text-xl text-ink">{title}</h2>

        <div className="mt-4 text-sm text-ink-soft">{children}</div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-pine-900 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
