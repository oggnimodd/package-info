import React from "react";

import Readme from "./Readme";

export const Default = () => {
  return (
    <div className="grid grid-cols-2 items-start gap-x-3">
      <Readme
        repoUrl="https://github.com/dominggo1999/package-info"
        defaultBranch="main"
      >
        {"# Hello, World!\n"}
      </Readme>
    </div>
  );
};
