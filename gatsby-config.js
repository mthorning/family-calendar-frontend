const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: `Family Calendar`,
    description: `A calendar for planning family activities with.`,
    author: `@thorning_m`,
  },
  developMiddleware: app => {
    app.use(
      '/graphql',
      proxy({
        target: 'http://localhost:9000',
      }),
    );
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          components: 'src/components',
          gql: 'src/gql',
          hooks: 'src/hooks',
          contexts: 'src/contexts',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
  ],
};
