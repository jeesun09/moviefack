/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env: {
    TMDB_ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YThiMDUzMjU2OGM3Mjc5NTc5MDg5YmY2NzNjOTZhOCIsIm5iZiI6MTc4NjM2MzA5OC4zODcsInN1YiI6IjZhNzliY2RhZDYyNGEyMTJkMzkwZDZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wc1lDrmfInbDA57CyFRrDsXMNLtvCpQEeGsORrEy9qk",
    TMDB_API_KEY: "6a8b0532568c7279579089bf673c96a8",
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
