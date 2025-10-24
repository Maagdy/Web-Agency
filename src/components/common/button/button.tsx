import React from "react";
import clsx from "clsx";
import type { ButtonProps } from "./button.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  iconLeft,
  iconRight,
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-[28px] text-base shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer flex items-center gap-2 border";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  }[size];

  const variantStyles = {
    primary:
      "bg-[var(--mainColor)] text-white border-[var(--mainColor)] hover:bg-white hover:text-[var(--mainColor)]",
    popular:
      "bg-cyan-400 text-[var(--mainColor)] border-transparent hover:bg-white hover:text-[var(--mainColor)] hover:border-[var(--mainColor)]",
    secondary:
      "bg-transparent text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-[var(--mainColor)]",
  }[variant];

  return (
    <button
      type={props.type || "button"} // ✅ default type
      disabled={props.disabled}
      className={clsx(
        baseStyles,
        sizeStyles,
        variantStyles,
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
};

export default Button;
