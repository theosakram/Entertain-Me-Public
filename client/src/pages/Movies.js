import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Loader } from "../components";

const GET_MOVIES = gql`
  query getMovies {
    movies {
      _id
      title
      type
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function Movies() {
  let { data, loading, error } = useQuery(GET_MOVIES);
  console.log(data);
  if (loading) return <Loader />;
  if (error) return <h1>Error....</h1>;
  else {
    let copy = JSON.parse(JSON.stringify(data.movies));
    let list = copy.sort((x, y) => x.title.localeCompare(y.title));
    return (
      <>
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="columns is-multiline">
            {list.map((movie) => (
              <div className="column is-one-quarter">
                <Card movie={movie} key={movie._id} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
