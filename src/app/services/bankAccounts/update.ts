import { api } from "../api";
//
import { BankAccountParams } from "./@type";

export async function update(id: string, params: BankAccountParams) {
  const { data } = await api.put(`/bank-accounts/${id}`, params);

  return data;
}
