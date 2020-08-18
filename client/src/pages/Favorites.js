import React from "react";
import { Card, Loader } from "../components";
import client, { GET_FAV } from "../config/graphql";

function Favorites() {
  const { favs } = client.readQuery({ query: GET_FAV });

  if (!favs) return <Loader />;
  else {
    return (
      <>
        <div className="container" style={{ marginTop: "25px" }}>
          <div className="columns is-multiline">
            {favs?.map((fav) => (
              <div className="column is-one-quarter">
                <Card movie={fav} key={fav._id} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
