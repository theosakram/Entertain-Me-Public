const Movies = require("./movies");
const Series = require("./tvSeries");
const Redis = require("ioredis");
const redis = new Redis();

class Orchestrator {
  static async get(req, res) {
    try {
      const moviesCache = await redis.get("both");
      if (moviesCache) {
        res.json(JSON.parse(moviesCache));
      } else {
        const movies = await Movies.find();
        const series = await Series.find();
        await redis.set("both", JSON.stringify({ movies, series }));
        res.json({ movies, series });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Orchestrator;
