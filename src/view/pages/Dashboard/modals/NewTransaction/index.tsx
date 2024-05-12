// Components
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Button";
import { InputDatePicker } from "../../../../components/Input/types/DatePicker";
import { InputCurrency } from "../../../../components/Input/types/Currency";
// Controllers
import { useNewTransactionController } from "./useNewTransactionController";
import { Controller } from "react-hook-form";

export function NewTransactionModal() {
  const {
    categories,
    bankAccounts,
    //
    errors,
    control,
    register,
    handleCreateTransaction,
    isLoading,
    //
    newTransactionType,
    closeNewTransactionModal,
    showNewTransactionModal,
  } = useNewTransactionController();
  //
  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={showNewTransactionModal}
      title={isExpense ? "New expense" : "New income"}
      onClose={closeNewTransactionModal}
    >
      <form className="text-left" onSubmit={handleCreateTransaction}>
        <small className="text-gray-600 tracking-[-0.5px] text-xs">
          {isExpense ? "Expense" : "Income"} balance
        </small>

        <div className="flex justify-center items-center gap-2">
          <small className="text-gray-600 tracking-[-0.5px] text-lg">R$</small>

          <Controller
            control={control}
            name="value"
            render={({ field: { value, onChange } }) => (
              <InputCurrency
                placeholder="0,00"
                value={value}
                onChange={onChange}
                error={errors.value?.message}
              />
            )}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <Input
            placeholder={isExpense ? "Expense name" : "Income name"}
            {...register("name")}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Select category"
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Pay with"
                options={bankAccounts.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <InputDatePicker onChange={onChange} currentValue={value} />
            )}
          />

          <Button className="mt-4" isLoading={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
