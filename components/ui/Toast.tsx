"use client";

/**
 * Toast Component
 * Displays notification message
 */

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div className="animate-rise-in fixed right-5 top-20 z-[100] flex items-center gap-2 rounded-full bg-pine-950 px-5 py-3 text-sm font-medium text-paper shadow-card-hover">
      <span className="text-marigold">★</span>
      {message}
    </div>
  );
}
