/**
 * Button Component
 * Props:
 * - variant: primary | secondary | outline
 * - size: sm | md | lg
 * - disabled: boolean
 * - onClick: function
 */

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-marigold text-pine-950 hover:bg-marigold-dark shadow-[0_8px_20px_-8px_rgba(221,163,40,0.55)]",
    secondary: "bg-pine-900 text-paper hover:bg-pine-800",
    outline: "border border-ink/20 text-ink hover:border-marigold hover:text-clay",
  };

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
