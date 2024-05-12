// Hooks
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useFabController() {
  const { data } = useBankAccounts();

  return {
    accounts: data ?? [],
  }
}
