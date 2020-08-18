const { gql } = require("apollo-server-express");
const Axios = require("axios");
const baseURL = "http://localhost:3002";
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Serial {
    _id: String
    title: String
    type: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Serial]
    serial(serialId: String!): Serial
  }

  input newSerial {
    title: String
    type: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addSerial(serial: newSerial): Serial
    editSerial(serialId: String, serial: newSerial): String
    deleteSerial(serialId: String!): String
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
      let { serialId } = args;
      const { data } = await Axios.get(`${baseURL}/${serialId}`);
      await redis.set("serial", JSON.stringify(data));
      return data;
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
      console.log(data);
      return "Edit success";
    },
    deleteSerial: async (parents, args) => {
      const { serialId } = args;
      const config = {
        method: "delete",
        url: `${baseURL}/${serialId}`,
      };
      await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      return "Data deleted succesfully";
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
