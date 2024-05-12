import { api } from "../api";
//
import { TransactionParams } from "./@type";

export async function create(params: TransactionParams) {
  const { data } = await api.post("/transactions", params);

  return data;
}
