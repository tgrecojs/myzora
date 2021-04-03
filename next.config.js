const env = {
  FLEEK_API_KEY: process.env.FLEEK_API_KEY,
  FLEEK_API_SECRET: process.env.FLEEK_API_SECRET,
};

module.exports = {
  webpack: (config, _options) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
    };

    return config;
  },
  env,
  distDir: "build",
};
