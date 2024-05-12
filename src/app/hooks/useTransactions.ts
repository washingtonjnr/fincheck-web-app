import { useQuery } from "@tanstack/react-query";
// Service
import { transactionService } from "../services/transactions/@index";
import { TransactionFilterParams } from "../services/transactions/@type";

export function useTransactions(filters: TransactionFilterParams) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["transactions", "get-all"],
    queryFn: async() => await transactionService.getAll(filters),
  });

  return {
    refetch,
    data: data ?? [],
    isFetching,
    isInitialLoading: isLoading
  }
}
