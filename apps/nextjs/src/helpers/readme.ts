import { githubApi } from "config";

interface Repository {
  url?: string;
  type?: string;
}

export const getPackageGithubUrl = async (packageName: string) => {
  const { repository }: { repository?: Repository } = await fetch(
    `https://registry.npmjs.org/${packageName}`,
  ).then((res) => res.json());

  if (!repository || (repository.type && repository.type !== "git"))
    return null;

  let { url } = repository;

  if (!url) {
    return null;
  }

  if (url.startsWith("git+")) {
    url = url.slice("git+".length);
  }

  if (url.endsWith(".git")) {
    url = url.slice(0, -".git".length);
  }

  if (url.startsWith("git://")) {
    url = url.slice("git://".length);
  }

  if (url.startsWith("ssh://")) {
    url = url.slice("ssh://".length);
  }

  if (url.startsWith("git@github.com:")) {
    url = `github.com/${url.slice("git@github.com:".length)}`;
  }

  if (url.startsWith("git@github.com/")) {
    url = `github.com/${url.slice("git@github.com/".length)}`;
  }

  // finally add the correct protocol
  if (!url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Regex check if the url is a github repo
  const regex = /^https:\/\/github.com\/[^/]+\/[^/]+$/;
  if (!regex.test(url)) {
    return null;
  }

  return url;
};

export const getRawReadmeUrl = async (url: string) => {
  const pathToTry = [
    "master/README.md",
    "main/README.md",
    "master/readme.md",
    "main/readme.md",
    "master/readme.markdown",
    "main/readme.markdown",
    "master/README.markdown",
    "main/README.markdown",
    "master/README",
    "main/README",
  ];
  let rawReadmeUrl = null;

  for (let i = 0; i < pathToTry.length; i++) {
    const potentialUrl = `${url.replace(
      "github.com",
      "raw.githubusercontent.com",
    )}/${pathToTry[i]}`;
    const response = await fetch(potentialUrl);

    if (response.ok) {
      rawReadmeUrl = potentialUrl;
      break;
    }
  }

  return rawReadmeUrl;
};

const decodeBase64 = (base64: string) => {
  const text = window.atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const decoder = new TextDecoder(); // default is utf-8
  return decoder.decode(bytes);
};

export const getReadmeUsingGithubApi = async (
  url: string,
): Promise<string | null> => {
  try {
    const [_, repoPath = ""] = url.split("github.com/");
    const response = await githubApi.get(
      `https://api.github.com/repos/${repoPath}/readme`,
    );

    const readmeContent = response.data.content;
    const decodedContent = decodeBase64(readmeContent);
    return decodedContent;
  } catch (error) {
    return null;
  }
};
