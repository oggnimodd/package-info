import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPackageGithubUrl, getRawReadmeUrl } from "helpers";

interface UseReadmeProps {
  packageName: string;
}

const useReadme = ({ packageName }: UseReadmeProps) => {
  const results = useQuery(
    ["readme", packageName],
    async () => {
      const packageGithubUrl = await getPackageGithubUrl(packageName);
      const rawReadmeUrl = getRawReadmeUrl(packageGithubUrl || "");

      // Fetch the url and transform it into txt file
      const response = await fetch(rawReadmeUrl);

      return response.text();
    },
    {
      enabled: Boolean(packageName),
    },
  );

  return results;
};

export default useReadme;
