// Context
import { useDashboard } from "../../context/useDashboard";

export function useNewAccountController() {
  const {
    showNewAccountModal,
    closeNewAccountModal,
  } = useDashboard();

  return {
    showNewAccountModal,
    closeNewAccountModal,
  };
}
