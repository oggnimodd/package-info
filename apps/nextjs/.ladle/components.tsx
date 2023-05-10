import React from "react";
import type { GlobalProvider } from "@ladle/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../src/styles/globals.css";
import "./style.css";

const queryClient = new QueryClient({});

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={globalState.theme}>{children}</div>
    </QueryClientProvider>
  );
};
