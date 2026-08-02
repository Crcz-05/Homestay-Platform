/**
 * Input Component
 * Props:
 * - label
 * - placeholder
 * - type
 * - value
 * - onChange
 * - error
 */

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`rounded-xl border bg-paper-light px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:border-marigold focus:outline-none ${
          error ? "border-clay" : "border-ink/15"
        }`}
      />

      {error && <span className="text-sm text-clay">{error}</span>}
    </div>
  );
}
