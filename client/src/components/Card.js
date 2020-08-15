import React from "react";
import Rating from "react-rating";

function Card({ movie }) {
  return (
    <>
      <div
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
                color: "#F15946",
              }}
            >
              <p className="title is-6">{movie.title}</p>
              <p style={{ color: "black" }}>Rating on MyAnimeList:</p>
              <Rating
                start={0}
                stop={10}
                step={2}
                fractions={2}
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
