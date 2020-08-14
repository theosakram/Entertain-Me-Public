const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-express");

const movieSchema = require("./movies");
const seriesSchema = require("./series");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, seriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, seriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

module.exports = server;
