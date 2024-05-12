import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Context
import { useDashboard } from "../../context/useDashboard";
// Service
import { transactionService } from "../../../../../app/services/transactions/@index";

export function useEditTransactionController() {
  const queryClient = useQueryClient();
  //
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //
  const {
    newTransactionType,
    transactionBeingEdited,
    //
    showEditTransactionModal,
    closeEditTransactionModal,
  } = useDashboard();

  function handleOpenDeleteModal() {
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["transactions", "delete"],
    mutationFn: async () => {
      await transactionService.remove(transactionBeingEdited!.id);
    }
  })

  async function handleDeleteTransaction() {
    try {
      await mutateAsync();

      closeEditTransactionModal();

      queryClient.invalidateQueries({ queryKey: ["transactions", "get-all"] });
      queryClient.invalidateQueries({ queryKey: ["bank-accounts", "get-all"] });

      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return {
    showDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    //
    newTransactionType,
    transactionBeingEdited,
    //
    showEditTransactionModal,
    closeEditTransactionModal,
    //
    isLoading: isPending,
    handleDeleteTransaction,
  };
}
