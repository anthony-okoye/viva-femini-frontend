import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-[#2D016C] text-white hover:bg-[#3D018C]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#2D016C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
