import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ButtonAction } from "@/components/ui/button";
import { calConfig } from "@/config/cal";

type BookCallButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ButtonAction>,
  "icon"
> & {
  icon?: LucideIcon | null;
};

export function BookCallButton({
  children,
  icon = ArrowUpRight,
  ...props
}: BookCallButtonProps) {
  return (
    <ButtonAction
      icon={icon ?? undefined}
      data-cal-link={calConfig.link}
      data-cal-namespace={calConfig.namespace}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
      data-analytics-event="book_call"
      data-analytics-location="cta"
      {...props}
    >
      {children}
    </ButtonAction>
  );
}
