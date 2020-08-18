import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

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

  function add(event) {
    event.preventDefault();
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

  return (
    <>
      <form onSubmit={add}>
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="field">
            <label className="label">Title</label>
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
            <label className="label">Type</label>
            <select name="type" onChange={onChange}>
              <option value="">Choose</option>
              <option value="movies">Movie</option>
              <option value="series">Serial</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Poster URL</label>
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
            <label className="label">Popularity</label>
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
            <label className="label">Tags</label>
            {tags.map((tag, index) => (
              <label
                key={index}
                className="checkbox"
                style={{ marginRight: "15px" }}
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
            ))}
          </div>

          <div className="field">
            <label className="label">Overview</label>
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

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" /> I am sure the information I provided
                is correct
              </label>
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
    </>
  );
}

export default Form;
