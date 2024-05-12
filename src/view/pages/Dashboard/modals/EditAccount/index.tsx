// Components
import { Alert } from "../../../../components/Alert";
import { Modal } from "../../../../components/Modal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { BankAccountForm } from "../components/BankAccountForm";
// Controllers
import { useEditAccountController } from "./useEditAccountController";

export function EditAccountModal() {
  const {
    showDeleteModal,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    //
    showEditAccountModal,
    closeEditAccountModal,
    //
    isLoading,
    handleDeleteAccount,
  } = useEditAccountController();

  if (showDeleteModal) {
    return (
      <Alert
        open={true}
        type="DIALOG"
        title="Delete"
        onClose={handleCloseDeleteModal}
        onOk={() => handleDeleteAccount()}
        isLoading={isLoading}
      >
        <div className="mx-auto max-w-48 mb-4 flex flex-col items-center gap-6">
          <div className="w-12 h-12 flex justify-center items-center bg-red-50 rounded-full">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>

          <strong className="text-center text-base tracking-[-0.5px]">
            Are you sure you want to delete the account?
          </strong>
        </div>

        <p className="text-sm text-center">
          When you delete the account, all related income and expense records
          will also be deleted.
        </p>
      </Alert>
    );
  }

  return (
    <Modal
      title="Edit Account"
      open={showEditAccountModal}
      onClose={closeEditAccountModal}
      headerSuffix={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-5 h-5 text-red-900" />
        </button>
      }
    >
      <BankAccountForm isEdit />
    </Modal>
  );
}
