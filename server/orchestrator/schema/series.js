const { gql } = require("apollo-server-express");
const Axios = require("axios");
const baseURL = "http://localhost:3002";
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Serial {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Serial]
    serial(serialId: ID!): Serial
  }

  input newSerial {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addSerial(serial: newSerial!): Serial
    editSerial(serialId: ID!, serial: newSerial!): Serial
    deleteSerial(serialId: ID!): Serial
  }
`;

const resolvers = {
  Query: {
    series: async () => {
      const seriesCache = await redis.get("series");
      if (seriesCache) {
        return JSON.parse(seriesCache);
      } else {
        const { data } = await Axios.get(baseURL);
        await redis.set("series", JSON.stringify(data));
        return data;
      }
    },
    serial: async (_, args) => {
      const serialCache = await redis.get("serial");
      if (serialCache) {
        return JSON.parse(serialCache);
      } else {
        let { serialId } = args;
        const { data } = await Axios.get(`${baseURL}/${serialId}`);
        await redis.set("serial", JSON.stringify(data));
        return data;
      }
    },
  },
  Mutation: {
    addSerial: async (parents, args) => {
      const { serial } = args;
      const config = {
        method: "post",
        url: baseURL,
        data: serial,
      };
      const { data } = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      return data;
    },
    editSerial: async (parents, args) => {
      const { serialId, serial } = args;
      const config = {
        method: "put",
        url: `${baseURL}/${serialId}`,
        data: serial,
      };
      const { data } = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      return data;
    },
    deleteSerial: async (parents, args) => {
      const { serialId } = args;
      const config = {
        method: "delete",
        url: `${baseURL}/${serialId}`,
      };
      const { data } = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
