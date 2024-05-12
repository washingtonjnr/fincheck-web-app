import { useQuery } from "@tanstack/react-query";
// Service
import { bankAccountService } from "../services/bankAccounts/@index";

export function useBankAccounts() {
  const { error, data, isFetching } = useQuery({
    queryKey: ["bank-accounts", "get-all"],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity,
  });

  return {
    data: data ?? [],
    error,
    isFetching,
  }
}
