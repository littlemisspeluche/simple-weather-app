module.exports = function override(config, _env) {
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
