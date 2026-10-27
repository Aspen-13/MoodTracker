export function formatEntryDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);

  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(localDate);
}
