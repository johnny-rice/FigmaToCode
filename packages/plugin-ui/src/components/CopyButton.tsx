"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import copy from "copy-to-clipboard";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface CopyButtonProps {
  value: string;
  className?: string;
  showLabel?: boolean;
  successDuration?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CopyButton({
  value,
  className,
  showLabel = true,
  successDuration = 750,
  onMouseEnter,
  onMouseLeave,
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => clearTimeout(timer);
    }
  }, [isCopied, successDuration]);

  const handleCopy = async () => {
    try {
      copy(value);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative h-8 overflow-hidden rounded-md px-3 text-sm font-medium text-foreground transition-colors duration-150 ease-out hover:bg-neutral-200 motion-reduce:transition-none dark:hover:bg-neutral-600",
        "bg-neutral-100 dark:bg-neutral-700",
        className,
      )}
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      <span className="relative mr-1.5 h-4 w-4" aria-hidden="true">
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-150 ease-out motion-reduce:transition-none",
            isCopied ? "opacity-0" : "opacity-100",
          )}
        >
          <Copy className="h-4 w-4" />
        </span>
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-150 ease-out motion-reduce:transition-none",
            isCopied ? "text-primary opacity-100" : "opacity-0",
          )}
        >
          <Check className="h-4 w-4" />
        </span>
      </span>

      {showLabel && (
        <span className="grid min-w-[3.9rem] text-left">
          <span
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-150 ease-out motion-reduce:transition-none",
              isCopied ? "opacity-0" : "opacity-100",
            )}
          >
            Copy
          </span>
          <span
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-150 ease-out motion-reduce:transition-none",
              isCopied ? "text-primary opacity-100" : "opacity-0",
            )}
          >
            Copied
          </span>
        </span>
      )}
    </Button>
  );
}
