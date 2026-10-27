export interface FormattedDateParts {
  weekdayShort: string;
  weekDayFull: string;
  dayNumber: number;
  monthShort: string;
  monthFull: string;
  year: number;
}

export function formatEntryDate(dateStr: string): FormattedDateParts {
  const [year, month, day] = dateStr.split("-").map(Number);

  const localDate = new Date(year, month - 1, day);

  return {
    weekdayShort: localDate.toLocaleDateString("en-GB", { weekday: "short" }),
    weekDayFull: localDate.toLocaleDateString("en-GB", { weekday: "long" }),
    dayNumber: day,
    monthShort: localDate.toLocaleDateString("en-GB", { month: "short" }),
    monthFull: localDate.toLocaleDateString("en-GB", { month: "long" }),
    year,
  };
}
