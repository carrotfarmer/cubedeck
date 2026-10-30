const withPWA = require("next-pwa");

module.exports = withPWA({
  distDir: process.env.CUBEDECK_DIST_DIR || ".next",
  // Use the CommonJS entry points with this project's React 17 / Next 12 setup.
  experimental: { esmExternals: false },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
