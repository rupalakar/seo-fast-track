import type { TaskStatus } from "@/lib/types/state";
import type { BadgeProps } from "@/components/ui/badge";

export const TASK_STATUS_BADGE_VARIANT: Record<TaskStatus, NonNullable<BadgeProps["variant"]>> = {
  NEW: "outline",
  DO: "info",
  REVIEW: "warning",
  NEEDS_REVISION: "destructive",
  APPROVED: "success",
};
