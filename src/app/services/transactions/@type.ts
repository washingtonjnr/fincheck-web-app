export enum TransactionTypes {
  "INCOME" = "INCOME",
  "EXPENSE" = "EXPENSE",
};

export type TransactionResponse = {
  id: string;
  bankAccount?: {
    id: string;
    name: string;
    color: string;
  };
  category?: {
    id: string;
    name: string;
    icon: string;
  };
  //
  name: string;
  date: string;
  value: number;
  type: TransactionTypes;
};

export type Transaction = TransactionResponse;

export type TransactionParams = {
  categoryId?: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionTypes;
};

export type TransactionFilterParams = {
  month: number;
  year: number;
  bankAccountId?: string;
  type: TransactionTypes | null;
}
