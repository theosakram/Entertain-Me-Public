import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card } from "../components";

const GET_SERIES = gql`
  query getSeries {
    series {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function Series() {
  let { data, loading, error } = useQuery(GET_SERIES);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error....</h1>;
  else {
    let copy = JSON.parse(JSON.stringify(data.series));
    let list = copy.sort((x, y) => x.title - y.title);
    return (
      <>
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="columns">
            {list.map((movie) => (
              <div className="column is-one-quarter">
                <Card movie={movie} key={movie.id} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Series;
