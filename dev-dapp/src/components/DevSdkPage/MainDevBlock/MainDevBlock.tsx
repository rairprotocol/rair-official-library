import React from "react";
import { GitHubVertorIcon } from "../../../images/index";
import "./MainDevBlock.css";

const MainDevBlock = () => {
  return (
    <div className="main-dev-container">
      <div className="main-dev-image">
        <img src={GitHubVertorIcon} alt="Github" />
      </div>
      <div className="main-dev-title">
        Complete Tasks in Github,
        <br />
        <span>Earn Rewards</span>, Make Open
        <br />
        Source Better
      </div>
      <div className="main-dev-button">
        <button>Connect GitHub</button>
      </div>
      <div className="main-dev-paragh">With reward network Rair Protocol</div>
    </div>
  );
};

export default MainDevBlock;
