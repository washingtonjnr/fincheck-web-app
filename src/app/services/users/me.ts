import { api } from "../api";
// Utils
import { sleep } from "../../utils/sleep";
//
import { UserResponse } from "./@type";

export async function me() {
  await sleep();

  const { data } = await api.get<UserResponse>("/users/me");

  return data;
}
