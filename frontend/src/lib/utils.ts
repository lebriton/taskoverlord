import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow, format, isToday, isYesterday, isSameYear } from "date-fns";
import { enUS } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocaleDateString(date: Date | string) {
  return format(date, "EEEE, MMMM do, yyyy", { locale: enUS });
}

export function toLocaleTimeago(date: Date | string, detailed: boolean = false) {
  const locale = enUS;

  if (detailed) {
    if (isToday(date)) {
      return format(date, "HH:mm", { locale });
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      const now = new Date();
      const formatStr = isSameYear(date, now) ? "MMMM do" : "MMMM do, yyyy";
      return format(date, formatStr, { locale });
    }
  }

  return formatDistanceToNow(date, { addSuffix: true, locale });
}
