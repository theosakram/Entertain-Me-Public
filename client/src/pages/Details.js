import React, { useEffect } from "react";
import Rating from "react-rating";
import { useQuery, gql } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";

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

function Details() {
  const { state } = useLocation();
  const history = useHistory();

  function toDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: state,
    });
  }

  let { data, loading, error } = useQuery(GET_MOVIES);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error....</h1>;
  else {
    let copyData = JSON.parse(JSON.stringify(data.movies));
    let mostPopularSer = copyData
      .sort((x, y) => y.popularity - x.popularity)
      .slice(0, 4);

    return (
      <>
        <div className="container" style={{ marginTop: "35px" }}>
          <div className="columns">
            <div className="column is-1 ">
              {mostPopularSer.map((movie) => (
                <img
                  onClick={() => toDetails(movie._id)}
                  src={movie.poster_path}
                  alt={movie.title}
                  className="sidecard"
                />
              ))}
            </div>
            <div className="column is-one-third">
              <div className="image">
                <img
                  style={{ height: 450, width: 300, marginLeft: "30px" }}
                  src={state.poster_path}
                  alt={state.title}
                />
              </div>
            </div>
            <div className="column">
              <h1 className="title is-4 has-text-black ">{state.title}</h1>
              <p style={{ color: "red", marginBottom: "10px" }}>
                <span style={{ marginRight: "15px" }}> {state.popularity}</span>
                <Rating
                  start={0}
                  stop={10}
                  step={2}
                  fractions={2}
                  initialRating={state.popularity}
                  emptySymbol="far fa-star"
                  fullSymbol="fas fa-star"
                />{" "}
                on MAL
              </p>
              <h1>{state.overview}</h1>
              <h1 className=" title is-6" style={{ marginTop: "15px" }}>
                Tags:
              </h1>
              <div className="tags">
                {state.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="subtitle is-6 baten"
                style={{
                  backgroundColor: "white",
                  color: "red",
                  borderRadius: "5px",
                  height: 35,
                  textAlign: "center",
                }}
              >
                <i className="fas fa-heart"></i>{" "}
                <span style={{ marginLeft: "5px" }}>Favorites</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Details;
