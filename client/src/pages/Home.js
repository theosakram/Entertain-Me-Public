import React from "react";
import { useQuery, gql } from "@apollo/client";
import { MostPopular } from "../components";

const GET_MOVIES = gql`
  query getMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const GET_SERIES = gql`
  query getSeries {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function Home() {
  let { data: moviesData, loading: loadMov, error: errMov } = useQuery(
    GET_MOVIES
  );
  let { data: seriesData, loading: loadSer, error: errSer } = useQuery(
    GET_SERIES
  );

  if (loadMov || loadSer) return <h1>Loading....</h1>;
  if (errMov || errSer) return <h1>Error....</h1>;
  else {
    let copyMovies = JSON.parse(JSON.stringify(moviesData.movies));
    let mostPopularMov = copyMovies
      .sort((x, y) => y.popularity - x.popularity)
      .slice(0, 3);

    let copySer = JSON.parse(JSON.stringify(seriesData.series));
    let mostPopularSer = copySer
      .sort((x, y) => y.popularity - x.popularity)
      .slice(0, 3);

    return (
      <div>
        <div
          className="container"
          style={{ marginBottom: "55px", marginTop: "15px" }}
        >
          <h1 className="title is-4">MOST POPULAR MOVIES</h1>
          <div className="columns is-multiline">
            {mostPopularMov.map((movie) => (
              <div key={movie._id} className="column is-one-third">
                <MostPopular movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginBottom: "55px" }}>
          <h1 className="title is-4">MOST POPULAR SERIES</h1>
          <div className="columns is-multiline">
            {mostPopularSer.map((movie) => (
              <div key={movie._id} className="column is-one-third">
                <MostPopular movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
