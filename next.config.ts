import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // New devtools features
    devtoolNewPanelUI: true,
    devtoolSegmentExplorer: true,
  },
};

export default nextConfig;
