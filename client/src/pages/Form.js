import React, { useState, useEffect, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { context } from "../App";
import { Modal } from "../components";

const ADD_SERIAL = gql`
  mutation addSerial($addMovieForm: newSerial) {
    addSerial(serial: $addMovieForm) {
      _id
      title
      type
      popularity
      overview
      poster_path
      tags
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie($addMovieForm: newMovie) {
    addMovie(movie: $addMovieForm) {
      _id
      title
      type
      popularity
      overview
      poster_path
      tags
    }
  }
`;

function Form() {
  const { theme } = useContext(context);
  const history = useHistory();
  const tags = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Hentai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
    "Yaoi",
    "Yuri",
  ];

  const [addMovieForm, setAddMovieForm] = useState({
    title: "",
    overview: "",
    type: "",
    poster_path: "",
    popularity: 0,
    tags: [],
  });

  const [tag, setTag] = useState([]);

  const [addMovie] = useMutation(ADD_MOVIE);
  const [addSerial] = useMutation(ADD_SERIAL);

  useEffect(() => {
    setAddMovieForm({
      ...addMovieForm,
      tags: tag,
    });
  }, [tag]);

  function onChange(event) {
    let { name, value } = event.target;
    if (name === "tags") setTag([...tag, value]);
    if (name === "popularity") value = +value;

    setAddMovieForm({
      ...addMovieForm,
      [name]: value,
    });
  }

  const [modal, setModal] = useState(false);

  function add(event) {
    event.preventDefault();
    if (
      addMovieForm.title === "" ||
      addMovieForm.popularity === "" ||
      addMovieForm.overview === "" ||
      !addMovieForm.tags.length ||
      addMovieForm.poster_path === ""
    ) {
      setModal(true);
    } else {
      if (addMovieForm.type === "movies") {
        addMovie({
          variables: { addMovieForm },
          refetchQueries: [`getMovies`],
        });
        history.push("/movies");
      } else {
        addSerial({
          variables: { addMovieForm },
          refetchQueries: [`getSeries`],
        });
        history.push("/series");
      }
    }
  }

  return (
    <>
      {modal && <Modal removeModal={() => setModal(false)} />}

      <div className="container" style={{ width: "50%" }}>
        <form onSubmit={add}>
          <div className="container" style={{ marginTop: "25px" }}>
            <div className="field">
              <label
                className="label"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                Title
              </label>
              <div className="control">
                <input
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Input your title here..."
                  defaultValue={addMovieForm.title}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                Poster URL
              </label>
              <div className="control">
                <input
                  name="poster_path"
                  defaultValue={addMovieForm.poster_path}
                  className="input"
                  type="text"
                  placeholder="URL"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                Popularity
              </label>
              <div className="control">
                <input
                  name="popularity"
                  defaultValue={addMovieForm.popularity}
                  className="input"
                  type="text"
                  placeholder="Input rating here"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                Tags
              </label>
              <div className="columns is-multiline">
                {tags.map((tag, index) => (
                  <div className="column">
                    <label
                      key={index}
                      className="checkbox"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: theme === "light" ? "black" : "white",
                      }}
                    >
                      <input
                        name="tags"
                        onChange={onChange}
                        type="checkbox"
                        value={tag}
                        defaultChecked=""
                      />
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                Overview
              </label>
              <div className="control">
                <textarea
                  name="overview"
                  onChange={onChange}
                  defaultValue={addMovieForm.overview}
                  className="textarea"
                  placeholder="Input your description here"
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
