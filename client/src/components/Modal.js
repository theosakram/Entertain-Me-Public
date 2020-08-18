import React, { useState } from "react";

function Modal({ removeModal }) {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card" style={{ background: "white" }}>
          <header className="modal-card-title">HEHE</header>
          <div className="modal-content">Empty value not allowed</div>
        </div>
        <button
          onClick={() => removeModal()}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  );
}

export default Modal;
