import { FC, useEffect, useState } from 'react';

import { teamUkraineArray } from './AboutUsTeam';

import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks';
import { setSEOInfo } from '../../../redux/seoSlice';
// import { setRequestedChain } from '../../../redux/web3Slice';
import { SplashPageProps } from '../../../types/commonTypes';
// import NFTLA_Video from "../images/NFT-LA-RAIR-2021.mp4"
import { splashData } from '../../../utils/infoSplashData/ukraineSplashPage';
/* importing images*/
import {
  UKR_rounded,
  UKR4,
  UKR5,
  UKR126,
  UKR497,
  UKR1989,
  videoBackground
} from '../images/UkraineGlitch/urkaineGlitch';
import NotCommercialTemplate from '../NotCommercial/NotCommercialTemplate';
import AuthorCard from '../SplashPageTemplate/AuthorCard/AuthorCard';
import ListExlusiveProduct from '../SplashPageTemplate/ListExlusiveProduct/ListExlusiveProduct';
import ModalHelp from '../SplashPageTemplate/ModalHelp';
// import StaticTiles from "../SplashPageTemplate/VideoTiles/StaticTiles";
// import UnlockableVideo from "../images/nipsey1.png";
// import NFTCounter from "../SplashPageTemplate/NFTCounter/NFTCounter";
import NFTImages from '../SplashPageTemplate/NFTImages/NFTImages';
import VideoPlayerModule from '../SplashPageTemplate/VideoPlayer/VideoPlayerModule';
/* importing Components*/
import TeamMeet from '../TeamMeet/TeamMeetList';
import TokenLeftTemplate from '../TokenLeft/TokenLeftTemplate';

import MetaTags from '../../SeoTags/MetaTags';
import faviconUkraine from './../images/favicons/favicon-ukraine.ico';

import '../SplashPageTemplate/AuthorCard/AuthorCard.css';
import '../../AboutPage/AboutPageNew/AboutPageNew.css';
import './UkraineSplash.css';
// import PurchaseChecklist from "../PurchaseChecklist/PurchaseChecklist";

// Google Analytics
//const TRACKING_ID = 'UA-209450870-5'; // YOUR_OWN_TRACKING_ID
//ReactGA.initialize(TRACKING_ID);

const UkraineSplashPage: FC<SplashPageProps> = ({ setIsSplashPage }) => {
  const dispatch = useAppDispatch();
  const seo = useAppSelector((store) => store.seo);
  const [openCheckList, setOpenCheckList] = useState<boolean>(false);
  const [soldCopies, setSoldCopies] = useState<number>(0);
  const carousel_match = window.matchMedia('(min-width: 900px)');
  const [carousel, setCarousel] = useState(carousel_match.matches);
  const [purchaseList, setPurshaseList] = useState(true);
  const ukraineglitchChainId = '0x1';

  useEffect(() => {
    dispatch(
      setSEOInfo({
        title: 'Слава Україні!',
        ogTitle: 'Слава Україні!',
        twitterTitle: 'Слава Україні!',
        contentName: 'author',
        content: '#UkraineGlitch',
        description:
          '1991 Generative Abstract Glitch Art pieces to aid Ukraine',
        ogDescription:
          '1991 Generative Abstract Glitch Art pieces to aid Ukraine',
        twitterDescription:
          '1991 Generative Abstract Glitch Art pieces to aid Ukraine',
        image: UKR_rounded,
        favicon: faviconUkraine,
        faviconMobile: faviconUkraine
      })
    );
    //eslint-disable-next-line
  }, []);

  const togglePurchaseList = () => {
    setPurshaseList((prev) => !prev);
  };

  const toggleCheckList = () => {
    setOpenCheckList((prev) => !prev);
  };

  window.addEventListener('resize', () => setCarousel(carousel_match.matches));

  // useEffect(() => {
  //   dispatch(setRequestedChain(ukraineglitchChainId));
  //   //eslint-disable-next-line
  // }, []);

  useEffect(() => {
    setIsSplashPage?.(true);
  }, [setIsSplashPage]);

  return (
    <div className="wrapper-splash-page ukraineglitch">
      <MetaTags seoMetaTags={seo} />
      <div className="template-home-splash-page">
        <ModalHelp
          openCheckList={openCheckList}
          purchaseList={purchaseList}
          togglePurchaseList={togglePurchaseList}
          toggleCheckList={toggleCheckList}
          backgroundColor={{
            darkTheme: 'rgb(3, 91, 188)',
            lightTheme: 'rgb(3, 91, 188)'
          }}
        />
        <AuthorCard {...{ splashData, toggleCheckList }} />
        {/* <PurchaseChecklist
          toggleCheckList={toggleCheckList}
          openCheckList={openCheckList}
          nameSplash={"UkraineGlitch"}
          backgroundColor={{ darkTheme: "rgb(3, 91, 188)", lightTheme: "rgb(3, 91, 188)" }}
        /> */}
        {/* <NFTCounter primaryColor={"rhyno"} leftTokensNumber={0} wholeTokens={0} counterData={splashData.counterData} /> */}
        <TokenLeftTemplate
          counterData={splashData.counterData}
          soldCopies={soldCopies}
          nftTitle="NFTs Left"
        />
        <NFTImages
          NftImage={UKR5}
          Nft_1={UKR497}
          Nft_2={UKR1989}
          Nft_3={UKR4}
          Nft_4={UKR126}
          amountTokens={splashData.counterData?.nftCount}
          titleNft={splashData.exclusiveNft?.title}
          colorText={splashData.exclusiveNft?.titleColor}
          carousel={carousel}
        />
        <VideoPlayerModule
          backgroundImage={videoBackground}
          videoData={splashData.videoData}
        />
        {/* <StaticTiles title={splashData.tilesTitle} primaryColor={primaryColor} UnlockableVideo={UnlockableVideo}/> */}
        <ListExlusiveProduct
          carousel={!carousel}
          carouselTitle={splashData.carouselTitle}
          carouselData={splashData.carouselData}
        />
        <TeamMeet
          arraySplash={'ukraine'}
          titleHeadFirst={'About the'}
          titleHeadSecond={'Cause'}
          colorHeadSecond={'#035BBC'}
          teamArray={teamUkraineArray}
        />
        <NotCommercialTemplate NFTName={splashData.NFTName} />
      </div>
    </div>
  );
};

export default UkraineSplashPage;
