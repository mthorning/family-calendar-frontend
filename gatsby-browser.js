import React from 'react';
import {ApolloProvider} from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import {ThemeProvider} from 'emotion-theming';
import {Global} from '@emotion/core';
import fetch from 'isomorphic-fetch';
import global from './src/styles/global';
import theme from './src/styles/theme';
import 'typeface-roboto';

const client = new ApolloClient({
  fetch,
});

export const wrapRootElement = ({element}) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Global styles={global} />
        {element}
      </ApolloProvider>
    </ThemeProvider>
  );
};
