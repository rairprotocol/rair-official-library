import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IOffersResponseType, TNftItemResponse } from '../../axios.responseTypes';
import { RootState } from '../../ducks';
import { ColorStoreType } from '../../ducks/colors/colorStore.types';
import { setChainId } from '../../ducks/contracts/actions';
import { TUsersInitialState } from '../../ducks/users/users.types';
import useConnectUser from '../../hooks/useConnectUser';
import { rFetch } from '../../utils/rFetch';
import { ContractType } from '../adminViews/adminView.types';
import useServerSettings from '../adminViews/useServerSettings';
import { OnboardingButton } from '../common/OnboardingButton/OnboardingButton';
import { TOfferType } from '../marketplace/marketplace.types';
import MainBanner from '../MockUpPage/MainBanner/MainBanner';
import TitleCollection from '../MockUpPage/NftList/NftData/TitleCollection/TitleCollection';

const SimpleDApp = () => {
    const { connectUserData, logoutUser } = useConnectUser();
    const dispatch = useDispatch();
    const [mainBannerInfo, setMainBannerInfo] = useState<any>(undefined);
    const [offerDataInfo, setOfferDataInfo] = useState<TOfferType[]>();
    const [metamaskInstalled, setMetamaskInstalled] = useState(false);
    const [tokenData, setTokenData] = useState<any>();
    const {blockchainSettings} = useServerSettings();
    const [contractData, setContractData] = useState<ContractType>();
    const {
        primaryColor,
        primaryButtonColor,
        textColor,
      } = useSelector<RootState, ColorStoreType>((store) => store.colorStore);
      const {loggedIn, loginProcess } = useSelector<
        RootState,
        TUsersInitialState
      >((store) => store.userStore);

      const checkMetamask = useCallback(() => {
        // @ts-ignore
        setMetamaskInstalled(window?.ethereum && window?.ethereum?.isMetaMask);
        
      }, [setMetamaskInstalled]);

      const getContractInfo = useCallback(async () => {
        if (mainBannerInfo && mainBannerInfo.blockchain && mainBannerInfo.contract) {
          const response = await rFetch(
            `/api/contracts/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}`
          );
    
          if (response.success) {
            setContractData(response.contract);
          }
        }
      }, [mainBannerInfo]);

      const getAllProduct = useCallback(
        async () => {
    
         if(mainBannerInfo && mainBannerInfo.blockchain && mainBannerInfo.product && mainBannerInfo.contract) {
            let responseAllProduct;
            responseAllProduct = await axios.get<TNftItemResponse>(
              `/api/nft/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}`
            );
    
          const tokenMapping = {};
          if (responseAllProduct.data.success && responseAllProduct.data.result) {
            responseAllProduct.data.result.tokens.forEach((item) => {
              tokenMapping[item.token] = item;
            });
          }
    
        setTokenData(tokenMapping)
         }
        },
        [mainBannerInfo]
      );

      useEffect(() => {
        getContractInfo();
      }, [getContractInfo])

      useEffect(() => {
        checkMetamask();
      }, [checkMetamask]);




      const getCollectionBanner = async () => {
        const response = await rFetch(`/api/settings/featured`);
        if (response.success) {
          setMainBannerInfo(response.data);
        }
      };


      const getParticularOffer = useCallback(async () => {
        try {
         if(mainBannerInfo && mainBannerInfo.blockchain && mainBannerInfo.product && mainBannerInfo.contract) {
            const response = await axios.get<IOffersResponseType>(
                `/api/nft/network/${mainBannerInfo.blockchain}/${mainBannerInfo.contract}/${mainBannerInfo.product}/offers`
              );
              if (response.data.success) {
                setOfferDataInfo(response.data.product.offers);
         }
          }
        } catch (err) {
          const error = err as AxiosError;
          console.error(error?.message);
        }
      }, [mainBannerInfo]);

      useEffect(() => {
        getAllProduct();
      }, [getAllProduct])

      useEffect(() => {
        getParticularOffer();
      }, [getParticularOffer]);
    
    
      useEffect(() => {
        getCollectionBanner();
      }, []);



      useEffect(() => {
        if (window.ethereum) {
          const foo = async (chainId) => {
            dispatch(setChainId(chainId, blockchainSettings));
          };
          window.ethereum.on('chainChanged', foo);
          window.ethereum.on('accountsChanged', logoutUser);
          return () => {
            window.ethereum.off('chainChanged', foo);
            window.ethereum.off('accountsChanged', logoutUser);
          };
        }
      }, [dispatch, logoutUser, blockchainSettings]);
  return (
    <div>
    {!loggedIn && (
            <div>
                <>
              <div style={{
                fontSize: "35px"
              }}>Please select a login method</div>
              <hr />
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
                    fontSize: "18px"
                  }}
                  onClick={() => connectUserData('metamask')}
                  >
                  Connect
                </button>
              )}
              <hr />
              <button
                className="btn btn-light"
                onClick={() => connectUserData('web3auth')}
                >
                Social Logins
              </button>
              <div className="login-modal-down-text">
                <div>Each social login creates a unique wallet address</div>
                <div>
                  If you login with a different account, you won’t see purchases
                  in your other wallets
                </div>
              </div>
            </>
                {/* <button
                    className="btn rair-button btn-connect-wallet"
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
                    width: "300px",
                    height: "80px",
                    fontSize: "22px",
                    borderRadius: "12px",
                    color: textColor
                    }}
                    onClick={() => connectUserData()}>
                    {loginProcess ? 'Please wait...' : 'Connect'}
                </button> */}
    </div>
    )}
   {loggedIn && <div className="main-wrapper">
      <div className="col-12 mt-3 row">
        <div className={'mock-up-page-wrapper'}>
                <MainBanner mainBannerInfo={mainBannerInfo} />
                <div style={{
                    position:"absolute"
                }}>
                {tokenData && <TitleCollection
             selectedData={tokenData[0]?.metadata}
             title={mainBannerInfo.collectionName}
             someUsersData={mainBannerInfo.user}
             userName={mainBannerInfo.user.publicAddress}
             mainBannerInfo={mainBannerInfo}
             offerDataCol={offerDataInfo}
             showOnlyMintButton
             // toggleMetadataFilter={toggleMetadataFilter}
       />}
                </div>
        </div>
            
        <div className={'mock-up-page-wrapper'}>
           {tokenData  &&

            <div
           className="wrapper-collection" style={{
            width: "1200px",
            padding: "0rem 2rem"
           }}>
             <TitleCollection
             selectedData={tokenData[0]?.metadata}
             title={mainBannerInfo.collectionName}
             someUsersData={mainBannerInfo.user}
             userName={mainBannerInfo.user.publicAddress}
             mainBannerInfo={mainBannerInfo}
             offerDataCol={offerDataInfo}
             // toggleMetadataFilter={toggleMetadataFilter}
       />
       </div>
       
           }
           </div>
      </div>
    </div>}
    </div>
  )
}

export default SimpleDApp