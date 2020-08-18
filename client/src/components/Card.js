import React, { useContext } from "react";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
import { context } from "../App";

function Card({ movie }) {
  const history = useHistory();

  function toDetails(id, type) {
    history.push({
      pathname: `/${type}/${id}`,
      state: movie,
    });
  }

  const { theme } = useContext(context);

  return (
    <>
      <div
        onClick={() => toDetails(movie._id, movie.type)}
        className="card"
        style={{
          borderRadius: "15px",
        }}
      >
        <div className="card-image">
          <figure className="image is-4by5">
            <img
              src={movie.poster_path}
              alt={movie.title}
              style={{ borderRadius: "5px" }}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div
              className="media-content"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: theme === "light" ? "red" : "#009B72",
              }}
            >
              <p className="title is-6">{movie.title}</p>
              <p style={{ color: "black" }}>Rating on MyAnimeList:</p>
              <Rating
                start={0}
                stop={10}
                step={2}
                fractions={2}
                readonly="true"
                initialRating={movie.popularity}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
              />
              <span style={{ marginLeft: "15px" }}>{movie.popularity} </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
