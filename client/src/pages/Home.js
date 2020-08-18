import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { context } from "../App";
import { useHistory } from "react-router-dom";

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

const GET_SERIES = gql`
  query getSeries {
    series {
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

function Home() {
  const { theme } = useContext(context);

  const history = useHistory();

  function toDetails(id, type, movie) {
    history.push({
      pathname: `/${type}/${id}`,
      state: movie,
    });
  }

  let { data: moviesData, loading: loadMov, error: errMov } = useQuery(
    GET_MOVIES
  );
  let { data: seriesData, loading: loadSer, error: errSer } = useQuery(
    GET_SERIES
  );

  if (loadMov || loadSer) {
    return (
      <div className="container">
        <div className="hero">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
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
        <div className="hero is-fullheight" style={{ marginTop: "25px" }}>
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-8">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article
                      onClick={() =>
                        toDetails(
                          mostPopularMov[1]._id,
                          mostPopularMov[1].type,
                          mostPopularMov[1]
                        )
                      }
                      className="tile is-child notification sidecard"
                      style={{
                        backgroundImage: `url(${mostPopularMov[1].poster_path})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <p className="title has-text-left has-text-white">
                        {mostPopularMov[1].title}
                      </p>
                    </article>
                    <article
                      onClick={() =>
                        toDetails(
                          mostPopularMov[0]._id,
                          mostPopularMov[0].type,
                          mostPopularMov[0]
                        )
                      }
                      className="tile is-child notification sidecard"
                      style={{
                        backgroundImage: `url(${mostPopularMov[0].poster_path})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                      }}
                    >
                      <p className="title is-4 has-text-left has-text-white">
                        {mostPopularMov[0].title}
                      </p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article
                      onClick={() =>
                        toDetails(
                          mostPopularSer[1]._id,
                          mostPopularSer[1].type,
                          mostPopularSer[1]
                        )
                      }
                      className="tile is-child notification sidecard"
                      style={{
                        backgroundImage: `url(${mostPopularSer[1].poster_path})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                      }}
                    >
                      <p className="title has-text-left has-text-white">
                        {mostPopularSer[1].title}
                      </p>
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/640x480.png"
                          style={{ opacity: 0 }}
                        />
                      </figure>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification">
                    <nav className="level">
                      <div className="level-item has-text-centered">
                        <div>
                          <p
                            className="heading"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            Movies
                          </p>
                          <p
                            className="title"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            3,456
                          </p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p
                            className="heading"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            Series
                          </p>
                          <p
                            className="title"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            1,234
                          </p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p
                            className="heading"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            Mangas
                          </p>
                          <p
                            className="title"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            2,345
                          </p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p
                            className="heading"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            Users
                          </p>
                          <p
                            className="title"
                            style={{
                              color: theme === "light" ? "red" : "#009B72",
                            }}
                          >
                            250K
                          </p>
                        </div>
                      </div>
                    </nav>
                  </article>
                </div>
              </div>
              <div className="tile is-parent">
                <article
                  onClick={() =>
                    toDetails(
                      mostPopularSer[0]._id,
                      mostPopularSer[0].type,
                      mostPopularSer[0]
                    )
                  }
                  className="tile is-child notification sidecard"
                  style={{
                    backgroundImage: `url(${mostPopularSer[0].poster_path})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                >
                  <div className="content">
                    <p className="title has-text-left has-text-white">
                      {mostPopularSer[0].title}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="container"
          style={{ marginBottom: "55px", marginTop: "15px" }}
        >
          <h1
            className="title is-4 has-text-left"
            style={{ color: theme === "light" ? "black" : "white" }}
          >
            MOST POPULAR MOVIES
          </h1>
          <div className="columns is-multiline is-gapless">
            {mostPopularMov.map((movie) => (
              <div key={movie._id} className="column is-one-third">
                <MostPopular movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ paddingBottom: "25px" }}>
          <h1
            className="title is-4 has-text-left"
            style={{ color: theme === "light" ? "black" : "white" }}
          >
            MOST POPULAR SERIES
          </h1>
          <div className="columns is-multiline is-gapless">
            {mostPopularSer.map((movie) => (
              <div key={movie._id} className="column is-one-third">
                <MostPopular movie={movie} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Home;
