/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env: {
    TMDB_ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGIyOGRmMTVkY2YwMzIwYmNiMmFlYzZkZGI5OTlkMyIsIm5iZiI6MTcxMTcxMzA1OC4xMDYsInN1YiI6IjY2MDZhYjIyZTFmYWVkMDE2NGY5ZThhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EBcYVDC2v_uYAtUrMSSP4FkhfEoqpEHWmRXfQX-M3oo",
    TMDB_API_KEY: "88b28df15dcf0320bcb2aec6ddb999d3",
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
