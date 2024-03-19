"use client";

import { ReactNode, useState } from "react";
import AppProvider from "./AppProvider";
import AuthProvider from "./AuthProvider";
import StoreProvider from "./StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AppProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default Providers;
