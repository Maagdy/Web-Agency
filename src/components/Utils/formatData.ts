export function formatDate(timestamp: string | Date): string {
  if (!timestamp) return "";

  let date: Date;

  try {
    date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return String(timestamp);
    }
  } catch {
    return String(timestamp);
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
