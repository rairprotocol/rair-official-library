//@ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  faGreaterThan,
  faHeart,
  faHouse,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Popup } from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import { Breadcrumbs, Typography } from "@mui/material";
import axios from "axios";
import { isAddress, ZeroAddress } from "ethers";
import { Hex } from "viem";

import { TUserResponse } from "../../axios.responseTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import useSwal from "../../hooks/useSwal";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { VideoIcon } from "../../images";
import { CatalogVideoItem, NftItemToken } from "../../types/commonTypes";
import { User } from "../../types/databaseTypes";
import { rFetch } from "../../utils/rFetch";
import InputField from "../common/InputField";
import LoadingComponent from "../common/LoadingComponent";
import { TooltipBox } from "../common/Tooltip/TooltipBox";
import FilteringBlock from "../MockUpPage/FilteringBlock/FilteringBlock";
import { ImageLazy } from "../MockUpPage/ImageLazy/ImageLazy";
import CustomShareButton from "../MockUpPage/NftList/NftData/CustomShareButton";
import SharePopUp from "../MockUpPage/NftList/NftData/TitleCollection/SharePopUp/SharePopUp";
import { PersonalProfileMyNftTab } from "../nft/PersonalProfile/PersonalProfileMyNftTab/PersonalProfileMyNftTab";
import { PersonalProfileMyVideoTab } from "../nft/PersonalProfile/PersonalProfileMyVideoTab/PersonalProfileMyVideoTab";
import { TSortChoice } from "../ResalePage/listOffers.types";
import { SvgUserIcon } from "../UserProfileSettings/SettingsIcons/SettingsIcons";

import { PersonalProfileIcon } from "./../nft/PersonalProfile/PersonalProfileIcon/PersonalProfileIcon";
import UserProfileCreated from "./UserProfileCreated/UserProfileCreated";
import UserProfileFavoritesTab from "./UserProfileFavorites/UserProfileFavoritesTab";

import "./UserProfilePage.css";
import LeaderBoard from "../DevSdkPage/LeaderBoard/LeaderBoard";
import EarnRewards from "../DevSdkPage/EarnRewards/EarnRewards";
import { loadVideoList } from "../../redux/videoSlice";
import {
  ArrowUp30,
  HomeNewIcon,
  InfoIcon,
  NewRightArrow,
} from "../../images/index";
import UserTabs from "./UserTabs/UserTabs";
import UserTable from "./UserTable/UserTable";

const UserProfilePage: React.FC = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "RAIR Protocol",
      start: "1/2024",
      end: "Ongoing",
      link: "https://github.com/xhg923442f",
      result: "",
    },
    {
      id: 2,
      name: "Tailwind Project",
      start: "4/2022",
      end: "12/2023",
      link: "",
      result: "None",
    },
    {
      id: 3,
      name: "BlockSphere",
      start: "2/2022",
      end: "5/2023",
      link: "https://github.com/xhg923442f",
      result: "",
    },
    {
      id: 4,
      name: "DecentraLink",
      start: "1/2022",
      end: "8/2022",
      link: "",
      result: "None",
    },
  ]);

  const [projects1, setProjects1] = useState([
    {
      id: 1,
      name: "Malcolm Satterfield",
      start: "rair.protocol",
      end: "Colleague",
      link: "github.com/serepensortia",
      result: "",
    },
    {
      id: 2,
      name: "Marco Corkery",
      start: "rair.protocol",
      end: "Colleague",
      link: "",
      result: "None",
    },
    {
      id: 3,
      name: "Edmond Sipes",
      start: "rair.protocol",
      end: "Colleague",
      link: "https://github.com/xhg923442f",
      result: "",
    },
    {
      id: 4,
      name: "Patsy Ferry",
      start: "rair.protocol",
      end: "Colleague",
      link: "",
      result: "None",
    },
    {
      id: 5,
      name: "Alexander Tremblay",
      start: "rair.protocol",
      end: "Colleague",
      link: "",
      result: "None",
    },
    {
      id: 6,
      name: "Emmett Swift III",
      start: "rair.protocol",
      end: "Colleague",
      link: "",
      result: "None",
    },
  ]);

  const { primaryColor, textColor, headerLogo, iconColor, primaryButtonColor } =
    useAppSelector((store) => store.colors);
  const { userAddress } = useParams();
  const dispatch = useAppDispatch();
  const { videos, videoListStatus } = useAppSelector((store) => store.videos);
  const { currentUserAddress } = useAppSelector((store) => store.web3);
  const [copyState, setCopyState] = useState(false);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [collectedTokens, setCollectedTokens] = useState<
    NftItemToken[] | undefined
  >(undefined);
  const [createdContracts, setCreatedContracts] = useState([]);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [loadingBg, setLoadingBg] = useState(false);
  const [sortItem, setSortItem] = useState<TSortChoice>();
  const [titleSearch, setTitleSearch] = useState("");
  const [tabIndexItems, setTabIndexItems] = useState(0);
  const showTokensRef = useRef<number>(20);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [totalCount, setTotalCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onResale, setOnResale] = useState<boolean>(false);
  const [isResaleLoading, setIsResaleLoding] = useState<boolean | undefined>(
    undefined
  );
  const [allRewards, setAllRewards] = useState(false);
  const [activeTab, setActiveTab] = useState("Completed tasks");

  const [metadataFilter, setMetadataFilter] = useState<boolean>(false);

  const rSwal = useSwal();
  const { width } = useWindowDimensions();

  const titleColumnRef = [
    {
      id: 1,
      name: "Who",
      hideMobile: false,
    },
    {
      id: 2,
      name: "Where",
      hideMobile: false,
    },
    {
      id: 3,
      name: "Relationship",
      hideMobile: true,
      class: "availability-leader",
    },
    {
      id: 4,
      name: "URL",
      hideMobile: true,
      class: "language-leader",
    },
  ];

  const titleColumnExp = [
    {
      id: 1,
      name: "Project",
      hideMobile: false,
    },
    {
      id: 2,
      name: "Start",
      hideMobile: false,
    },
    {
      id: 3,
      name: "End",
      hideMobile: true,
      class: "availability-leader",
    },
    {
      id: 4,
      name: "Result",
      hideMobile: true,
      class: "language-leader",
    },
  ];

  const handleClose = (value: number) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getMyNft = useCallback(
    async (number, page) => {
      if (userAddress && isAddress(userAddress)) {
        setIsLoading(true);

        const response = await rFetch(
          `/api/nft/${userAddress}?itemsPerPage=${number}&pageNum=${page}&onResale=${onResale}`
        );
        if (response.success) {
          setTotalCount(response.totalCount);
          setCollectedTokens(response.result.filter((token) => token.isMinted));
          setIsLoading(false);
          setIsResaleLoding(false);
        }

        if (response.error && response.message) {
          setIsLoading(false);
          setIsResaleLoding(false);
          return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userAddress, onResale, setIsResaleLoding]
  );

  const handleNewUserStatus = useCallback(async () => {
    const requestContract = await rFetch("/api/contracts/full?itemsPerPage=5");
    const { success, contracts } = await rFetch(
      `/api/contracts/full?itemsPerPage=${requestContract.totalNumber || "5"}`
    );

    if (success) {
      const contractsFiltered = contracts.filter(
        (el) => el.user === userAddress
      );

      setCreatedContracts(contractsFiltered);
    }
  }, [userAddress]);

  const getUserData = useCallback(async () => {
    if (userAddress && isAddress(userAddress) && userAddress !== ZeroAddress) {
      const userAddressChanged = userAddress.toLowerCase();
      setTabIndexItems(0);
      setUserData(undefined);
      const response = await rFetch(`/api/users/${userAddressChanged}`);

      if (response.success) {
        if (response.user) {
          setUserData(response.user);
        } else {
          const defaultUser: User = {
            avatar: "",
            background: "",
            creationDate: "2023-04-25T14:54:58.190Z",
            email: "",
            firstName: "",
            lastName: "",
            nickName: `@${userAddress}`,
            ageVerified: false,
            publicAddress: userAddress as Hex,
            _id: "none",
            blocked: false,
          };
          setUserData(defaultUser);
        }
      } else {
        setUserData(undefined);
      }
    }
  }, [userAddress]);

  const editBackground = useCallback(async () => {
    if (currentUserAddress) {
      const formData = new FormData();
      if (fileUpload) {
        setLoadingBg(true);
        formData.append("files", fileUpload);
        formData.append("background", fileUpload.name);

        const profileEditResponse = await axios.patch<TUserResponse>(
          `/api/users/${currentUserAddress.toLowerCase()}`,
          formData,
          {
            headers: {
              Accept: "multipart/form-data",
            },
          }
        );

        const { user, success } = profileEditResponse.data;
        if (success && user) {
          setFileUpload(null);
          setLoadingBg(false);
          getUserData();
        }
      }
    }
  }, [currentUserAddress, fileUpload, getUserData]);

  const breadcrumbs = [
    <NavLink key="1" to="/">
      <img src={HomeNewIcon} alt="Home" />
      <img
        src={NewRightArrow}
        style={{
          margin: "0 10px",
        }}
        alt="arrow"
      />
      {/* <FontAwesomeIcon
        icon={faHouse}
        style={{
          borderRadius: "5px",
          padding: "5px",
          color: textColor,
          background: primaryButtonColor,
          fontSize: "x-large",
        }}
      /> */}
    </NavLink>,
    <Typography key="3" color={"#8B949E"}>
      {(userData && userData.nickName && userData.nickName.length > 20
        ? userData.nickName.slice(0, 5) +
          "...." +
          userData.nickName.slice(length - 4)
        : userData?.nickName) ||
        (userAddress &&
          userAddress.slice(0, 4) + "...." + userAddress.slice(length - 4))}
    </Typography>,
  ];

  const photoUpload = useCallback(
    (e) => {
      e.preventDefault();
      const reader = new FileReader();
      const fileF = e.target.files[0];
      reader.onloadend = () => {
        if (fileF.type !== "video/mp4") {
          setFileUpload(fileF);
        } else {
          rSwal.fire(
            "Info",
            `You cannot upload video to background!`,
            "warning"
          );
        }
      };
      if (fileF) {
        reader.readAsDataURL(fileF);
      }
    },
    [rSwal]
  );

  useEffect(() => {
    if (userAddress) {
      dispatch(
        loadVideoList({
          userAddress,
        })
      );
    }
  }, [dispatch, userAddress]);

  const arrayTitle = ["PROJECT", "START", "END", "RESULT", ""];
  const arrayTitle2 = ["WHO", "WHERE", "RELATIONSHIP", "URL", ""];

  useEffect(() => {
    editBackground();
  }, [editBackground]);

  useEffect(() => {
    getMyNft(showTokensRef.current, 1);
  }, [getMyNft, showTokensRef]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    handleNewUserStatus();
  }, [handleNewUserStatus]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hotdropsVar = import.meta.env.VITE_TESTNET;

  if (userData === undefined) {
    return <LoadingComponent />;
  }

  return (
    <div className={`${width > 1025 ? "container" : "wrapper-user-page"}`}>
      {/* <div>
        <SharePopUp
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div> */}

      <div>
        <Popup
          // className="popup-settings-block"
          open={open}
          position="bottom center"
          closeOnDocumentClick
          onClose={() => {
            setOpen(false);
          }}
        >
          <div
            style={{
              height: "487px",
              width: "515px",
              borderRadius: "1rem",
              background: "#000000",
              border: "1px solid #5E3DFC",
              color: "#fff",
              padding: "40px",
              fontSize: "24px",
              fontWeight: "100",
            }}
          >
            <p>
              Level = representation of score in the system. Earn points to
              increase level by completing tasks
            </p>
            <p>
              Rank = Position of user relative to all other users (approximate
              value of payout at TGE for{" "}
              <span
                style={{
                  fontWeight: "900",
                }}
              >
                current rank
              </span>
              )
            </p>
            <p>
              Lvl + = Number of levels required to reach next rank (approximate
              value of payout at TGE for{" "}
              <span
                style={{
                  fontWeight: "900",
                }}
              >
                next rank
              </span>
              )
            </p>
          </div>
        </Popup>
      </div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "15px",
            }}
            className="breadcrumbs"
          >
            {breadcrumbs}
          </div>
        </div>
        <div
          className="new-profile-container"
          style={{
            width: "90vw",
            height: "80vh",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <div
            className="profile-block"
            style={{
              width: "400px",
              height: "100%",
              backgroundColor: "rgba(21, 27, 35, 0.7)",
              marginRight: "24px",
              borderRadius: "12px",
              border: "1px solid #3E4147",
              padding: "20px",
            }}
          >
            <div
              className="profile-block-avatar"
              style={{
                width: "100%",
                height: "260px",
                borderRadius: "12px",
                background: "#FFC9B2",
              }}
            >
              {/* {userData.avatar && (
                <ImageLazy
                  width="100%"
                  alt="User Avatar"
                  src={userData.avatar ? userData.avatar : ""}
                />
              )} */}

              {/* <SvgUserIcon /> */}
            </div>
            <div
              className="profile-block-nickname"
              style={{
                fontSize: "24px",
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                padding: "20px 0",
                borderBottom: "1px solid #3E4147",
              }}
            >
              {(userData && userData.nickName && userData.nickName.length > 20
                ? userData.nickName.slice(0, 5) +
                  "...." +
                  userData.nickName.slice(length - 4)
                : userData?.nickName) ||
                (userAddress &&
                  userAddress.slice(0, 4) +
                    "...." +
                    userAddress.slice(length - 4))}
            </div>
            <div className="profile-rank-and-lvl">
              <div
                className="rank-and-lvl-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #3E4147",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    color: "#8B949E",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  className="item-text"
                >
                  Level{" "}
                  <img
                    style={{
                      marginLeft: "8px",
                    }}
                    src={InfoIcon}
                    alt="Info"
                  />
                </div>
                <div
                  className="ranking"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  21{" "}
                  <div
                    className="ranking-block"
                    style={{
                      borderRadius: "20px",
                      width: "69px",
                      height: "20px",
                      background: "#2ACF61",
                      marginLeft: "6px",
                      fontSize: "12px",
                    }}
                  >
                    <img
                      style={{
                        marginLeft: "3px",
                      }}
                      src={ArrowUp30}
                      alt="Arrow"
                    />{" "}
                    ±13.2K
                  </div>
                </div>
              </div>
              <div
                className="rank-and-lvl-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #3E4147",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    color: "#8B949E",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  className="item-text"
                >
                  Rank{" "}
                  <img
                    style={{
                      marginLeft: "3px",
                    }}
                    src={InfoIcon}
                    alt="Info"
                  />
                </div>
                <div
                  className="ranking"
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "16px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  81{" "}
                  <div
                    className="ranking-block"
                    style={{
                      borderRadius: "20px",
                      width: "69px",
                      height: "20px",
                      background: "#2ACF61",
                      marginLeft: "6px",
                      fontSize: "12px",
                    }}
                  >
                    <img src={ArrowUp30} alt="Arrow" /> ±4.2K
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-top-lng-block">
              <div
                className="profile-top-lng-title"
                style={{
                  color: "#8B949E",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "16px 0 13px 0",
                  textAlign: "left",
                }}
              >
                Top Languages
              </div>
              <div
                className="languages-items"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    padding: "4px 7px",
                    background: "#8B949E",
                    fontSize: "12px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                  className="language-item"
                >
                  Rust • 10%
                </div>
                <div
                  style={{
                    padding: "4px 7px",
                    background: "#8B949E",
                    fontSize: "12px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                  className="language-item"
                >
                  javascript • 60%
                </div>
                <div
                  style={{
                    padding: "4px 7px",
                    background: "#8B949E",
                    fontSize: "12px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                  className="language-item"
                >
                  Go • 2%
                </div>
                <div
                  style={{
                    padding: "4px 7px",
                    background: "#8B949E",
                    fontSize: "12px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                  className="language-item"
                >
                  solidity • 28%
                </div>
              </div>
            </div>
          </div>
          <div
            className="profile-tabs-block"
            style={{
              gap: "10px",
              width: "100%",
            }}
          >
            <UserTabs setActiveTab={setActiveTab} activeTab={activeTab} />
            <div
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                padding: "20px",
              }}
            >
              {activeTab === "Completed tasks" && (
                <>
                  <h3>Completed tasks</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga totam dolorum, deserunt pariatur minus nesciunt
                    accusantium asperiores, aliquam quia reprehenderit porro
                    molestiae beatae commodi laborum laboriosam, dolores itaque
                    impedit necessitatibus!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga totam dolorum, deserunt pariatur minus nesciunt
                    accusantium asperiores, aliquam quia reprehenderit porro
                    molestiae beatae commodi laborum laboriosam, dolores itaque
                    impedit necessitatibus!
                  </p>
                </>
              )}
              {activeTab === "Experience" && (
                <>
                  <UserTable
                    projects={projects}
                    setProjects={setProjects}
                    arrayTitle={arrayTitle}
                  />
                </>
              )}
              {activeTab === "References" && (
                <>
                  <>
                    <UserTable
                      projects={projects1}
                      setProjects={setProjects1}
                      arrayTitle={arrayTitle2}
                    />
                  </>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserProfilePage;
