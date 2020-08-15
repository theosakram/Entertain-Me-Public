import React from "react";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";

function MostPopular({ movie }) {
  const history = useHistory();

  function toDetails(id) {
    history.push({
      pathname: `/details/${id}`,
      state: movie,
    });
  }

  return (
    <>
      <div
        key={movie.id}
        className="card"
        style={{
          borderRadius: "10px",
          marginRight: "15px",
        }}
        onClick={() => toDetails(movie._id)}
      >
        <figure className="image is-4by5">
          <img
            src={movie.poster_path}
            alt={movie.title}
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
        </figure>
        <div className="card-content">
          <div className="media">
            <div
              className="media-content"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "red",
              }}
            >
              <p className="title is-5">{movie.title}</p>
              <p style={{ color: "black" }}>Rating on MyAnimeList:</p>
              <Rating
                start={0}
                stop={10}
                step={2}
                fractions={2}
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