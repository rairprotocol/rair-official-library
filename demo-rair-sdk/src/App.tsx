import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary, withSentryReactRouterV6Routing } from "@sentry/react";

import AboutPageNew from "./components/AboutPage/AboutPageNew/AboutPageNew";
import Footer from "./components/Footer/Footer";
import MainHeader from "./components/Header/MainHeader";
import NotFound from "./components/NotFound/NotFound";
import useConnectUser from "./hooks/useConnectUser";
import { useAppDispatch, useAppSelector } from "./hooks/useReduxHooks";
import { loadCategories, loadSettings } from "./redux/settingsSlice";
import { setConnectedChain } from "./redux/web3Slice";
import {
  AppContainerFluid,
  MainBlockApp,
} from "./styled-components/nft/AppContainer";
import { detectBlockchain } from "./utils/blockchainData";
import ErrorFallback from "./views/ErrorFallback/ErrorFallback";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Home";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import ServerSettings from "./components/ServerSettings/index";
import LicenseExchange from "./components/adminViews/LicenseExchange";
import ImportAndTransfer from "./components/adminViews/ImportAndTransfer";
import VideoManager from "./components/videoManager/VideoManager";
import MinterMarketplace from "./components/marketplace/MinterMarketplace";

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

function App() {
  const dispatch = useAppDispatch();
  const { blockchainSettings } = useAppSelector((store) => store.settings);
  const [renderBtnConnect, setRenderBtnConnect] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [isSplashPage, setIsSplashPage] = useState(false);
  const [isIframePage, setIsIframePage] = useState<boolean>(false);
  const {
    connectedChain,
    requestedChain,
    currentUserAddress,
    programmaticProvider,
  } = useAppSelector((store) => store.web3);
  const [isAboutPage, setIsAboutPage] = useState<boolean>(false);
  const { realNameChain } = detectBlockchain(connectedChain, requestedChain);
  const [tabIndexItems, setTabIndexItems] = useState(0);
  const [tokenNumber, setTokenNumber] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const { adminRights, isLoggedIn } = useAppSelector((store) => store.user);

  // Redux
  const {
    primaryColor,
    textColor,
    backgroundImage,
    backgroundImageEffect,
    isDarkMode,
  } = useAppSelector((store) => store.colors);

  const { logoutUser } = useConnectUser();

  const goHome = () => {
    navigate("/");
    sessionStorage.removeItem("CategoryItems");
    sessionStorage.removeItem("BlockchainItems");
  };

  useEffect(() => {
    if (window.ethereum) {
      const foo = async (chainId) => {
        dispatch(setConnectedChain(chainId));
      };
      window.ethereum.on("chainChanged", foo);
      window.ethereum.on("accountsChanged", logoutUser);
      return () => {
        window.ethereum.off("chainChanged", foo);
        window.ethereum.off("accountsChanged", logoutUser);
      };
    }
  }, [dispatch, logoutUser, blockchainSettings]);

  useEffect(() => {
    if (isDarkMode) {
      (function () {
        let angle = 0;
        const p = document.querySelector("p");
        if (p?.textContent) {
          const text = p.textContent.split("");
          // eslint-disable-next-line no-var
          var len = text.length;
          // eslint-disable-next-line no-var
          var phaseJump = 360 / len;
          // eslint-disable-next-line no-var
          var spans;
          p.innerHTML = text
            .map(function (char) {
              return "<span>" + char + "</span>";
            })
            .join("");

          spans = p.children;
        } else return;

        (function wheee() {
          for (let i = 0; i < len; i++) {
            spans[i].style.color =
              "hsl(" + (angle + Math.floor(i * phaseJump)) + ", 55%, 70%)";
          }
          angle++;
          requestAnimationFrame(wheee);
        })();
      })();
    }
  }, [isDarkMode]);

  const creatorViewsDisabled =
    import.meta.env.VITE_DISABLE_CREATOR_VIEWS === "true";

  useEffect(() => {
    dispatch(loadSettings());
    dispatch(loadCategories());
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AppContainerFluid
        id="App"
        className={`App p-0 container-fluid`}
        backgroundImageEffect={backgroundImageEffect}
        isDarkMode={isDarkMode}
        textColor={textColor}
        primaryColor={primaryColor}
        backgroundImage={backgroundImage}
      >
        <div className="row w-100 m-0 p-0">
          <MainHeader
            goHome={goHome}
            renderBtnConnect={renderBtnConnect}
            creatorViewsDisabled={creatorViewsDisabled}
            showAlert={showAlert}
            isSplashPage={isSplashPage}
            realChainId={realNameChain && requestedChain}
            setTabIndexItems={setTabIndexItems}
            isAboutPage={isAboutPage}
            setTokenNumber={setTokenNumber}
          />
          <MainBlockApp isSplashPage={isSplashPage} showAlert={showAlert}>
            <div className="col-12 blockchain-switcher" />
            <div className="col-12 mt-3">
              <SentryRoutes>
                {[
                  /*
                      If the home page isn't the default '/', it won't show the
                        'Digital Ownership Encryption' message
                    */
                  {
                    path: "/",
                    content: <Home />,
                    requirement: import.meta.env.VITE_HOME_PAGE === "/",
                  },
                  {
                    path: "/:userAddress",
                    content: <UserProfilePage />,
                  },
                  {
                    path: "/about-page",
                    content: (
                      <AboutPageNew
                        {...{
                          setIsSplashPage,
                        }}
                      />
                    ),
                  },
                  {
                    path: "/user/videos",
                    content: <VideoManager />,
                  },
                  // Server Settings view
                  {
                    path: "/admin/settings",
                    content: <ServerSettings />,
                    requirement:
                      isLoggedIn && !creatorViewsDisabled && adminRights,
                  },
                  // License UI
                  {
                    path: "/license",
                    content: <LicenseExchange />,
                    requirement: isLoggedIn && !creatorViewsDisabled,
                  },
                  // Token transfers
                  {
                    path: "/admin/transferNFTs",
                    content: <ImportAndTransfer />,
                    constraint: isLoggedIn && !creatorViewsDisabled,
                  },
                  // Old Creator UI (Using the Database)
                  {
                    path: "/on-sale",
                    content: <MinterMarketplace />,
                    requirement: isLoggedIn && !creatorViewsDisabled,
                  },
                  {
                    path: "*",
                    content: <NotFound />,
                  },
                  {
                    path: "/404",
                    content: <NotFound />,
                  },
                ].map((item, index) => {
                  // If the requirements for the route aren't met, it won't return anything
                  if (item.requirement !== undefined && !item.requirement) {
                    return <Fragment key={Math.random() + index}></Fragment>;
                  }
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={item.content}
                    />
                  );
                })}
              </SentryRoutes>
            </div>
          </MainBlockApp>
        </div>
      </AppContainerFluid>
      {!isIframePage && <Footer isSplashPage={isSplashPage} />}
    </ErrorBoundary>
  );
}

export default App;
