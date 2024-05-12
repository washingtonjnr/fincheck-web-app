// Components
import { BankAccountTypeIcon } from "../../../../../../components/icons/BankAccountTypeIcon";
// Context
import { useDashboard } from "../../../../context/useDashboard";
// Service
import { BankAccountTypes } from "../../../../../../../app/services/bankAccounts/@type";
// Utils
import { formatCurrency } from "../../../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../../../app/utils/cn";

type CardProps = {
  id: string;
  name: string;
  color: string;
  balance: number;
  showBalance: boolean;
  type: BankAccountTypes;
};

export function Card({ id, name, color, balance, showBalance, type }: CardProps) {
  const { openEditAccountModal } = useDashboard();

  return (
    <div
      role="button"
      className="h-[200px] flex flex-col justify-between border-b-4 border-teal-950 p-4 gap-6 rounded-2xl overflow-hidden bg-white text-gray-800"
      style={{ borderColor: color }}
      onClick={() =>
        openEditAccountModal({
          id,
          name,
          type,
          color,
          currentBalance: balance,
        })
      }
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <p className="mt-3 font-medium tracking-[-0.5px]">{name}</p>
      </div>

      <div>
        <p
          className={cn(
            "font-medium tracking-[-0.5px] blur-md transition-all",
            showBalance && "blur-none"
          )}
        >
          {formatCurrency(balance)}
        </p>

        <small className="text-gray-600 text-sm">Current balance</small>
      </div>
    </div>
  );
}
