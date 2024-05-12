import { api } from "../api";

export async function remove(id: string): Promise<boolean> {
  await api.delete(`/bank-accounts/${id}`);

  return true;
}
