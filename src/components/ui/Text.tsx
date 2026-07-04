import * as React from "react";
import { Platform, Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/utils";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "bodyLarge" | "bodySmall" | "caption" | "label";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

function Text({ variant = "body", className, ...props }: TextProps) {
  return (
    <RNText
      className={cn(
        "text-foreground text-base",
        variant === "h1" && "text-4xl font-extrabold tracking-tight",
        variant === "h2" && "text-3xl font-semibold tracking-tight",
        variant === "h3" && "text-2xl font-semibold tracking-tight",
        variant === "h4" && "text-xl font-semibold tracking-tight",
        variant === "bodyLarge" && "text-lg",
        variant === "bodySmall" && "text-sm",
        variant === "caption" && "text-xs",
        variant === "label" && "text-sm font-medium",
        Platform.select({ web: "select-text" }),
        className
      )}
      {...props}
    />
  );
}

export type { TextProps, TextVariant };
export { Text };
