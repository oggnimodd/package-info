import React, { useState } from "react";
import Ajv from "ajv";
import { Editor, Readme } from "components";
import { getDependencies } from "helpers";
import { useReadme } from "hooks";

import { LoadingWithMessage } from "@acme/ui";

import { packageJsonSchema } from "../schema/package-json";

const ajv = new Ajv();

type Dependencies = {
  dependencies: string[];
  devDependencies: string[];
};

const initialPackages = {
  dependencies: [],
  devDependencies: [],
};

export const DisplayDependencies = () => {
  const [valid, setValid] = useState(false);
  const [doc, setDoc] = useState<string>(JSON.stringify({}, null, 2));
  const [packages, setPackages] = useState<Dependencies>(initialPackages);
  const [activePackage, setActivePackage] = useState("");

  const { data, isLoading, isError } = useReadme({
    packageName: activePackage,
  });

  const handleChange = (doc: string) => {
    try {
      const packageJsonObject = JSON.parse(doc);
      const valid = ajv.validate(packageJsonSchema, packageJsonObject);

      if (!valid) {
        setValid(false);
        setPackages(initialPackages);
        setActivePackage("");
      } else {
        setValid(true);
        const parsedPackages = getDependencies(packageJsonObject);
        setPackages(parsedPackages);
        setActivePackage(
          parsedPackages.dependencies[0] ||
            parsedPackages.devDependencies[0] ||
            "",
        );
      }
    } catch (e) {
      setValid(false);
      setPackages(initialPackages);
      setActivePackage("");
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
        <PackagesList setActivePackage={setActivePackage} list={packages} />
      </div>
      <div className="col-span-3">
        <p className="mb-4 text-2xl font-semibold">
          Active Package : {activePackage || "None"}
        </p>
        {activePackage && isLoading && <LoadingWithMessage />}
        {activePackage && isError && (
          <div>
            <p>Ooopps, something went wrong</p>
          </div>
        )}
        {activePackage && data && <Readme>{data}</Readme>}
      </div>
    </div>
  );
};

const PackagesList: React.FC<{
  list: Dependencies;
  setActivePackage: (p: string) => void;
}> = ({ list, setActivePackage }) => {
  const { dependencies, devDependencies } = list;

  return (
    <div className="flex flex-col gap-y-8">
      {dependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">Dependencies</p>
          <ul className="flex list-none flex-col">
            {dependencies.map((i) => {
              return (
                <li role="button" key={i} onClick={() => setActivePackage(i)}>
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
          <ul className="flex list-none flex-col">
            {devDependencies.map((i) => {
              return (
                <li role="button" key={i} onClick={() => setActivePackage(i)}>
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
