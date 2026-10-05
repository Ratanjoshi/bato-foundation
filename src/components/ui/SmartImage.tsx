"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-primary/10 text-primary/30",
          className
        )}
        role="img"
        aria-label={typeof alt === "string" ? alt : "Image"}
        style={
          props.fill
            ? { position: "absolute", inset: 0 }
            : { width: "100%", height: "100%" }
        }
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={typeof alt === "string" ? alt : "Image"}
      className={className}
      onError={() => setError(true)}
    />
  );
}
