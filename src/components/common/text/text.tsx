import React from "react";
import clsx from "clsx";
import type { TextProps } from "./text.types";

const Text: React.FC<TextProps> = ({
  variant = "body",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    body: "text-lg text-cyan-900 leading-relaxed",
    muted: "text-base text-gray-500",
    lead: "text-xl font-semibold text-cyan-900",
  }[variant];

  return (
    <p className={clsx(variantStyles, className)} {...props}>
      {children}
    </p>
  );
};

export default Text;
