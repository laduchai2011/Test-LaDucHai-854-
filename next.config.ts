import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.5kaquarium.com",
            },
            {
                protocol: "https",
                hostname: "www.shutterstock.com",
            },
        ],
    },
};

export default nextConfig;
