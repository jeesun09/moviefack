/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env: {
    TMDB_ACCESS_TOKEN:
      "",
    TMDB_API_KEY: "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
