const hostnames = ["utfs.io", "cdn.eraspace.com", "**.amazonaws.com"];
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
