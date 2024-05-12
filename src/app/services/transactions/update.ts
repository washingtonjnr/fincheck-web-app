import { api } from "../api";
//
import { TransactionParams } from "./@type";

export async function update(id: string, params: TransactionParams) {
  const { data } = await api.put(`/transactions/${id}`, params);

  return data;
}
