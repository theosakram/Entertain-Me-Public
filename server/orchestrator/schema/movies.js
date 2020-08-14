const { gql } = require("apollo-server-express");
const Axios = require("axios");
const baseURL = "http://localhost:3001";
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie
  }

  input newMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addMovie(movie: newMovie!): Movie
    editMovie(movieId: ID!, movie: newMovie!): Movie
    deleteMovie(movieId: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const moviesCache = await redis.get("movies");
      if (moviesCache) {
        return JSON.parse(moviesCache);
      } else {
        const { data } = await Axios.get(baseURL);
        await redis.set("movies", JSON.stringify(data));
        return data;
      }
    },
    movie: async (_, args) => {
      const movieCache = await redis.get("movie");
      if (movieCache) {
        return JSON.parse(movieCache);
      } else {
        let movieId = args.movieId;
        const { data } = await Axios.get(`${baseURL}/${movieId}`);
        await redis.set("movie", JSON.stringify(data));
        return data;
      }
    },
  },
  Mutation: {
    addMovie: async (parents, args) => {
      const { movie } = args;
      const config = {
        method: "post",
        url: baseURL,
        data: movie,
      };
      const { data } = await Axios(config);
      await redis.del("movie");
      await redis.del("movies");
      return data;
    },
    editMovie: async (parents, args) => {
      const { movieId, movie } = args;
      const config = {
        method: "put",
        url: `${baseURL}/${movieId}`,
        data: movie,
      };
      const { data } = await Axios(config);
      await redis.del("movie");
      await redis.del("movies");
      return data;
    },
    deleteMovie: async (parents, args) => {
      const { movieId } = args;
      const config = {
        method: "delete",
        url: `${baseURL}/${movieId}`,
      };
      const { data } = await Axios(config);
      await redis.del("movie");
      await redis.del("movies");
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
