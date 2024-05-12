import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Context
import { useDashboard } from "../../../context/useDashboard";
// to Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Hooks
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
// Service
import { transactionService } from "../../../../../../app/services/transactions/@index";
// Utils
import { LABEL_ERRORS } from "../../../../../../app/utils/labelErrors";
import { currencyToNumber } from "../../../../../../app/utils/currencyToNumber";

const schema = z.object({
  categoryId: z.string(),
  bankAccountId: z.string({ required_error: LABEL_ERRORS.EMPTY }).nonempty(LABEL_ERRORS.EMPTY),
  name: z.string({ required_error: LABEL_ERRORS.EMPTY }).nonempty(LABEL_ERRORS.EMPTY),
  value: z.union([
    z.number({ required_error: LABEL_ERRORS.EMPTY }).nonnegative(LABEL_ERRORS.INVALID_NUMBER),
    z.string({ required_error: LABEL_ERRORS.EMPTY }).nonempty(LABEL_ERRORS.EMPTY),
  ]),
  date: z.date({ required_error: LABEL_ERRORS.EMPTY }),
});

type FormData = z.infer<typeof schema>;

export function useTransactionFormController(isEdit: boolean) {
  const queryClient = useQueryClient();
  //
  const {
    transactionBeingEdited,
    newTransactionType,
    //
    closeEditTransactionModal,
    closeNewTransactionModal,
  } = useDashboard();
  // Although the Accounts component makes the same call, it will not be redone.
  const {
    data: bankAccounts,
    isFetching: isFetchingBankAccounts,
  } = useBankAccounts();
  const {
    data: allCategories,
    isFetching: isFetchingCategories,
  } = useCategories();
  //
  const isExpense = newTransactionType === "EXPENSE";

  const categories = useMemo(() => {
    const filtered = [...allCategories].filter(cat => cat.type === newTransactionType);

    return filtered;
  }, [allCategories, newTransactionType]);

  const {
    reset,
    register,
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transactionBeingEdited?.bankAccount?.id,
      categoryId: transactionBeingEdited?.category?.id,
      date: new Date(transactionBeingEdited!.date),
      name: transactionBeingEdited?.name,
      value: transactionBeingEdited?.value
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["transactions", isEdit ? "edit" : "create"],
    mutationFn: async (params: FormData) => {
      if(!newTransactionType) return null;

      const payload = {
        ...params,
        type: newTransactionType,
        value: currencyToNumber(params.value),
      }

      isEdit ?
        await transactionService.update(transactionBeingEdited!.id, payload) :
        await transactionService.create(payload);
    }
  });

  const handleCreateTransaction = handleFormSubmit(async(data) => {
    try {
      // Calling
      await mutateAsync(data);

      // Close and reset modal
      reset({
        name: "",
        value: "",
        categoryId: "",
        bankAccountId: "",
        date: new Date(),
      });

      isEdit ? closeEditTransactionModal() : closeNewTransactionModal();

      toast.success(`${isExpense ? "Expense" : "Income"} transaction ${isEdit ? "updated" : "created"} successfully`);

      queryClient.invalidateQueries({ queryKey: ["transactions", "get-all"] });
      queryClient.invalidateQueries({ queryKey: ["bank-accounts", "get-all"] });
    } catch (error) {
      toast.error(`${error}`);
    }
  });

  return {
    categories,
    bankAccounts,
    isFetchingCategories,
    isFetchingBankAccounts,
    //
    errors,
    register,
    control,
    isLoading: isPending,
    handleCreateTransaction,
    //
    newTransactionType,
  };
}
