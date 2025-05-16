import React from "react";
import "./UserTabs.css";

const UserTabs: React.FC = ({ activeTab, setActiveTab }) => {
  // Контент для каждого таба
  const tabContent = {
    "Completed tasks": <div>Content for Completed tasks</div>,
    Experience: <div>Content for Experience</div>,
    References: <div>Content for References</div>,
  };

  return (
    <>
      <div className={`tab-content ${activeTab ? "tab-content-active" : ""}`}>
        {tabContent[activeTab]}
      </div>
      <div className="tabs-container">
        {/* Таб кнопки */}
        <div className="tabs">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserTabs;
