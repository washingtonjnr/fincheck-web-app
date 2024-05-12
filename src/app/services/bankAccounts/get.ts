import { api } from "../api";
//
import { BankAccountResponse } from "./@type";

export async function get(id: string): Promise<BankAccountResponse> {
  const { data } = await api.get(`/bank-accounts/${id}`);

  return data;
}
