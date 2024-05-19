export function isGitHubRepositoryLink(link: string): boolean {
  const githubRepoPattern =
    /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
  const githubRepoPattern2 =
    /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?$/;
  return githubRepoPattern.test(link) || githubRepoPattern2.test(link);
}

export function isValidName(input: string): boolean {
  // Regular expression to match only alphanumeric characters, hyphens, and underscores
  const regex = /^[a-zA-Z0-9-_]+$/;
  // Test if the input string matches the regular expression
  return regex.test(input);
}
