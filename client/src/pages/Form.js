import React from "react";

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
  return (
    <>
      <div className="container" style={{ marginTop: "25px" }}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Input your title here..."
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Poster URL</label>
          <div className="control">
            <input className="input" type="text" placeholder="URL" />
          </div>
        </div>

        <div className="field">
          <label className="label">Popularity</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Input rating here"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Tags</label>
          {tags.map((tag, index) => (
            <label key={index} class="checkbox" style={{ marginRight: "15px" }}>
              <input value={tag} type="checkbox" />
              {tag}
            </label>
          ))}
        </div>

        <div className="field">
          <label className="label">Overview</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Input your description here"
            ></textarea>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" /> I am sure the information I provided is
              correct
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
    </>
  );
}

export default Form;
