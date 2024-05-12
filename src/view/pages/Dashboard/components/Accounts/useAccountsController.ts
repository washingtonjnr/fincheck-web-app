import { useMemo, useState } from "react";
// Context
import { useDashboard } from "../../context/useDashboard";
// Hooks
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountController() {
  const windowWidth = useWindowWidth();
  //
  const {
    areValuesVisible,
    toggleVisibility,
    //
    closeNewAccountModal,
    openNewAccountModal,
    showNewAccountModal,
    //
  } = useDashboard();
  // to components
  const [sliderState, setSliderState] = useState({ // TODO: reset after new account is created
    isBeginning: true,
    isEnd: false,
  });

  const { data, error, isFetching } = useBankAccounts();

  const currentBalance:number = useMemo<number>(() => {
    const balance: number = data.reduce((acc, bankAccount) => {
      return acc + bankAccount.currentBalance;
    }, 0);

    return balance;
  }, [data]);

  return {
    accounts: data ?? [],
    isLoading: isFetching,
    error,
    currentBalance,
    //
    sliderState,
    setSliderState,
    // context
    areValuesVisible,
    toggleVisibility,
    showNewAccountModal,
    closeNewAccountModal,
    openNewAccountModal,
    // hooks
    windowWidth
  }
}
