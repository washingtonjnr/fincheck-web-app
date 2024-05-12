// Components (Packages)
import { Swiper, SwiperSlide } from "swiper/react";
// Components
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Spinner } from "../../../../components/Spinner";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
// Components (Internal)
import { Card } from "./components/Card";
import { SliderNav } from "./components/SliderNav";
// Controller
import { useAccountController } from "./useAccountsController";
// Utils
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";

export function Accounts() {
  const {
    accounts,
    isLoading,
    //
    currentBalance,
    sliderState,
    setSliderState,
    //
    areValuesVisible,
    toggleVisibility,
    openNewAccountModal,
    //
    windowWidth,
  } = useAccountController();

  return (
    <div className="flex flex-col justify-between gap-10 rounded-2xl py-6 px-3 md:p-10 md:h-full text-white bg-teal-900">
      {isLoading && (
        <div className="flex flex-1 justify-center items-center my-10">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Total balance */}
          <div>
            {/* Subtitle */}
            <h2 className="text-sm md:text-base">Total balance</h2>

            {/* Balance */}
            <div className="flex items-center gap-2 mt-1">
              <strong
                className={cn(
                  "text-2xl tracking-[-0.5px] blur-md transition-all",
                  areValuesVisible && "blur-none"
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                className="p-2 outline-none"
                onClick={() => toggleVisibility()}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          {/* My Accounts */}
          <div>
            {accounts.length > 0 && (
              <Swiper
                spaceBetween={windowWidth >= 500 ? 16 : 10}
                slidesPerView={windowWidth >= 500 ? 2.15 : 1.15}
                onSlideChange={(swipper) => {
                  setSliderState({
                    isBeginning: swipper.isBeginning,
                    isEnd: swipper.isEnd,
                  });
                }}
              >
                {/* Title */}
                <div
                  slot="container-start"
                  className="flex justify-between items-center mb-2"
                >
                  <h2 className="text-base font-bold md:text-lg">
                    My Accounts
                  </h2>

                  {/* Arrows */}
                  {accounts.length > 1 && (
                    <SliderNav
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  )}
                </div>

                {/* Accounts */}
                <div className="mt-4">
                  {accounts.map(({ id, currentBalance, color, name, type }) => {
                    return (
                      <SwiperSlide key={id}>
                        <Card
                          id={id}
                          type={type}
                          balance={currentBalance}
                          color={color}
                          name={name}
                          showBalance={areValuesVisible}
                        />
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            )}

            {accounts.length < 1 && (
              <>
                <h2 className="text-base font-bold md:text-lg">My Accounts</h2>

                <button
                  className="w-full py-8 mt-4 flex flex-col items-center justify-center gap-3 border-dashed border-teal-600 border-2 rounded-3xl"
                  onClick={openNewAccountModal}
                >
                  <PlusCircledIcon className="h-12 w-12" />

                  <span className="text-sm font-medium tracking-[-0.5px]">
                    Create new account
                  </span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
