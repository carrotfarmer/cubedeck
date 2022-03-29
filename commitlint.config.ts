import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional", "gitmoji"],
};

module.exports = Configuration;
