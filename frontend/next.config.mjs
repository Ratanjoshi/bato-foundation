/** @type {import('next').NextConfig} */

const imageUrl = new URL(
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:8080",
);

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: imageUrl.protocol.slice(0, -1),
        hostname: imageUrl.hostname,
        port: imageUrl.port,
        pathname: "/resources/**",
      },
    ],
  },
};

export default nextConfig;
