import React, { useState } from "react";

function Form() {
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
    poster_path: "",
    popularity: "",
    tags: [],
  });

  function onChange(event) {
    const { target } = event;
    const { name } = target;

    const value = name === "tags" ? target.checked : target.value;

    setAddMovieForm({
      ...addMovieForm,
      [name]: value,
      tags: tags.concat(value),
    });
  }

  function addMovie(event) {
    event.preventDefault();
    console.log(addMovieForm);
  }

  return (
    <>
      <form onSubmit={addMovie}>
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
                  checked={addMovieForm.tags}
                  onChange={onChange}
                  defaultValue={addMovieForm.tags}
                  type="checkbox"
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
