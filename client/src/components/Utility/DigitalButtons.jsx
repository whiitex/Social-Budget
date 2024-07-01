import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const DigitalButtons = ({margintop}) => {
  return (
    <div className={"d-flex flex-column ml-3 justify-content-center " + margintop}>
      <button type="button" className="plain-button p-1 m-0">
        <i
          className="btn-light bi bi-chevron-compact-up m-0 p-1"
          style={{ fontSize: "1.4em" }}
        ></i>
      </button>
      <button type="button" className="plain-button p-1 m-0">
        <i
          className="btn-light bi bi-chevron-compact-down m-0 p-1"
          style={{ fontSize: "1.4em" }}
        ></i>
      </button>
    </div>
  );
};

export default DigitalButtons;
