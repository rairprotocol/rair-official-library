//@ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks/useReduxHooks';
import { rairSDK } from '../../common/rairSDK';

import './GameMenu.css';

interface GameMenuProps {
  onStartGame: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  onStartGame,
  onFinish,
  coinCount
}) => {
  const { adminRights, superAdmin, isLoggedIn, loginStatus } = useAppSelector(
    (store) => store.user
  );
  const [login, setLogin] = useState(false);
  const { currentUserAddress } = useAppSelector((store) => store.web3);

  const getScore = useCallback(async () => {
    if (currentUserAddress) {
      const score = await rairSDK.users.getUserValue({
        userAddress: currentUserAddress,
        namespace: 'coin-game',
        label: 'score'
      });
    }
  }, [currentUserAddress]);

  const setScore = useCallback(async () => {
    if (currentUserAddress && onFinish) {
      const score = await rairSDK.users.setUserValue({
        userAddress: currentUserAddress,
        namespace: 'coin-game',
        label: 'score',
        value: coinCount.toString()
      });
      console.info(score, 'score');
    }
  }, [currentUserAddress, onFinish, coinCount]);

  useEffect(() => {
    setScore();
  }, [setScore]);

  useEffect(() => {
    getScore();
  }, [getScore]);

  return (
    <div className="game-menu">
      <div className="menu-container">
        <h1 className="game-title">RAIR Game</h1>
        <button
          disabled={!isLoggedIn}
          className="play-button"
          onClick={onStartGame}>
          {isLoggedIn ? `${onFinish ? 'Play again' : 'Play'}` : 'Please login'}
        </button>
        {onFinish ? (
          <div className="game-instructions">
            <h2>Game Finished!</h2>
            <div>You collected {coinCount} coins</div>
          </div>
        ) : (
          <div className="game-instructions">
            <h2>How to Play</h2>
            <ul>
              <li>Use WASD or arrow keys to move</li>
              <li>Collect coins to increase your score</li>
              <li>Press E to interact with draggable objects</li>
              <li>Find the portal to advance to the next level</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameMenu;
