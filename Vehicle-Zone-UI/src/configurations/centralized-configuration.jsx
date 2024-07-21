import devConfig from "./development";
import prodConfig from "./production";
import stageConfig from "./staging";

const configMap = {
  production: prodConfig,
  staging: stageConfig,
  development: devConfig,
};

const environment = process.env.NODE_ENV || "development";
const config = configMap[environment];

export default config;
