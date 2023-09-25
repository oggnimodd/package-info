import React from "react";
import Ajv from "ajv";
import clsx from "clsx";
import { Editor, Readme } from "components";
import { getDependencies } from "helpers";
import { useReadme } from "hooks";
import { HeaderContainer, Brand, LoadingWithMessage, Button } from "@acme/ui";
import { useLadleContext, ActionType, ThemeState } from "@ladle/react";
import { useAtom } from "jotai";
import {
  activePackageAtom,
  readmeAtom,
  packagesAtom,
  isValidJsonAtom,
  resetPackagesAtom,
  applyPackagesAtom,
  Dependencies,
} from "atoms";

import { packageJsonSchema } from "../schema/package-json";

const ajv = new Ajv();

export const DisplayDependenciesWithJotai = () => {
  const [valid] = useAtom(isValidJsonAtom);
  const [doc, setDoc] = useAtom(readmeAtom);
  const [packages] = useAtom(packagesAtom);
  const [activePackage, setActivePackage] = useAtom(activePackageAtom);
  const [, resetPackages] = useAtom(resetPackagesAtom);
  const [, applyPackages] = useAtom(applyPackagesAtom);

  const { globalState, dispatch } = useLadleContext();

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
      <HeaderContainer>
        <Brand />
        <Button
          onClick={() =>
            dispatch({
              type: ActionType.UpdateTheme,
              value:
                globalState.theme === ThemeState.Dark
                  ? ThemeState.Light
                  : ThemeState.Dark,
            })
          }
        >
          Test
        </Button>
      </HeaderContainer>
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

const PackagesList: React.FC<{
  list: Dependencies;
  activePackage: string;
  setActivePackage: (p: string) => void;
}> = ({ list, setActivePackage, activePackage }) => {
  const { dependencies, devDependencies } = list;

  return (
    <div className="flex flex-col gap-y-8">
      {dependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">Dependencies</p>
          <ul className="flex list-none flex-col">
            {dependencies.map((i) => {
              const isActive = i === activePackage;
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <just a demo>
                <li
                  className={clsx(
                    isActive && "text-primary-500",
                    "hover:text-primary-300",
                  )}
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <just a demo>
                  role="button"
                  key={i}
                  onClick={() => setActivePackage(i)}
                >
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
              const isActive = i === activePackage;
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <just a demo>
                <li
                  className={clsx(
                    isActive && "text-primary-500",
                    "hover:text-primary-300",
                  )}
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <just a demo>
                  role="button"
                  key={i}
                  onClick={() => setActivePackage(i)}
                >
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
