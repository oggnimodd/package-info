import React, { useState } from "react";
import Ajv from "ajv";
import { Editor } from "components";
import { getDependencies } from "helpers";

import { packageJsonSchema } from "../schema/package-json";

const ajv = new Ajv();

export const Default = () => {
  const [valid, setValid] = useState(false);
  const [doc, setDoc] = useState<string>(JSON.stringify({}, null, 2));

  const handleChange = (doc: string) => {
    try {
      const packageJsonObject = JSON.parse(doc);
      const valid = ajv.validate(packageJsonSchema, packageJsonObject);

      if (!valid) {
        setValid(false);
      } else {
        setValid(true);

        console.log(getDependencies(packageJsonObject));
      }
    } catch (e) {
      setValid(false);
    }

    setDoc(doc);
  };

  return (
    <div>
      <p className="mb-4 text-2xl font-semibold">Valid JSON: {String(valid)}</p>
      <Editor setEditorContent={handleChange} initialContent={doc} />
    </div>
  );
};
