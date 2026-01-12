/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/').pop() : '';
const isGithubActions = !!process.env.GITHUB_ACTIONS;

const basePath = isGithubActions && repo ? `/${repo}` : '';
const assetPrefix = basePath || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: assetPrefix
  },
  // exportTrailingSlash helps GitHub Pages serve static files from subpaths
  trailingSlash: true,
};

module.exports = nextConfig;
