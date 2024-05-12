import { useContext } from "react";
//
import { DashboardContext } from "./Dashboard";

export function useDashboard() {
  return useContext(DashboardContext);
}
