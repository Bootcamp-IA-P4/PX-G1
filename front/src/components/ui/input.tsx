import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
