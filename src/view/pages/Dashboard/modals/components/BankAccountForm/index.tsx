import { Controller } from "react-hook-form";
// Components
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";
import { InputCurrency } from "../../../../../components/Input/types/Currency";
import { DropdownInputColors } from "../../../../../components/Dropdown/types/Colors";
// Controller
import { useBankAccountController } from "./useBankAccountController";

type BankAccountFormProps = {
  isEdit?: boolean;
}

export function BankAccountForm({ isEdit }: BankAccountFormProps) {
  const {
    isLoading,
    errors,
    control,
    register,
    handleSubmit,
  } = useBankAccountController(!!isEdit);

  return (
    <form className="text-left" onSubmit={handleSubmit}>
      <small className="text-gray-600 tracking-[-0.5px] text-xs">
        Initial balance
      </small>

      <div className="flex justify-center items-center gap-2">
        <small className="text-gray-600 tracking-[-0.5px] text-lg">R$</small>

        <Controller
          control={control}
          name="initialBalance"
          render={({ field: { onChange, value } }) => (
            <InputCurrency
              placeholder="0,00"
              value={value}
              error={errors.initialBalance?.message}
              onChange={({ target: { value } }) => {
                onChange(value);
              }}
            />
          )}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Input
          placeholder="Account name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                placeholder="Select type"
                options={[
                  { value: "CHECKING", label: "Checking" },
                  { value: "INVESTMENT", label: "Investments" },
                  { value: "CASH", label: "Cash" },
                ]}
                error={errors.type?.message}
                value={value}
                onChange={(type) => {
                  onChange(type);
                }}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="color"
          render={({ field: { onChange, value } }) => (
            <DropdownInputColors
              error={errors.color?.message}
              value={value}
              onChange={(color: string) => {
                onChange(color);
              }}
            />
          )}
        />

        <Button className="mt-4" isLoading={isLoading}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
