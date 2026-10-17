/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bato.yourshousing.com",
        pathname: "/**", // This allows ANY path on your backend domain
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**", // Allows local testing
      },
    ],
  },
};

export default nextConfig;
