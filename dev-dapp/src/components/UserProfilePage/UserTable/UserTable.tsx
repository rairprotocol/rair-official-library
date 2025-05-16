import React, { useState } from "react";
import useSwal from "../../../hooks/useSwal";
import { PlusIcon, RemoveIcon } from "../../../images/index";
import TableModal from "./TableModal/TableModal";
import "./UserTable.css";

const UserTable = ({ arrayTitle, setProjects, projects }) => {
  const reactSwal = useSwal();

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const openAddModal = () => {
    reactSwal.fire({
      html: <TableModal addProject={addProject} closeModal={closeModal} />,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  const closeModal = () => {
    reactSwal.close();
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: projects.length + 1,
        name: "Arsenii Pylypenko",
        start: "1/2024",
        end: "Ongoing",
        link: "https://github.com/xhg923442f",
        result: "",
      },
    ]);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {arrayTitle &&
              arrayTitle.map((el, index) => {
                return <th key={index}>{el}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.start}</td>
              <td>{project.end}</td>
              <td>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.link}
                  </a>
                ) : (
                  project.result
                )}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProject(project.id)}
                >
                  <img src={RemoveIcon} alt="Trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={openAddModal} className="plus-container">
        <img
          style={{
            marginRight: "14px",
          }}
          src={PlusIcon}
          alt="Plus"
        />
        Add Experience
      </button>
    </div>
  );
};

export default UserTable;
