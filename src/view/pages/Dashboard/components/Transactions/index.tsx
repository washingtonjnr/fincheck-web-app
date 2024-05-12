// Components (Internal)
import { CardItem } from "./components/CardItem";
import { FiltersModal } from "./components/FiltersModal";
import { TransactionTypeDropdown } from "./components/TransactionTypeDropdown";
// Components
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
// Controllers
import { useTransactionsController } from "./useTransactionsController";
// Assets
import emptyState from "../../../../../assets/images/empty-state.svg";
import { SwiperOptions } from "../../../../components/SwiperOption";
import { MONTHS } from "../../../../../app/config/constants";

export function Transactions() {
  const {
    filters,
    handleChangeFilter,
    //
    transactions,
    isInitialLoading,
    isLoading,
    areValuesVisible,
    // Swiper month
    handleSliderState,
    // Filters modal
    showFiltersModal,
    handleShowFiltersModal,
    handleCloseFilterModal,
  } = useTransactionsController();

  const loadingComponent = (
    <div className="flex flex-1 justify-center items-center my-10">
      <Spinner className="fill-teal-900 text-gray-100" />
    </div>
  );

  return (
    <div className="w-full flex flex-col rounded-2xl py-6 px-3 md:p-10 md:h-full text-gray-900 bg-gray-100">
      {!isInitialLoading && (
        <>
          <FiltersModal
            open={showFiltersModal}
            onClose={() => handleCloseFilterModal()}
            // filters
            year={filters.year}
            bankAccountId={filters.bankAccountId}
            onApply={(bankAccountId, year) => {
              handleChangeFilter("year")(year)
              handleChangeFilter("bankAccountId")(bankAccountId);

              handleCloseFilterModal();
            }}
          />

          <header className="block">
            {/* Dropdown and Filter */}
            <div className="flex justify-between items-center mb-4">
              <TransactionTypeDropdown
                value={filters.type}
                onSelect={(value) => handleChangeFilter("type")(value)}
              />

              <button onClick={() => handleShowFiltersModal()}>
                <FilterIcon />
              </button>
            </div>

            {/* Filter by month */}
            <SwiperOptions
              slidesPerView={3}
              options={MONTHS}
              initialSlide={filters.month}
              setState={({ isBeginning, isEnd, selected, index }) => {
                if (index === filters.month) return;

                handleSliderState(isBeginning, isEnd);

                handleChangeFilter("month")(selected);
              }}
            />
          </header>

          {isLoading && loadingComponent}

          {!isLoading && (
            <div className="mt-4 space-y-3 flex-1 md:overflow-y-auto">
              {transactions.map((transaction) => {
                return (
                  <CardItem
                    key={transaction.id}
                    transaction={transaction}
                    showBalance={areValuesVisible}
                  />
                );
              })}

              {transactions.length < 1 && (
                <div className="h-full flex flex-col justify-center items-center py-8">
                  <img
                    src={emptyState}
                    alt="woman using magnifying glass"
                    className="mb-2"
                  />

                  <span className="text-sm md:text-base text-gray-700">
                    We did not find any transactions
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Only First Get */}
      {isInitialLoading && loadingComponent}
    </div>
  );
}
