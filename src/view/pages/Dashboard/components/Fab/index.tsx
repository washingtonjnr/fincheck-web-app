import { PlusIcon } from "@radix-ui/react-icons";
// Components
import { Dropdown } from "../../../../components/Dropdown";
import { Income } from "../../../../components/icons/categories/income/Income";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
// Controller
import { useFabController } from "./useFabController";
// Context
import { useDashboard } from "../../context/useDashboard";
// Service - Type
import { TransactionTypes } from "../../../../../app/services/transactions/@type";

export function Fab() {
  const { accounts } = useFabController();
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-3 bottom-3">
      <Dropdown.Root>
        <Dropdown.Trigger>
          <div className="mt-1 w-14 h-14 flex items-center justify-center bg-teal-900 rounded-full shadow-lg">
            <PlusIcon className="text-white w-6 h-6" />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content side="top">
          {accounts.length > 0 && (
            <>
              <Dropdown.Item
                onSelect={() =>
                  openNewTransactionModal(TransactionTypes.EXPENSE)
                }
              >
                <Expense />
                <span className="">New Expense</span>
              </Dropdown.Item>

              <Dropdown.Item
                onSelect={() =>
                  openNewTransactionModal(TransactionTypes.INCOME)
                }
              >
                <Income />
                <span className="">New Income</span>
              </Dropdown.Item>
            </>
          )}

          <Dropdown.Item onSelect={openNewAccountModal}>
            <BankAccountIcon />
            <span className="">New Account</span>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}
