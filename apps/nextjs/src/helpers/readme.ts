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

export const getRawReadmeUrl = (url: string) => {
  return (
    url.replace("github.com", "raw.githubusercontent.com") + "/master/README.md"
  );
};
