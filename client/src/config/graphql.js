import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const GET_FAV = gql`
  query {
    favs @client {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

client.writeQuery({
  query: GET_FAV,
  data: {
    favs: [],
  },
});

export default client;
