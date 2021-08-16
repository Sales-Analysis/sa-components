module.exports = config => {
  config.module.rules.push(
    {
      test: /\.css$/i,
      use: ['postcss-loader'],
    },
  );

  return config;
};
