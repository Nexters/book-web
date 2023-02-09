const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // 2. sassOptions 옵션 추가
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
  },
};

module.exports = nextConfig;
