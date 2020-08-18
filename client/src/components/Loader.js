import React from "react";

function Loader() {
  return (
    <>
      <div className="container">
        <div className="hero">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
