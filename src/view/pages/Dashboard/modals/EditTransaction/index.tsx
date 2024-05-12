// Components
import { Alert } from "../../../../components/Alert";
import { Modal } from "../../../../components/Modal";
import { TransactionForm } from "../components/TransactionForm";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
// Controllers
import { useEditTransactionController } from "./useEditTransactionController";

export function EditTransactionModal() {
  const {
    newTransactionType,
    // Handle edit modal
    showEditTransactionModal,
    handleDeleteTransaction,
    closeEditTransactionModal,
    // To delete form
    showDeleteModal,
    isLoading,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditTransactionController();
  //
  const isExpense = newTransactionType === "EXPENSE";

  if (showDeleteModal) {
    return (
      <Alert
        open={true}
        type="DIALOG"
        title="Delete"
        onClose={handleCloseDeleteModal}
        onOk={() => handleDeleteTransaction()}
        isLoading={isLoading}
      >
        <div className="mx-auto max-w-48 mb-4 flex flex-col items-center gap-6">
          <div className="w-12 h-12 flex justify-center items-center bg-red-50 rounded-full">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>

          <strong className="text-center text-base tracking-[-0.5px]">
            Are you sure you want to delete the transaction?
          </strong>
        </div>
      </Alert>
    );
  }

  return (
    <Modal
      open={showEditTransactionModal}
      title={isExpense ? "Edit expense" : "Edit income"}
      onClose={closeEditTransactionModal}
      headerSuffix={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-5 h-5 text-red-900" />
        </button>
      }
    >
      <TransactionForm isEdit />
    </Modal>
  );
}
