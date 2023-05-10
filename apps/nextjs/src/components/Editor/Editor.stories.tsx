import React, { useState } from "react";

import Editor from "./Editor";

export const Default = () => {
  const [doc, setDoc] = useState<string>(
    JSON.stringify({ message: "Hello, World!" }, null, 2),
  );

  return (
    <div>
      <Editor setEditorContent={setDoc} initialContent={doc} />
    </div>
  );
};
