import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import useConnectUser from '../../hooks/useConnectUser';
import { useAppSelector } from '../../hooks/useReduxHooks';
import {
  AppleIcon,
  GoogleIcon,
  MailIcon,
  metaMaskIcon,
  XIcon
} from '../../images/index';
import { rFetch } from '../../utils/rFetch';
import { ContractType } from '../adminViews/adminView.types';
import { OnboardingButton } from '../common/OnboardingButton/OnboardingButton';
import { TOfferType } from '../marketplace/marketplace.types';
import MainBanner from '../MockUpPage/MainBanner/MainBanner';
import TitleCollection from '../MockUpPage/NftList/NftData/TitleCollection/TitleCollection';

const SimpleDApp = () => {
  const { connectUserData } = useConnectUser();
  const { isLoggedIn } = useAppSelector((store) => store.user);

  const { primaryColor, primaryButtonColor, textColor } = useAppSelector(
    (store) => store.colors
  );

  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [mainBannerInfo, setMainBannerInfo] = useState<any>(undefined);
  const [tokenData, setTokenData] = useState<any>();
  const [, setContractData] = useState<ContractType>();
  const [offerDataInfo, setOfferDataInfo] = useState<TOfferType[]>();

  const getCollectionBanner = async () => {
    const response = await rFetch(`/api/settings/featured`);
    if (response.success) {
      setMainBannerInfo(response.data);
    }
  };

  const getContractInfo = useCallback(async () => {
    if (
      mainBannerInfo &&
      mainBannerInfo.blockchain &&
      mainBannerInfo.contract
    ) {
      const response = await rFetch(
        `/api/contracts/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}`
      );

      if (response.success) {
        setContractData(response.contract);
      }
    }
  }, [mainBannerInfo]);

  const getAllProduct = useCallback(async () => {
    if (
      mainBannerInfo &&
      mainBannerInfo.blockchain &&
      mainBannerInfo.product &&
      mainBannerInfo.contract
    ) {
      const responseAllProduct = await axios.get(
        `/api/nft/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}`
      );

      const tokenMapping = {};
      if (responseAllProduct.data.success && responseAllProduct.data.result) {
        responseAllProduct.data.result.tokens.forEach((item) => {
          tokenMapping[item.token] = item;
        });
      }

      setTokenData(tokenMapping);
    }
  }, [mainBannerInfo]);

  const getParticularOffer = useCallback(async () => {
    try {
      if (
        mainBannerInfo &&
        mainBannerInfo.blockchain &&
        mainBannerInfo.product &&
        mainBannerInfo.contract
      ) {
        const response = await axios.get(
          `/api/nft/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}/offers`
        );
        if (response.data.success) {
          setOfferDataInfo(response.data.product.offers);
        }
      }
    } catch (err) {
      // console.error(error?.message);
    }
  }, [mainBannerInfo]);

  const checkMetamask = useCallback(() => {
    // @ts-ignore
    setMetamaskInstalled(window?.ethereum && window?.ethereum?.isMetaMask);
  }, [setMetamaskInstalled]);

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  useEffect(() => {
    getParticularOffer();
  }, [getParticularOffer]);

  useEffect(() => {
    getCollectionBanner();
  }, []);

  useEffect(() => {
    getContractInfo();
  }, [getContractInfo]);

  useEffect(() => {
    checkMetamask();
  }, [checkMetamask]);

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          {!metamaskInstalled ? (
            <OnboardingButton />
          ) : (
            <button
              className="btn rair-button"
              style={{
                background: `${
                  primaryColor === '#dedede'
                    ? import.meta.env.VITE_TESTNET === 'true'
                      ? 'var(--hot-drops)'
                      : 'linear-gradient(to right, #e882d5, #725bdb)'
                    : import.meta.env.VITE_TESTNET === 'true'
                      ? primaryButtonColor ===
                        'linear-gradient(to right, #e882d5, #725bdb)'
                        ? 'var(--hot-drops)'
                        : primaryButtonColor
                      : primaryButtonColor
                }`,
                color: textColor,
                borderRadius: '10px',
                fontSize: '18px',
                width: '270px',
                height: '170px'
              }}
              onClick={() => connectUserData()}>
              <div
                style={{
                  fontSize: '30px',
                  marginBottom: '30px'
                }}>
                Start Here
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}>
                <img
                  style={{
                    width: '35px',
                    height: 'auto'
                  }}
                  src={GoogleIcon}
                  alt="metamask-logo"
                />
                <img
                  style={{
                    width: '35px',
                    height: 'auto'
                  }}
                  src={AppleIcon}
                  alt="metamask-logo"
                />
                <img
                  style={{
                    width: '35px',
                    height: 'auto'
                  }}
                  src={XIcon}
                  alt="metamask-logo"
                />
                <img
                  style={{
                    width: '35px',
                    height: 'auto'
                  }}
                  src={MailIcon}
                  alt="metamask-logo"
                />
              </div>
            </button>
          )}
          <hr />
          <button
            className={`btn btn-${primaryColor === '#dedede' ? 'dark' : 'light'}`}
            style={{
              width: '270px'
            }}
            onClick={() => connectUserData()}>
            <img
              style={{
                width: '40px',
                height: 'auto'
              }}
              src={metaMaskIcon}
              alt="metamask-logo"
            />
          </button>
          <div>For native Web3 users</div>

          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '25px',
                width: '400px',
                marginBottom: '20px'
              }}>
              Welcome to RAIRprotocol
            </h2>
          </div>
          <div>Step 1. Login with socials or Metamask</div>
          <div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Step 2. Mint free License by clicking "Buy". Gas sponsored is 100%
            free. Or you can pay your own gas and mint more.
          </div>
          <div>Step 3. Deploy your own dApp using your new access NFT!</div>
          <div>Learn more @ github.com/rairprotocol</div>
        </div>
      ) : (
        <>
          <div className="main-wrapper">
            <div className="col-12 mt-3 row">
              <div className={'mock-up-page-wrapper'}>
                <MainBanner mainBannerInfo={mainBannerInfo} />
                <div
                  style={{
                    position: 'absolute'
                  }}>
                  {tokenData && (
                    <TitleCollection
                      title={mainBannerInfo.collectionName}
                      someUsersData={mainBannerInfo.user}
                      mainBannerInfo={mainBannerInfo}
                      userName={mainBannerInfo.user.publicAddress}
                      offerDataCol={offerDataInfo}
                      showOnlyMintButton={true}
                    />
                  )}
                </div>
              </div>
              <div className={'mock-up-page-wrapper'}>
                {tokenData && (
                  <div
                    className="wrapper-collection"
                    style={{
                      width: '1200px',
                      padding: '0rem 2rem'
                    }}>
                    <TitleCollection
                      title={mainBannerInfo.collectionName}
                      someUsersData={mainBannerInfo.user}
                      userName={mainBannerInfo.user.publicAddress}
                      mainBannerInfo={mainBannerInfo}
                      offerDataCol={offerDataInfo}
                      // toggleMetadataFilter={toggleMetadataFilter}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div></div>
    </div>
  );
};

export default SimpleDApp;
