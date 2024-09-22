import { clsx, type ClassValue } from "clsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { twMerge } from "tailwind-merge";

TimeAgo.addDefaultLocale(en);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocaleDateString(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function toLocalTimeago(date: Date) {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(date);
}
