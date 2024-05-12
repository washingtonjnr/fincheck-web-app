import { createContext, useCallback, useEffect, useState } from "react";
// Config
import { localStorageKeys } from "../../../../app/config/localStorageKeys";
// Service
import { TransactionTypes, Transaction } from "../../../../app/services/transactions/@type";
import { BankAccount } from "../../../../app/services/bankAccounts/@type";

type DashboardContextValue = {
  areValuesVisible: boolean;
  toggleVisibility(): void;
  //
  showNewAccountModal: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  //
  showEditAccountModal: boolean;
  accountBeingEdited: BankAccount | null;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  //
  showNewTransactionModal: boolean;
  newTransactionType: TransactionTypes | null;
  openNewTransactionModal(type: TransactionTypes): void;
  closeNewTransactionModal(): void;
  //
  showEditTransactionModal: boolean;
  transactionBeingEdited: Transaction | null;
  openEditTransactionModal(transaction: Transaction): void;
  closeEditTransactionModal(): void;
};

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // To modals
  const [showNewAccountModal, setShowNewAccountModal] =
    useState<boolean>(false);
  const [showEditAccountModal, setShowEditAccountModal] =
    useState<boolean>(false);
  const [showNewTransactionModal, setShowNewTransactionModal] =
    useState<boolean>(false);
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState<boolean>(false);
  // Aux modals
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null);
  const [newTransactionType, setNewTransactionType] = useState<TransactionTypes | null>(null);
  //
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
    const areVisible = window.localStorage.getItem(
      localStorageKeys.VISIBLE_VALUES
    );

    return !!areVisible;
  });

  const toggleVisibility = useCallback(() => {
    setAreValuesVisible((prevValue) => !prevValue);
  }, []);

  // NEW ACCOUNT
  const openNewAccountModal = useCallback(() => {
    setShowNewAccountModal(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setShowNewAccountModal(false);
  }, []);

  // EDIT ACCOUNT
  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setShowEditAccountModal(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setShowEditAccountModal(false);
    setAccountBeingEdited(null);
  }, []);

  // NEW TRANSACTION
  const openNewTransactionModal = useCallback(
    (type: TransactionTypes | null) => {
      setNewTransactionType(type);

      setShowNewTransactionModal(true);
    },
    []
  );

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);

    setShowNewTransactionModal(false);
  }, []);

  // EDIT TRANSACTION
  const openEditTransactionModal = useCallback((transaction: Transaction) => {
    setNewTransactionType(transaction.type);

    setTransactionBeingEdited(transaction);

    setShowEditTransactionModal(true);
  }, []);

  const closeEditTransactionModal = useCallback(() => {
    setNewTransactionType(null);

    setShowEditTransactionModal(false);

    setTransactionBeingEdited(null);
  }, []);


  useEffect(() => {
    window.localStorage[areValuesVisible ? "setItem" : "removeItem"](
      localStorageKeys.VISIBLE_VALUES,
      "YES"
    );
  }, [areValuesVisible]);

  return (
    <DashboardContext.Provider
      value={{
        // Selects
        newTransactionType,
        accountBeingEdited,
        transactionBeingEdited,
        areValuesVisible,
        //
        showNewAccountModal,
        showEditAccountModal,
        showNewTransactionModal,
        showEditTransactionModal,
        // Dispatchs
        toggleVisibility,
        //
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
        openEditTransactionModal,
        closeEditTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
