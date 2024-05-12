import { TransactionTypes } from "../transactions/@type";

export type CategoryResponse = {
  id: string;
  name: string;
  icon?: string;
  type: TransactionTypes;
};

export type Category = CategoryResponse;
