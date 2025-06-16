import React, { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../hooks/useReduxHooks';
import { rairSDK } from '../../../common/rairSDK';
import VideoPlayerView from '../../../MockUpPage/NftList/NftData/UnlockablesPage/VideoPlayerView';
import { IStreamsAbout } from '../aboutPage.types';

const StreamsAbout: React.FC<IStreamsAbout> = ({ purchaseButton }) => {
  const whatSplashPage = 'about-page';
  const [allVideos, setAllVideos] = useState<Array<any>>([]);
  const [selectVideo, setSelectVideo] = useState<any>();
  const { primaryColor, isDarkMode } = useAppSelector((store) => store.colors);

  const getAllVideos = useCallback(async () => {
    const response = await rairSDK.nft?.findFilesForProduct({
      networkId: '0x38',
      contract: '0xb6163454da87e9f3fd63683c5d476f7d067f75a2',
      product: 0
    });
    if (response?.success) {
      setAllVideos(response?.filteredFiles);
      setSelectVideo(response?.filteredFiles[0]);
    }
  }, []);

  useEffect(() => {
    getAllVideos();
  }, [getAllVideos]);

  return (
    <div className="about-streams-video">
      <div className="join-community">
        <div className="title-join">
          <h3>
            Test our <span className="text-gradient">streams</span>
          </h3>
        </div>
        <div className={`community-description ${!isDarkMode ? 'rhyno' : ''}`}>
          <div className={`community-text ${!isDarkMode ? 'rhyno' : ''}`}>
            <p>
              You’ll need <span>Metamask</span> and a watch token to play our
              encrypted streams. To stream the videos below you’ll need to mint
              a watch token for .1 MATIC
            </p>
            {purchaseButton}
          </div>
        </div>
      </div>
      <div className="tutorial-with-metamask">
        <div className="container-content-metamask">
          <div className="container-block-video">
            <VideoPlayerView
              productsFromOffer={allVideos}
              primaryColor={primaryColor}
              selectVideo={selectVideo}
              setSelectVideo={setSelectVideo}
              whatSplashPage={whatSplashPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamsAbout;
