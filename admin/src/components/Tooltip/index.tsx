import React from "react";
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  side?: "top" | "left" | "right" | "bottom";
};

export default function Tooltip({
  content,
  children,
  side = "top",
}: TooltipProps) {
  return (
    <ShadTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <div className="p-[0.5rem] text-[1rem] font-semibold">{content}</div>
      </TooltipContent>
    </ShadTooltip>
  );
}

export function SideBarTooltip({ icon, children }) {
  return (
    <ShadTooltip>
      <TooltipTrigger>{icon}</TooltipTrigger>
      <TooltipContent side="right">{children}</TooltipContent>
    </ShadTooltip>
  );
}
