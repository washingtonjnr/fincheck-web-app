import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Components
import { Toaster } from "react-hot-toast";
// Contexts
import { AuthProvider } from "./app/contexts/Auth";
// Route
import { Router } from "./router";
// Styles
import "./app/styles/index.css";
import "swiper/css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Context */}
      <AuthProvider>
        {/* Routes */}
        <Router />

        {/* Alert */}
        <Toaster />
      </AuthProvider>

      <ReactQueryDevtools
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
}
