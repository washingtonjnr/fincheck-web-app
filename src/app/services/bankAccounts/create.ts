import { api } from "../api";
//
import { BankAccountParams } from "./@type";

export async function create(params: BankAccountParams) {
  const { data } = await api.post("/bank-accounts", params);

  return data;
}
