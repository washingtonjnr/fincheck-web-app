export enum BankAccountTypes {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
};

export type BankAccountResponse = {
  id: string;
  name: string;
  color: string;
  initialBalance?: number;
  currentBalance: number;
  type: BankAccountTypes;
};

export type BankAccount = BankAccountResponse;

export type BankAccountParams = {
  name: string;
  color: string;
  initialBalance: number;
  type: BankAccountTypes;
};
