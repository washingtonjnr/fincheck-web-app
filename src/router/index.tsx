import { BrowserRouter, Route, Routes } from "react-router-dom";
// Auth
import { AuthGuard } from "./AuthGuard";
// Layouts
import { AuthLayout } from "../view/layouts/AuthLayout";
// Views
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { Dashboard } from "../view/pages/Dashboard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Dashboard */}
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
