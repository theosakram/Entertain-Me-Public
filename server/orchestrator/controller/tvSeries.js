const Axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseURL = "http://localhost:3002";

class CommandCenter {
  static async find(req, res) {
    try {
      const { data } = await Axios.get(baseURL);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    let { id } = req.params;
    try {
      const movieCache = await redis.get("serial");
      if (movieCache) {
        res.json(JSON.parse(movieCache));
      } else {
        const config = {
          method: "get",
          url: `${baseURL}/${id}`,
        };
        const { data } = await Axios(config);
        await redis.set("serial", JSON.stringify(data));
        res.json(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async add(req, res) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const data = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };
      const config = {
        method: "post",
        url: baseURL,
        data,
      };
      const response = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      res.json(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  static async edit(req, res) {
    let { id } = req.params;
    let { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const data = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };
      const config = {
        method: "put",
        url: `${baseURL}/${id}`,
        data,
      };
      const response = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      res.json(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {
    let { id } = req.params;
    try {
      const config = {
        method: "delete",
        url: `${baseURL}/${id}`,
      };
      const { data } = await Axios(config);
      await redis.del("serial");
      await redis.del("series");
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CommandCenter;
