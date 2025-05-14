import React from "react";
import useSwal from "../../../../hooks/useSwal";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import "./TableModal.css";

const TableModal = ({ closeModal, addProject }) => {
  return (
    <div className="table-modal-container">
      <h3>Add Experience</h3>
      <div className="table-modal-title">
        Add an experience that highlights your contributions to blockchain
        projects. It build credibility and reputation in the community.
      </div>
      <hr />
      <form action="">
        <div className="groups-input">
          <input type="text" placeholder="Enter project name" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <CustomDateInput marginRight={true} />
          <CustomDateInput />
        </div>

        <div className="groups-input">
          <input type="text" placeholder="Result(URL)" />
        </div>

        <div className="group-btns-modal">
          <button
            onClick={(e) => {
              addProject();
              e.preventDefault();
              closeModal();
            }}
          >
            Add Reference
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableModal;
