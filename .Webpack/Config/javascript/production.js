import webpack from 'webpack';

// import formatter from 'eslint-friendly-formatter';

const BabelLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheIdentifier: true,
      },
    },
  ],
};

const EsLintLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: true,
    quite: true,
    fix: true,
  },
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

const rules = [BabelLoader, EsLintLoader];

export { EsLintLoader, BabelLoader, plugins };
export default {
  module: { rules },
  plugins,
};
