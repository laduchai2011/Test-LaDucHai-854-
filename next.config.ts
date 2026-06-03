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
            {
                protocol: "https",
                hostname: "s120-ava-talk.zadn.vn",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
