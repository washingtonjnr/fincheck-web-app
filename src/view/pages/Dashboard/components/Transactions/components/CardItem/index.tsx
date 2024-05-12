// Components
import { CategoryIcon } from "../../../../../../components/icons/categories/CategoryIcon";
// Context
import { useDashboard } from "../../../../context/useDashboard";
// Types
import { Transaction } from "../../../../../../../app/services/transactions/@type";
// Utils
import { cn } from "../../../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../../../app/utils/formatCurrency";
import { formatDate } from "../../../../../../../app/utils/formatDate";

type CardItemProps = {
  showBalance: boolean;
  transaction: Transaction;
};

export function CardItem({ showBalance, transaction }: CardItemProps) {
  const { name, type, category, date, value } = transaction;
  //
  const isExpense = type === "EXPENSE";
  //
  const { openEditTransactionModal } = useDashboard();

  return (
    <div
      role="button"
      className="flex flex-1 bg-white justify-between items-center p-2 md:p-4 rounded-2xl gap-3 md:gap-4"
      onClick={() => openEditTransactionModal(transaction)}
    >
      <div className="flex flex-1 items-center">
        <CategoryIcon type={type} category={category?.icon} />

        <div className="ml-2 flex flex-col justify-center">
          <span className="font-bold tracking-[-0.5px]">{name}</span>

          <small className="text-xs  text-gray-600">{formatDate(date)}</small>
        </div>
      </div>

      <span
        className={cn(
          "tracking-[-0.5px] font-medium text-sm md:text-base blur-md transition-all",
          isExpense ? "text-red-800" : "text-teal-900",
          showBalance && "blur-none"
        )}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}
