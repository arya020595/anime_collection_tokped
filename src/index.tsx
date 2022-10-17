import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {
            merge: true,
          },
          title: {
            merge: true,
          }
        },
      }
    },
  }),
});

root.render(
  <Router>
    {/* <React.StrictMode> */}
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    {/* </React.StrictMode> */}
  </Router>
);