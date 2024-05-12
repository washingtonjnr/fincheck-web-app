import { api } from "../api";
//
import { TransactionFilterParams, TransactionResponse } from "./@type";

export async function getAll(params: TransactionFilterParams): Promise<TransactionResponse[]> {
  const { data } = await api.get<TransactionResponse[]>("/transactions", { params });

  return data;
}
