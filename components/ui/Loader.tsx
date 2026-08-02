/**
 * Loader Component
 * Shows loading spinner
 */

export default function Loader() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-marigold/25 border-t-marigold"
      role="status"
      aria-label="Loading"
    />
  );
}
