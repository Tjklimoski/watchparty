export function formatBudget(amount: number | null | undefined): string {
  if (amount == null || amount === 0) return "NA";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    notation: "compact",
  }).format(amount);
}

export function formatDate(releaseDate: string | null | undefined): string {
  if (releaseDate == null) return "NA";
  const date = new Date(releaseDate);
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    date
  );
}

export function formatYear(date: string | null | undefined): string {
  if (date == null) return "NA";
  return new Date(date).getFullYear().toString();
}

export function formatLanguage(abrv: string | null | undefined): string {
  if (abrv == null) return "NA";
  // Not an exhustive list, but if not specified will return abrviation
  switch (abrv) {
    case "en":
      return "English";
    case "es":
      return "Spanish";
    case "fr":
      return "French";
    case "pt":
      return "Portuguese";
    case "ru":
      return "Russian";
    case "hi":
      return "Hindi";
    case "ja":
      return "Japanese";
    case "de":
      return "German";
    case "zh":
      return "Mandarin";
    case "it":
      return "Italian";
    default:
      return abrv;
  }
}

export function formatRuntime(runtime: number | null | undefined): string {
  if (runtime == null) return "NA";
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  return `${hours ? `${hours}h ` : ""}${mins}m`;
}