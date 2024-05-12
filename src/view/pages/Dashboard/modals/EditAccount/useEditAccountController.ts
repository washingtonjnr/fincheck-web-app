import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Context
import { useDashboard } from "../../context/useDashboard";
// Service
import { bankAccountService } from "../../../../../app/services/bankAccounts/@index";

export function useEditAccountController() {
  const queryClient = useQueryClient();
  //
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //
  const {
    accountBeingEdited,
    //
    showEditAccountModal,
    closeEditAccountModal,
  } = useDashboard();

  function handleOpenDeleteModal() {
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["bank-accounts", "delete"],
    mutationFn: async () => {
      await bankAccountService.remove(accountBeingEdited!.id);
    }
  })

  async function handleDeleteAccount() {
    try {
      await mutateAsync();

      closeEditAccountModal();

      queryClient.invalidateQueries({ queryKey: ["bank-accounts", "get-all"] });

      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return {
    showDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    //
    showEditAccountModal,
    closeEditAccountModal,
    //
    isLoading: isPending,
    handleDeleteAccount,
  };
}
