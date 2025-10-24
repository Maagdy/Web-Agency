import React from "react";

export type TextVariant = "body" | "muted" | "lead";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: React.ReactNode;
}
