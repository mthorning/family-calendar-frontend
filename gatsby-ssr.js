import React from 'react';
import {ApolloProvider} from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import {ThemeProvider} from 'emotion-theming';
import {Global} from '@emotion/core';
import global from './src/styles/global';
import {renderToString} from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import theme from './src/styles/theme';
import 'typeface-roboto';

export const replaceRenderer = ({element, replaceBodyHTMLString}) => {
  const client = new ApolloClient({
    fetch,
  });

  const ConnectedBody = () => (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Global styles={global} />
        {element}
      </ApolloProvider>
    </ThemeProvider>
  );

  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
