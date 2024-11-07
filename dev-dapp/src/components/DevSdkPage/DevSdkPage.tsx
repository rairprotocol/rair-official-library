//@ts-nocheck
import { useAppSelector } from "../../hooks/useReduxHooks";
import { RairProtocol } from "../../images/index";
import "./DevSdkPage.css";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import EarnRewards from "./EarnRewards/EarnRewards";

const DevSdkPage = () => {
  const { primaryColor } = useAppSelector((store) => store.colors);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="wrapper-splash-page"
    >
      <div className="template-home-splash-page-dev">
        <div className="template-author-card-dev">
          <div
            style={{
              width: "50%",
            }}
            className="left-side"
          >
            <h3
              style={{
                color: "#7762D7",
                fontWeight: "bold",
                fontSize: "48px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                #Buidl
              </span>{" "}
              the next web3 unicorn and earn $RAIR
            </h3>
            <button
              style={{
                background: "#000",
                color: "#fff",
                fontSize: "20px",
                width: "319px",
                height: "64px",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              Connect Github
            </button>
          </div>
          <div className="right-side">
            <div
              style={{
                fontWeight: "bold",
                textAlign: "left",
              }}
              className="block-title"
            >
              <p
                style={{
                  color: "#A7A6A6",
                  fontSize: "24px",
                  margin: 0,
                }}
              >
                Developer
              </p>
              <p
                style={{
                  color: "#4E4D4D",
                  fontSize: "32px",
                  margin: 0,
                }}
              >
                Reward Network
              </p>
            </div>
            <img
              style={{
                width: "272px",
                height: "auto",
                marginTop: "15px",
              }}
              src={RairProtocol}
              alt="Rair Protocol"
            />
          </div>
        </div>
      </div>
      <div className="columns-stats">
        <div className="columns-stats-box">
          <div>Devs</div>
          <div
            className="columns-stats-box-numbers"
            style={{ color: "#A7A6A6", fontWeight: "bold" }}
          >
            3800
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Levels Earned</div>
          <div
            className="columns-stats-box-numbers"
            style={{ color: "#95F619", fontWeight: "bold" }}
          >
            12187
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Commits</div>
          <div
            className="columns-stats-box-numbers"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            5125 + 120 + 300
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Integrations</div>
          <div
            className="columns-stats-box-numbers"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            87
          </div>
        </div>
      </div>
      <div className="title-dev-dapp">
        <div>Leaderboard</div>
        <div>
          <button>{"Full leaderboard  >>"}</button>
        </div>
      </div>
      <LeaderBoard />
      <div className="title-dev-dapp">
        <div> Earn Rewards</div>
        <div>
          <button>{"All rewards  >>"}</button>
        </div>
      </div>
      <EarnRewards />
      <div
        style={{
          width: "80vw",
        }}
      >
        <div className="title-dev-dapp">
          <div>Launch</div>
        </div>
      </div>
    </div>
  );
};

export default DevSdkPage;
