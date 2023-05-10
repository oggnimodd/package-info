import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../src/styles/globals.css";
import "./style.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <>
      <div className={globalState.theme}>{children}</div>
    </>
  );
};
