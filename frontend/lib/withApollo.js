import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache }  from 'apollo-boost'
import { getToken } from './auth'

const config = ({ctx, headers, initialState}) => {
  const token = getToken(ctx);

  return new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : token
    },
    cache: new InMemoryCache().restore(initialState || {})
  })
};

export default withApollo(config);
