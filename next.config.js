const withSass = require("@zeit/next-sass")
const DotEnv = require("dotenv-webpack")
const withCss = require("@zeit/next-css")

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {}
  require.extensions[".css"] = file => {}
}

module.exports = withCss(
  withSass({
    target: "serverless",
    webpack: config => {
      config.plugins.push(new DotEnv())
      return config
    },
  }),
)
