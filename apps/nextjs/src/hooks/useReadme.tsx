import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getDefaultBranch,
  getPackageGithubUrl,
  getRawReadmeUrl,
  getReadmeUsingGithubApi,
} from "helpers";

interface UseReadmeProps {
  packageName: string;
}

const useReadme = ({ packageName }: UseReadmeProps) => {
  const results = useQuery(
    ["readme", packageName],
    async () => {
      const packageGithubUrl = await getPackageGithubUrl(packageName);

      const readme = await getReadmeUsingGithubApi(packageGithubUrl || "");
      const defaultBranch = await getDefaultBranch(packageGithubUrl || "");

      if (readme)
        return {
          readme,
          repository: packageGithubUrl,
          defaultBranch,
        };

      // If there is any problem with github api method or the rate limit is exceeded, than locate the readme file manually
      const rawReadmeUrl = await getRawReadmeUrl(packageGithubUrl || "");

      if (!rawReadmeUrl) {
        throw new Error("Readme not found");
      }

      // Fetch the url and transform it into txt file
      const response = await fetch(rawReadmeUrl);

      return {
        readme: await response.text(),
        repository: packageGithubUrl,
        defaultBranch,
      };
    },
    {
      enabled: Boolean(packageName),
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  return results;
};

export default useReadme;
