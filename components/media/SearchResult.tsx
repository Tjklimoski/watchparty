import { Movie, TVShow } from "@/types";

interface SearchResultProps {
  media: Movie | TVShow;
}

export default function SearchResult({ media }: SearchResultProps) {
  return <div>SearchResult</div>;
}
