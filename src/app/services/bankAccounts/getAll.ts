import { api } from "../api";
//
import { BankAccountResponse } from "./@type";

export async function getAll(): Promise<BankAccountResponse[]> {
  const { data } = await api.get<BankAccountResponse[]>("/bank-accounts");

  return data;
}
