import { api } from "../api";
//
import { TransactionResponse } from "./@type";

export async function get(id: string): Promise<TransactionResponse> {
  const { data } = await api.get(`/transactions/${id}`);

  return data;
}
