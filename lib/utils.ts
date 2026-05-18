import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case "SUCCESS":
    case "PUBLISHED":
      return "text-emerald-400";
    case "PENDING":
    case "SCHEDULED":
      return "text-amber-400";
    case "FAILED":
    case "ERROR":
      return "text-red-400";
    default:
      return "text-muted-foreground";
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toUpperCase()) {
    case "SUCCESS":
    case "PUBLISHED":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "PENDING":
    case "SCHEDULED":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "FAILED":
    case "ERROR":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}
