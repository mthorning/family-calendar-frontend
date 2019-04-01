const developMiddleware = require('./dev-proxy')

module.exports = {
    siteMetadata: {
        title: `Family Calendar`,
        description: `A calendar for planning family activities with.`,
        author: `@thorning_m`,
    },
    developMiddleware,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-emotion`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
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
