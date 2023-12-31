import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const maxHeight = 200; // Max height in pixels
      e.target.style.height = "auto";
      e.target.style.overflowY = "hidden"; // Temporarily hide scrollbar

      if (e.target.scrollHeight > maxHeight) {
        e.target.style.height = `${maxHeight}px`;
        e.target.style.overflowY = "scroll"; // Show scrollbar when max height is reached
      } else {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      // Call the original onChange prop if it exists
      if (onChange) {
        onChange(e);
      }
    };
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        onChange={adjustHeight}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
