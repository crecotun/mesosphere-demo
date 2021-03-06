const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')

module.exports = withTypescript(
  withSass({
    webpack(config, options) {
      return config
    },
    cssModules: true,
    sassLoaderOptions: {
      data: `
        @import 'src/styles/mixins/index.scss';
        @import 'src/styles/global/variables.scss';
      `,
    },
  }),
)
