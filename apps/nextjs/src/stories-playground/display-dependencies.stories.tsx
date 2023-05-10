import React, { useState } from "react";
import Ajv from "ajv";
import { Editor } from "components";
import { getDependencies } from "helpers";

import { packageJsonSchema } from "../schema/package-json";

const ajv = new Ajv();

type Dependencies = {
  dependencies: string[];
  devDependencies: string[];
};

export const DisplayDependencies = () => {
  const [valid, setValid] = useState(false);
  const [doc, setDoc] = useState<string>(JSON.stringify({}, null, 2));
  const [packages, setPackages] = useState<Dependencies>({
    dependencies: [],
    devDependencies: [],
  });

  const handleChange = (doc: string) => {
    try {
      const packageJsonObject = JSON.parse(doc);
      const valid = ajv.validate(packageJsonSchema, packageJsonObject);

      if (!valid) {
        setValid(false);
      } else {
        setValid(true);

        const parsedPackages = getDependencies(packageJsonObject);
        setPackages(parsedPackages);
      }
    } catch (e) {
      setValid(false);
    }

    setDoc(doc);
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2 flex w-full flex-col">
        <p className="mb-4 text-2xl font-semibold">
          Valid JSON: {String(valid)}
        </p>
        <Editor
          className="max-w-full"
          setEditorContent={handleChange}
          initialContent={doc}
        />
      </div>
      <div className="col-span-1">
        <p className="mb-4 text-2xl font-semibold">Package List</p>
        <PackagesList list={packages} />
      </div>
    </div>
  );
};

const PackagesList: React.FC<{
  list: Dependencies;
}> = ({ list }) => {
  const { dependencies, devDependencies } = list;

  return (
    <div className="flex flex-col gap-y-20">
      {dependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">Dependencies</p>
          <ul className="flex flex-col">
            {dependencies.map((i) => {
              return (
                <li role="button" key={i}>
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {devDependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">devDependencies</p>
          <ul className="flex flex-col">
            {devDependencies.map((i) => {
              return (
                <li role="button" key={i}>
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
