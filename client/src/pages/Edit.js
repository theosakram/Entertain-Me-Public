import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";

const EDIT_SERIAL = gql`
  mutation editSerial($id: String, $editMovieForm: newSerial) {
    editSerial(serialId: $id, serial: $editMovieForm)
  }
`;

const EDIT_MOVIE = gql`
  mutation editMovie($id: String, $editMovieForm: newMovie) {
    editMovie(movieId: $id, movie: $editMovieForm)
  }
`;

function Edit() {
  const { state } = useLocation();
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

  const [editMovieForm, setEditMovieForm] = useState({
    title: "",
    overview: "",
    type: "",
    poster_path: "",
    popularity: 0,
    tags: [],
  });

  const [tag, setTag] = useState([]);

  const [editMovie] = useMutation(EDIT_MOVIE);
  const [editSerial] = useMutation(EDIT_SERIAL);

  useEffect(() => {
    setEditMovieForm({
      ...editMovieForm,
      tags: tag,
    });
  }, [tag]);

  function onChange(event) {
    let { name, value } = event.target;
    if (name === "tags") setTag([...tag, value]);
    if (name === "popularity") value = +value;

    setEditMovieForm({
      ...editMovieForm,
      [name]: value,
    });
  }

  function edit(event) {
    event.preventDefault();
    if (editMovieForm.type === "movies") {
      editMovie({
        variables: { id: state._id, editMovieForm },
        refetchQueries: [`getMovies`],
      });
      history.push("/movies");
    } else {
      editSerial({
        variables: { id: state._id, editMovieForm },
        refetchQueries: [`getSeries`],
      });
      history.push("/series");
    }
  }

  return (
    <>
      <form onSubmit={edit}>
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Input your title here..."
                defaultValue={state.title}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Type</label>
            <select name="type" onChange={onChange}>
              <option value={state.type}>{state.type}</option>
              <option value="movies">Movie</option>
              <option value="series">Serial</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Poster URL</label>
            <div className="control">
              <input
                name="poster_path"
                defaultValue={state.poster_path}
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
                defaultValue={state.popularity}
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
                  defaultChecked={state.tags.includes(tag)}
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
                defaultValue={state.overview}
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

export default Edit;
