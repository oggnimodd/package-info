import React from "react";
import Ajv from "ajv";
import { Editor, Readme } from "components";
import { getDependencies } from "helpers";
import { useReadme } from "hooks";
import { LoadingWithMessage } from "@acme/ui";
import { useAtom } from "jotai";
import {
  activePackageAtom,
  readmeAtom,
  packagesAtom,
  isValidJsonAtom,
  resetPackagesAtom,
  applyPackagesAtom,
} from "atoms";
import { packageJsonSchema } from "../schema/package-json";
import { PackagesList, Header } from "components";
import { useTheme } from "hooks";

const ajv = new Ajv();

export const Index = () => {
  const [valid] = useAtom(isValidJsonAtom);
  const [doc, setDoc] = useAtom(readmeAtom);
  const [packages] = useAtom(packagesAtom);
  const [activePackage, setActivePackage] = useAtom(activePackageAtom);
  const { theme } = useTheme();
  const [, resetPackages] = useAtom(resetPackagesAtom);
  const [, applyPackages] = useAtom(applyPackagesAtom);

  const { data, isLoading, isError } = useReadme({
    packageName: activePackage,
  });

  const handleChange = (doc: string) => {
    try {
      const packageJsonObject = JSON.parse(doc);
      const valid = ajv.validate(packageJsonSchema, packageJsonObject);

      if (valid) {
        const parsedPackages = getDependencies(packageJsonObject);
        applyPackages(parsedPackages);
        return;
      }

      throw new Error("Invalid JSON");
    } catch (e) {
      resetPackages();
    }

    setDoc(doc);
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-6 gap-4 px-4 mt-4">
        <div className="col-span-2 flex w-full flex-col">
          <p className="mb-4 text-2xl font-semibold">
            Valid JSON: {String(valid)}
          </p>
          <Editor
            theme={theme}
            className="max-w-full"
            setEditorContent={handleChange}
            initialContent={doc}
          />
        </div>
        <div className="col-span-1">
          <p className="mb-4 text-2xl font-semibold">Package List</p>
          <PackagesList
            activePackage={activePackage}
            setActivePackage={setActivePackage}
            list={packages}
          />
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
          {!isLoading && !isError && activePackage && data && (
            <Readme
              repoUrl={data.repository || ""}
              defaultBranch={data.defaultBranch}
            >
              {data.readme}
            </Readme>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
