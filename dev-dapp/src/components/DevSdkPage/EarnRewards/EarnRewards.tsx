//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { TNftFilesResponse } from "../../../axios.responseTypes";
import axios from "axios";
import { MediaFile } from "../../../types/databaseTypes";
import RewardVideoBox from "./RewardVideoBox/RewardVideoBox";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import LoadingComponent from "../../common/LoadingComponent";
import WorkflowContext from "../../../contexts/CreatorWorkflowContext";
import { rFetch } from "../../../utils/rFetch";
import "./EarnRewards.css";

const EarnRewards = ({ devDapp, userVideoList }) => {
  const [videoList, setVideoList] = useState([]);
  const { currentUserAddress } = useAppSelector((store) => store.web3);
  const { isLoggedIn, loginStatus } = useAppSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);

  const [mainBannerInfo, setMainBannerInfo] = useState<any>(undefined);

  const getCollectionBanner = useCallback(async () => {
    const response = await rFetch(`/api/settings/featured`);
    if (response.success) {
      setMainBannerInfo(response.data);
    }
  }, []);

  const getProductsFromOffer = useCallback(async () => {
    if (mainBannerInfo) {
      setIsLoading(true);
      const response = await axios.get<TNftFilesResponse>(
        `/api/nft/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}/files`
      );
      const loadedFiles: string[] = [];
      if (response.data.success) {
        setVideoList(
          response.data.files.filter((item: MediaFile) => {
            if (item._id && !loadedFiles.includes(item._id)) {
              loadedFiles.push(item._id);
              return true;
            }
            return false;
          })
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [currentUserAddress, loginStatus, isLoggedIn, mainBannerInfo]);

  useEffect(() => {
    getCollectionBanner();
  }, [getCollectionBanner]);

  useEffect(() => {
    if (userVideoList) {
      setVideoList(userVideoList);
    } else {
      getProductsFromOffer();
    }
  }, [getProductsFromOffer, userVideoList]);

  return (
    <div
      style={{
        width: devDapp && "80vw",
      }}
      className="nft-single-unlockables-page"
    >
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="nft-rarity-wrapper">
          <div
            style={{
              margin: videoList.length < 4 && "20px 0 40px 0",
            }}
            className="video-wrapper-grid"
          >
            {videoList &&
              videoList.slice(0, 4).map((el) => {
                return <RewardVideoBox key={el._id} video={el} />;
              })}
          </div>
          {videoList.length > 4 && (
            <button
              style={{
                width: "288px",
                height: "48px",
                borderRadius: "16px",
                background: "none",
                outline: "none",
                border: "1px solid #d37ad6",
                margin: "20px 0 40px 0",
                color: "#fff",
              }}
              className="video-grid-btn"
            >
              See All Tasks
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ContextWrapper = (props) => {
  return (
    <WorkflowContext.Consumer>
      {(value) => {
        return <EarnRewards {...value} {...props} />;
      }}
    </WorkflowContext.Consumer>
  );
};

export default ContextWrapper;
