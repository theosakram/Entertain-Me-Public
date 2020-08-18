import React, { useContext } from "react";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
import { context } from "../App";

function MostPopular({ movie }) {
  const history = useHistory();

  function toDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: movie,
    });
  }

  const { theme } = useContext(context);

  return (
    <>
      <div
        key={movie.id}
        className="card"
        style={{
          borderRadius: "5px",
          marginRight: "15px",
          backgroundImage: `url(${movie.poster_path})`,
          backgroundSize: "cover",
          height: 400,
          position: "relative",
        }}
        onClick={() => toDetails(movie._id)}
      >
        <div className="card-content">
          <div className="media">
            <div
              className="media-content has-text-left"
              style={{
                color: theme === "light" ? "red" : "#009B72",
                position: "absolute",
                left: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.6)",
                width: "100%",
                height: 100,
                whiteSpace: "nowrap",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <p className="title is-5 has-text-white">{movie.title}</p>
              <p style={{ color: "white" }}>Rating on MyAnimeList:</p>
              <Rating
                start={0}
                stop={10}
                step={2}
                fractions={2}
                readonly="true"
                initialRating={movie.popularity}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
              />{" "}
              <span>{movie.popularity}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostPopular;
