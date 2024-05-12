import { useEffect, useState } from "react";
// Context
import { useDashboard } from "../../context/useDashboard";
// Hook
import { useTransactions } from "../../../../../app/hooks/useTransactions";
// Type
import { TransactionFilterParams } from "../../../../../app/services/transactions/@type";

export function useTransactionsController() {
  const { areValuesVisible, toggleVisibility } = useDashboard();
  // filters
  const [filters, setFilters] = useState<TransactionFilterParams>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    type: null,
  });
  // to components: [swiper month, filtersModal]
  const [sliderState, setSliderState] = useState(() => ({
    isBeginning: filters.month <= 0,
    isEnd: filters.month >= 11,
  }));
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  //
  const {
    data: transactions,
    isFetching: isLoading,
    isInitialLoading,
    refetch,
  } = useTransactions(filters);

  // TODO: see here the cool technology
  function handleChangeFilter<TFilter extends keyof TransactionFilterParams>(
    filter: TFilter
  ) {
    return (value: TransactionFilterParams[TFilter]) => {
      if(value === filters[filter]) return;

      setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
    }
  }

  function handleShowFiltersModal() {
    setShowFiltersModal(true);
  }

  function handleCloseFilterModal() {
    setShowFiltersModal(false);
  }

  function handleSliderState(isBeginning: boolean, isEnd: boolean) {
    setSliderState({ isBeginning, isEnd });
  }

  useEffect(() => {
    refetch();
  }, [filters])

  return {
    filters,
    handleChangeFilter,
    //
    transactions: transactions || [],
    isLoading,
    isInitialLoading, // to first get
    //
    sliderState,
    handleSliderState,
    showFiltersModal,
    handleShowFiltersModal,
    handleCloseFilterModal,
    //
    areValuesVisible,
    toggleVisibility,
  }
}
