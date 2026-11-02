import withSerwistInit from "@serwist/next";
const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});
export default withSerwist({
  distDir: process.env.CUBEDECK_DIST_DIR || ".next",
});
