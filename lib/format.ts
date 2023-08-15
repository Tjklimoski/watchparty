export function formatBudget(amount: number | null): string {
  if (!amount) return "NA";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}

export function formatReleaseDate(releaseDate: string | null): string {
  if (!releaseDate) return "NA";
  const date = new Date(releaseDate);
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    date
  );
}

export function formatLanguage(abrv: string | null): string {
  if (!abrv) return "NA";
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

export function formatRuntime(runtime: number | null): string {
  if (!runtime) return "NA";
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  return `${hours ? `${hours}h ` : ""}${mins}m`;
}