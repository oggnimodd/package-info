import { atom } from "jotai";

export interface Dependencies {
  dependencies: string[];
  devDependencies: string[];
}

export const activePackageAtom = atom<string>("");

export const readmeAtom = atom<string>("");

const initialDependencies: Dependencies = {
  dependencies: [],
  devDependencies: [],
};

export const packagesAtom = atom<Dependencies>({
  dependencies: [],
  devDependencies: [],
});

export const isValidJsonAtom = atom<boolean>(false);

export const resetPackagesAtom = atom(null, (_get, set) => {
  set(isValidJsonAtom, false);
  set(packagesAtom, initialDependencies);
  set(activePackageAtom, "");
  set(readmeAtom, "");
});

export const applyPackagesAtom = atom(
  null,
  (_get, set, packages: Dependencies) => {
    set(packagesAtom, packages);
    set(isValidJsonAtom, true);
    set(
      activePackageAtom,
      packages.dependencies[0] || packages.devDependencies[0] || "",
    );
  },
);
