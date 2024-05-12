import { useQuery } from "@tanstack/react-query";
// Service
import { categoriesService } from "../services/categories/@index";

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ["categories", "get-all"],
    queryFn: categoriesService.getAll,
  });

  return {
    data: data ?? [],
    isFetching,
  }
}
