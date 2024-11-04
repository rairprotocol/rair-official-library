import React from "react";
import { useAppSelector } from "../../hooks/useReduxHooks";
import {
  LennyWait,
  LockIcon,
  RairBackground,
  RairProtocol,
} from "../../images/index";
import { ImageLazy } from "../MockUpPage/ImageLazy/ImageLazy";
import "./DevSdkPage.css";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

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
                heoght: "auto",
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
            style={{ color: "#A7A6A6", fontWeight: "bold", fontSize: "20px" }}
          >
            3800
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Levels Earned</div>
          <div
            style={{ color: "#95F619", fontWeight: "bold", fontSize: "20px" }}
          >
            12187
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Commits</div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}>
            5125 + 120 + 300
          </div>
        </div>
        <div className="columns-stats-box">
          <div>Integrations</div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}>
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
      <div
        style={{
          width: "80vw",
        }}
        className="nft-single-unlockables-page"
      >
        <div className="nft-rarity-wrapper">
          <div
            className="video-wrapper"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px" /* Отступы между элементами */,
              width: "100%" /* Занимает всю ширину экрана */,
              margin: "20px auto",
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LennyWait})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Complete Profile
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~20 Minutes
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${RairBackground})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Join Pool
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~10 minutes
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${RairBackground})`,
                  backgroundSize: "cover",
                  overflow: "hidden",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Submit Bug
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  2-4 hours
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${RairBackground})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Akash
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~8 hours
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${RairBackground})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  New Feature Request
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  2-8 hours
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LennyWait})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Complete Profile
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~20 Minutes
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LennyWait})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Complete Profile
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~20 Minutes
                </p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                height: "135px",
                background: "#383637",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: "12px",
                  borderRight: "4px solid #E4476D",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LennyWait})`,
                  backgroundSize: "cover",
                }}
                className=""
              >
                <div
                  style={{
                    background: "#E4476D",
                    width: "32px",
                    height: "32px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    src={LockIcon}
                    alt="lock icon"
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Complete Profile
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#A7A6A6",
                  }}
                >
                  ~20 Minutes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="title-dev-dapp">
          <div>Launch</div>
        </div>
      </div>
    </div>
  );
};

export default DevSdkPage;
