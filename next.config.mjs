/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile exists in a parent folder; pin the project root explicitly.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
