const path = require("path");

const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // 2. sassOptions 옵션 추가
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
  ],
  nextConfig,
);
