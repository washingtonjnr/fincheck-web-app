import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// to Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Context
import { useDashboard } from "../../../context/useDashboard";
// Utils
import { LABEL_ERRORS } from "../../../../../../app/utils/labelErrors";
import { currencyToNumber } from "../../../../../../app/utils/currencyToNumber";
// Service
import { BankAccountParams, BankAccountTypes } from "../../../../../../app/services/bankAccounts/@type";
import { bankAccountService } from "../../../../../../app/services/bankAccounts/@index";

const bankAccountTypes: [string, ...string[]] = Object.values(BankAccountTypes) as [string, ...string[]];

const schema = z.object({
  initialBalance: z.union([
    z.string({ required_error: LABEL_ERRORS.EMPTY }).nonempty(LABEL_ERRORS.EMPTY),
    z.number({ required_error: LABEL_ERRORS.EMPTY }).nonnegative(LABEL_ERRORS.EMPTY),
  ]),
  name: z.string().nonempty(LABEL_ERRORS.EMPTY),
  type: z.enum(bankAccountTypes, { required_error: LABEL_ERRORS.INVALID_TYPE }),
  color: z.string({ required_error: LABEL_ERRORS.EMPTY }).nonempty(LABEL_ERRORS.EMPTY),
});

type FormData = z.infer<typeof schema>;

// In FormData the type is string
type ModifiedFormData = Omit<FormData, "type"> & { type: BankAccountTypes };

export function useBankAccountController(isEdit: boolean) {
  const queryClient = useQueryClient();
  //
  const {
    accountBeingEdited,
    //
    closeEditAccountModal,
    closeNewAccountModal,
  } = useDashboard();
  //
  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<ModifiedFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.currentBalance,
    }
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["bank-accounts", (isEdit ? "create" : "update")],
    mutationFn: async (params: BankAccountParams) =>
      !isEdit ?
        await bankAccountService.create(params) :
        await bankAccountService.update(accountBeingEdited!.id, params)
  });

  const handleSubmit = hookFormSubmit(async(data) => {
    try {
      const payload = {
        ...data,
        initialBalance: currencyToNumber(data.initialBalance),
      };

      // Calling
      await mutateAsync(payload);

      // Close and reset modal
      reset({
        color: "",
        initialBalance: "",
        name: "",
      });
      isEdit ? closeEditAccountModal() : closeNewAccountModal();

      queryClient.invalidateQueries({ queryKey: ["bank-accounts", "get-all"] });

      toast.success(
        isEdit ?
        "Account updated successfully" :
        "Account created successfully"
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  });

  return {
    isLoading: isPending,
    errors,
    control,
    register,
    handleSubmit,
  };
}
