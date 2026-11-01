/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable standalone mode in Docker / CI environments where symlinks are natively supported
  ...(process.env.BUILD_STANDALONE === "true" || process.env.DOCKER_BUILD === "true"
    ? { output: "standalone" }
    : {}),
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
