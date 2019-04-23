const proxy = require('http-proxy-middleware')

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
                target: 'http://localhost:9001',
            })
        )
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-emotion`,
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    components: 'src/components',
                    gql: 'src/gql',
                    hooks: 'src/hooks',
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
                // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
    ],
}
