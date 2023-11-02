export default function BuildPaginationResultsData(
  data: any[],
  skip: number,
  take: number
): {
  page: number;
  total_results: number;
  results: any[];
  total_pages: number;
} {
  const total_results = data.length;
  // !splice permanently mutates the data array
  const results = data.splice(skip, take);
  const total_pages = Math.max(Math.ceil(total_results / take), 1);
  const page = skip / take + 1;
  return {
    page,
    total_results,
    results,
    total_pages,
  };
}
