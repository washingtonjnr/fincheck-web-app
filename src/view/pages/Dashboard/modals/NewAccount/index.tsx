// Components
import { Modal } from "../../../../components/Modal";
import { BankAccountForm } from "../components/BankAccountForm";
// Controllers
import { useNewAccountController } from "./useNewAccountController";

export function NewAccountModal() {
  const {
    showNewAccountModal,
    closeNewAccountModal,
  } = useNewAccountController();

  return (
    <Modal
      open={showNewAccountModal}
      title="New Account"
      onClose={closeNewAccountModal}
    >
      <BankAccountForm />
    </Modal>
  );
}
