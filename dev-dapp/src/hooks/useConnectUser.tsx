//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Action } from "@reduxjs/toolkit";
import axios from "axios";
import { Hex } from "viem";

import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import useServerSettings from "./useServerSettings";
import useSwal from "./useSwal";

import { OnboardingButton } from "../components/common/OnboardingButton/OnboardingButton";
import { dataStatuses } from "../redux/commonTypes";
import { loadCurrentUser } from "../redux/userSlice";
import {
  connectChainMetamask,
  connectChainWeb3Auth,
  setConnectedChain,
  setExchangeRates,
  setProgrammaticProvider,
} from "../redux/web3Slice";
import { CombinedBlockchainData } from "../types/commonTypes";
import { User } from "../types/databaseTypes";
import chainData from "../utils/blockchainData";
import {
  rFetch,
  signWeb3MessageMetamask,
  signWeb3MessageWeb3Auth,
} from "../utils/rFetch";
import sockets from "../utils/sockets";
import { rairSDK } from "../components/common/rairSDK";

const getCoingeckoRates = async () => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${Object.keys(
        chainData
      )
        .filter((chain) => chainData[chain].coingecko)
        .map((chain) => chainData[chain].coingecko)
        .join(",")}&vs_currencies=usd`
    );
    if (data) {
      const rateData = {};
      Object.keys(chainData).forEach((chain) => {
        if (chainData[chain].coingecko) {
          rateData[chain] = data[chainData[chain].coingecko].usd;
        } else {
          rateData[chain] = 0;
        }
      });
      return rateData;
    }
  } catch (err) {
    console.error("Error querying CoinGecko rates", err);
  }
};

const useConnectUser = () => {
  const dispatch = useAppDispatch();
  const { getBlockchainData } = useServerSettings();
  const { adminRights, loginStatus, isLoggedIn } = useAppSelector(
    (store) => store.user
  );
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  const { currentUserAddress, programmaticProvider, connectedChain } =
    useAppSelector((store) => store.web3);

  const { textColor, primaryButtonColor, primaryColor } = useAppSelector(
    (store) => store.colors
  );

  const hotdropsVar = import.meta.env.VITE_TESTNET;

  const reactSwal = useSwal();
  const navigate = useNavigate();

  const checkMetamask = useCallback(() => {
    setMetamaskInstalled(window?.ethereum && window?.ethereum?.isMetaMask);
  }, [setMetamaskInstalled]);

  useEffect(() => {
    if (currentUserAddress) {
      sockets.nodeSocket.on("connect", () => {
        sockets.nodeSocket.emit("login", currentUserAddress.toLowerCase());
      });
    }
    return () => {
      sockets.nodeSocket.off("connect");
    };
  }, [currentUserAddress]);

  const loginWithWeb3Auth = useCallback(async () => {
    const defaultChain: Hex = import.meta.env.VITE_DEFAULT_BLOCKCHAIN;
    const chainInformation = getBlockchainData(defaultChain);
    if (
      !chainInformation?.hash ||
      !chainInformation?.alchemy ||
      !chainInformation?.viem ||
      !chainInformation?.alchemyAppKey
    ) {
      return {};
    }

    reactSwal.fire({
      title: "Connecting",
      html: "Please wait",
      icon: "info",
      showConfirmButton: false,
    });

    const { connectedChain, currentUserAddress, userDetails } = await dispatch(
      connectChainWeb3Auth(chainInformation as CombinedBlockchainData)
    ).unwrap();

    return {
      userAddress: currentUserAddress,
      blockchain: connectedChain,
      userDetails,
    };
  }, [getBlockchainData, reactSwal, dispatch]);

  const loginWithMetamask = useCallback(async () => {
    const { connectedChain, currentUserAddress } = await dispatch(
      connectChainMetamask()
    ).unwrap();
    if (!currentUserAddress) {
      return {};
    }
    return {
      userAddress: currentUserAddress,
      blockchain: connectedChain,
    };
  }, [dispatch]);

  const loginWithProgrammaticProvider = useCallback(async () => {
    if (!programmaticProvider) {
      return {};
    }
    return {
      userAddress: (await programmaticProvider.getAddress()) as Hex,
      blockchain: connectedChain,
    };
  }, [connectedChain, programmaticProvider]);

  const selectMethod = useCallback(
    () =>
      new Promise((resolve: (value: string) => void) => {
        reactSwal.fire({
          title: `Welcome to ${hotdropsVar === "true" ? "HOTDROPS" : "RAIR"}`,
          html: (
            <>
              Please select a login method
              <hr />
              {!metamaskInstalled ? (
                <OnboardingButton />
              ) : (
                <button
                  className="btn rair-button"
                  style={{
                    background: `${
                      primaryColor === "#dedede"
                        ? import.meta.env.VITE_TESTNET === "true"
                          ? "var(--hot-drops)"
                          : "linear-gradient(to right, #e882d5, #725bdb)"
                        : import.meta.env.VITE_TESTNET === "true"
                          ? primaryButtonColor ===
                            "linear-gradient(to right, #e882d5, #725bdb)"
                            ? "var(--hot-drops)"
                            : primaryButtonColor
                          : primaryButtonColor
                    }`,
                    color: textColor,
                  }}
                  onClick={() => resolve("metamask")}
                >
                  Web3
                </button>
              )}
              <hr />
              <button
                className="btn btn-light"
                onClick={() => resolve("web3auth")}
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
          ),
          showConfirmButton: false,
        });
        // .then((result) => {
        //   if (result.isDismissed) {
        //     dispatch(setLoginProcessStatus(false));
        //   }
        // });
      }),
    [
      hotdropsVar,
      metamaskInstalled,
      reactSwal,
      primaryButtonColor,
      textColor,
      primaryColor,
    ]
  );

  const connectUserData = useCallback(async () => {
    let loginData: {
      userAddress?: Hex;
      blockchain?: Hex;
      userDetails?: any;
    };
    const dispatchStack: Array<Action> = [];
    const loginMethod: string = await selectMethod();
    reactSwal.close();
    try {
      switch (loginMethod) {
        case "web3auth":
          loginData = await loginWithWeb3Auth();
          break;
        case "metamask":
          loginData = await loginWithMetamask();
          break;
        case "programmatic":
          loginData = await loginWithProgrammaticProvider();
          break;
        default:
          reactSwal.fire({
            title: "Please install a Crypto wallet",
            html: (
              <div>
                <OnboardingButton />
              </div>
            ),
            icon: "error",
          });
          return;
      }
    } catch (err) {
      console.error("Login error", err);
      return;
    }
    if (!loginData?.userAddress) {
      reactSwal.fire("Error", "No user address found", "error");
      return;
    }

    dispatchStack.push(setExchangeRates(await getCoingeckoRates()));
    dispatchStack.push(setConnectedChain(loginData.blockchain));

    let firstTimeLogin = false;

    try {
      // Check if user exists in DB
      const userDataResponse = await rairSDK.users.findUserByUserAddress({
        publicAddress: loginData.userAddress,
      });

      let user = userDataResponse.user;
      if (!userDataResponse.user || !user) {
        // If the user doesn't exist, send a request to register him using a TEMP adminNFT
        firstTimeLogin = true;
        const userCreation = await rairSDK.users.createUser({
          publicAddress: loginData.userAddress,
        });
        user = userCreation.user;
      }

      // Authorize user
      if (
        adminRights === null ||
        adminRights === undefined ||
        !currentUserAddress
      ) {
        let loginResponse;
        switch (loginMethod) {
          case "programmatic":
            console.error("Programmatic support not available");
            break;
          case "metamask":
            loginResponse = await signWeb3MessageMetamask(
              loginData.userAddress
            );
            break;
          case "web3auth":
            loginResponse = await signWeb3MessageWeb3Auth(
              loginData.userAddress
            );
            reactSwal.close();
            if (firstTimeLogin) {
              const userData = await loginData.userDetails;
              const availableData: Partial<User> = {};
              if (userData.email) {
                availableData.email = userData.email;
                availableData.nickName = userData.email?.split("@")?.[0];
              }
              if (userData.name && !userData.name.includes("@")) {
                availableData.firstName = userData.name.split(" ")?.[0];
                availableData.lastName = userData.name.split(" ")?.[0];
              }
              const newUserResponse = await axios.patch(
                `/api/users/${loginData.userAddress.toLowerCase()}`,
                availableData
              );
              user = newUserResponse.data.user;
            }
            //  provider.accountProvider.signTypedData
            break;
        }
        dispatch(loadCurrentUser());
        if (loginResponse.success) {
          dispatchStack.forEach((dispatchItem) => {
            dispatch(dispatchItem);
          });
          sockets.nodeSocket.connect();
        }
      }
    } catch (err) {
      console.error("Error on login", err);
    }
  }, [
    selectMethod,
    loginWithMetamask,
    loginWithProgrammaticProvider,
    loginWithWeb3Auth,
    reactSwal,
    adminRights,
    currentUserAddress,
    dispatch,
  ]);

  useEffect(() => {
    checkMetamask();
  }, [checkMetamask]);

  const logoutUser = useCallback(async () => {
    const { success } = await rFetch("/api/auth/logout");
    if (success) {
      dispatch(loadCurrentUser());
      sockets.nodeSocket.emit("logout", currentUserAddress?.toLowerCase());
      sockets.nodeSocket.disconnect();
      dispatch(setProgrammaticProvider(undefined));
      dispatch(setConnectedChain(import.meta.env.VITE_DEFAULT_BLOCKCHAIN));
      navigate("/");
    }
  }, [dispatch, navigate, currentUserAddress]);

  const checkLoginOnStart = useCallback(async () => {
    if (isLoggedIn || loginStatus !== dataStatuses.Uninitialized) {
      return;
    }
    const userData = await dispatch(loadCurrentUser()).unwrap();
    switch (userData?.loginType) {
      case "metamask":
        if (window.ethereum.selectedAddress !== userData.publicAddress) {
          return await logoutUser();
        }
        dispatch(setExchangeRates(await getCoingeckoRates()));
        dispatch(connectChainMetamask());
        break;
      default:
        logoutUser();
        break;
    }
  }, [dispatch, isLoggedIn, loginStatus, logoutUser]);

  useEffect(() => {
    checkLoginOnStart();
  }, []);

  return {
    connectUserData,
    logoutUser,
  };
};

export default useConnectUser;
