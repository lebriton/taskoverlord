import * as RadixIcons from "@radix-ui/react-icons";
import * as LucideIcons from "lucide-react";

export const DueDateIcon = LucideIcons.CalendarClockIcon;
export const ScheduledDateIcon = LucideIcons.AlarmClockIcon;
export const WaitDateIcon = LucideIcons.HourglassIcon;
export const UntilDateIcon = LucideIcons.ClockAlertIcon;

export const AnnotationsIcon = LucideIcons.MessageSquareIcon;
export const UrgencyIcon = LucideIcons.SirenIcon;

export function isRadixIcon(icon: any): boolean {
  return Object.values(RadixIcons).includes(icon);
}

export function isLucideIcon(icon: any): boolean {
  return Object.values(LucideIcons).includes(icon);
}
