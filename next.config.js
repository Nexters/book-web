const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // 2. sassOptions 옵션 추가
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_ENDPOINT}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
