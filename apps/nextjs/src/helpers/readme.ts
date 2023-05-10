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
    const potentialUrl =
      url.replace("github.com", "raw.githubusercontent.com") +
      `/${pathToTry[i]}`;
    const response = await fetch(potentialUrl);

    if (response.ok) {
      rawReadmeUrl = potentialUrl;
      break;
    }
  }

  return rawReadmeUrl;
};
