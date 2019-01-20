const withSass = require('@zeit/next-sass')
const DotEnv = require('dotenv-webpack')
const withCss = require('@zeit/next-css')
const webpack = require('webpack')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {}
  require.extensions['.css'] = file => {}
}

module.exports = withCss(
  withSass({
    target: 'serverless',
    webpack: config => {
      config.plugins.push(new DotEnv())
      config.plugins.push(new webpack.IgnorePlugin(/\/iconv-loader$/))
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      })
      return config
    },
  }),
)
