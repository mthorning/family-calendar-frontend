import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './src/apollo/client'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { global, theme } from './src/styles'

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <Global styles={global} />
                {element}
            </ApolloProvider>
        </ThemeProvider>
    )
}
