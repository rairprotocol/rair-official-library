import React, { useCallback, useEffect, useState } from "react";
import { TNftFilesResponse } from "../../../axios.responseTypes";
import axios from "axios";
import { MediaFile } from "../../../types/databaseTypes";
import RewardVideoBox from "./RewardVideoBox/RewardVideoBox";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import LoadingComponent from "../../common/LoadingComponent";
import WorkflowContext from "../../../contexts/CreatorWorkflowContext";
import { rFetch } from "../../../utils/rFetch";

const EarnRewards = () => {
  const [videoList, setVideoList] = useState([]);
  const { currentUserAddress } = useAppSelector((store) => store.web3);
  const { adminRights, superAdmin, isLoggedIn, loginStatus } = useAppSelector(
    (store) => store.user
  );
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
    getProductsFromOffer();
  }, [getProductsFromOffer]);

  return (
    <div
      style={{
        width: "80vw",
      }}
      className="nft-single-unlockables-page"
    >
      {isLoading ? (
        <LoadingComponent />
      ) : (
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
            {videoList &&
              videoList.map((el) => {
                return <RewardVideoBox key={el._id} video={el} />;
              })}
          </div>
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
