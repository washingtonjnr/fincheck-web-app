import { api } from "../api";
// Utils
import { CategoryResponse } from "./@type";

export async function getAll() {
  const { data } = await api.get<CategoryResponse[]>("/categories");

  return data;
}
