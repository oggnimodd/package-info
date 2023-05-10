import { sortAndRemoveDuplicates } from "./array";

// This function will give the list of the dependencies and the devDependencies in array form
// The parameter is a json object

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const getDependencies = (jsonObj: PackageJson) => {
  const { dependencies, devDependencies } = jsonObj;

  const dependencyList = dependencies ? Object.keys(dependencies) : [];
  const devDependencyList = devDependencies ? Object.keys(devDependencies) : [];

  return {
    dependencies: sortAndRemoveDuplicates(dependencyList),
    devDependencies: sortAndRemoveDuplicates(devDependencyList),
  };
};
