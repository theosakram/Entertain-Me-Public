import React, { useContext } from "react";
import Rating from "react-rating";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
import { context } from "../App";

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

function Details() {
  const { state } = useLocation();
  const history = useHistory();
  const { theme } = useContext(context);

  function toDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: state,
    });
  }

  function toEdit(id) {
    history.push({
      pathname: `/edit/${id}`,
      state: state,
    });
  }

  const DEL_SER = gql`
    mutation deleteOne($serialId: String!) {
      deleteSerial(serialId: $serialId)
    }
  `;

  const DEL_MOV = gql`
    mutation deleteOne($movieId: String!) {
      deleteMovie(movieId: $movieId)
    }
  `;

  const [delSer] = useMutation(DEL_SER);
  const [delMov] = useMutation(DEL_MOV);

  function deleteItem(id) {
    if (state.type === "series") {
      delSer({
        variables: { serialId: id },
        refetchQueries: [`getSeries`],
      });
      history.push("/series");
    } else if (state.type === "movies") {
      history.push("/movies");
      delMov({
        variables: { movieId: id },
        refetchQueries: [`getMovies`],
      });
    }
  }

  let { data: dataMov, loading: loadMov, error: errMov } = useQuery(GET_MOVIES);
  let { data: dataSer, loading: loadSer, error: errSer } = useQuery(GET_SERIES);

  if (loadMov || loadSer) return <h1>Loading...</h1>;
  if (errMov || errSer) return <h1>Error....</h1>;
  else {
    let copyData = JSON.parse(JSON.stringify(dataMov.movies));
    let copyDataSer = JSON.parse(JSON.stringify(dataSer.series));
    let mostPopularMov = [
      ...new Set(
        Array.from(
          { length: 4 },
          (x, y) => copyData[Math.floor(Math.random() * copyData.length)]
        )
      ),
    ];
    let mostPopularSer = [
      ...new Set(
        Array.from(
          { length: 4 },
          (x, y) => copyDataSer[Math.floor(Math.random() * copyData.length)]
        )
      ),
    ];
    let concated = mostPopularMov.concat(mostPopularSer).slice(0, 4);

    return (
      <>
        <div className="hero is-fullheight">
          <div className="container" style={{ marginTop: "35px" }}>
            <div className="columns">
              <div className="column is-1">
                {concated.map((movie, index) => (
                  <img
                    onClick={() => toDetails(movie._id)}
                    src={movie.poster_path}
                    alt={movie.title}
                    className="sidecard"
                    key={index}
                  />
                ))}
              </div>
              <div className="column is-one-third" style={{ height: "100%" }}>
                <div className="image">
                  <img
                    style={{ width: 400 }}
                    src={state.poster_path}
                    alt={state.title}
                  />
                </div>
              </div>
              <div className="column">
                <h1
                  className="title is-4 has-text-left"
                  style={{ color: theme === "light" ? "red" : "#009B72" }}
                >
                  {state.title}{" "}
                  <a
                    style={{
                      color: theme === "light" ? "red" : "#009B72",
                    }}
                    onClick={() => deleteItem(state._id)}
                  >
                    <i
                      style={{ float: "right", marginLeft: "15px" }}
                      className="fas fa-trash"
                    ></i>
                  </a>
                  <a
                    onClick={() => toEdit(state._id)}
                    style={{
                      color: theme === "light" ? "red" : "#009B72",
                    }}
                  >
                    <i style={{ float: "right" }} className="far fa-edit"></i>
                  </a>
                </h1>
                <p
                  className="has-text-left"
                  style={{
                    color: theme === "light" ? "red" : "#009B72",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "15px" }}>
                    {" "}
                    {state.popularity}
                  </span>
                  <Rating
                    start={0}
                    stop={10}
                    step={2}
                    fractions={2}
                    readonly="true"
                    initialRating={state.popularity}
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star"
                  />{" "}
                  on MAL
                </p>
                <h1
                  className="has-text-left"
                  style={{ color: theme === "light" ? "black" : "white" }}
                >
                  {state.overview}
                </h1>
                <h1
                  className=" title is-6 has-text-left"
                  style={{
                    marginTop: "15px",
                    color: theme === "light" ? "red" : "#009B72",
                  }}
                >
                  Tags:
                </h1>
                <div className="tags">
                  {state.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{
                        backgroundColor: theme === "light" ? "red" : "#009B72",
                        color: "white",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="subtitle is-6 baten"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "#37383F",
                    color: theme === "light" ? "red" : "#009B72",
                    borderRadius: "5px",
                    border: `0.5px solid ${
                      theme === "light" ? "lightgray" : "#009B72"
                    }`,
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
        </div>
      </>
    );
  }
}

export default Details;
