import { motion } from "motion/react";

const variantClassMap = {
  primary:
    "group relative overflow-hidden rounded-full border border-transparent bg-[linear-gradient(120deg,color-mix(in_srgb,var(--primary)_90%,#f4b33e_10%),var(--primary))]  shadow-[0_14px_28px_rgba(255,95,80,0.28)]",
  secondary:
    "group relative overflow-hidden rounded-lg border border-white/20 bg-white/5 px-5 text-white backdrop-blur-sm",
  icon:
    "group relative overflow-hidden rounded-full border border-white/20 bg-black/30 text-white/90 backdrop-blur-sm",
};

const sizeClassMap = {
  sm: "h-9 px-3 text-[0.68rem]",
  md: "h-11 px-5 text-[0.72rem]",
  lg: "h-12 px-6 text-[0.75rem]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 px-5 text-[14px] font-bold uppercase tracking-[0.05em] text-text-dark transform scale-100 transition-all duration-300 ease-out",
    variantClassMap[variant] || variantClassMap.primary,
    sizeClassMap[size] || sizeClassMap.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hoverMotion =
    variant === "icon"
      ? { scale: 1.08, y: -2 }
      : { y: -4, scale: 1.01 };

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={hoverMotion}
      whileTap={{ scaleX: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100" />

      {Icon && iconPosition === "left" ? (
        <span className="relative z-10 inline-flex items-center justify-center" aria-hidden="true">
          <Icon size={16} />
        </span>
      ) : null}

      {children ? (
        <span className="relative z-10 inline-flex items-center">{children}</span>
      ) : null}

      {Icon && iconPosition === "right" ? (
        <span className="relative z-10 inline-flex items-center justify-center" aria-hidden="true">
          <Icon size={16} />
        </span>
      ) : null}
    </motion.button>
  );
}
