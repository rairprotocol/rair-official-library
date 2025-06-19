//@ts-nocheck
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import GameMenu from './components/GameMenu';
import PhysicalMovements from './components/PhysicalMovements';
import FourthLevel from './levels/FourthLevel';
import SampleLevel from './levels/SampleLevel';
import SecondLevel from './levels/SecondLevel';
import ThirdLevel from './levels/ThirdLevel';

import './index.css';

function Loader() {
  const { progress } = useProgress();
  return <div>loading {progress.toFixed()} %</div>;
}

const ThreeGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coinCount, setCoinCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [onFinish, setOnFinish] = useState(false);

  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return (
          <SampleLevel
            onLevelComplete={() => setCurrentLevel(2)}
            onCoinCollect={() => setCoinCount((prev) => prev + 1)}
          />
        );
      case 2:
        return (
          <SecondLevel
            onCoinCollect={() => setCoinCount((prev) => prev + 1)}
            onLevelComplete={() => setCurrentLevel(3)}
          />
        );

      case 3:
        return (
          <ThirdLevel
            onCoinCollect={() => setCoinCount((prev) => prev + 1)}
            onLevelComplete={() => setCurrentLevel(4)}
          />
        );

      case 4:
        return (
          <FourthLevel
            onCoinCollect={() => setCoinCount((prev) => prev + 1)}
            setOnFinish={setOnFinish}
          />
        );
      default:
        return (
          <SampleLevel
            onLevelComplete={() => setCurrentLevel(2)}
            onCoinCollect={() => setCoinCount((prev) => prev + 1)}
          />
        );
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted || onFinish) {
    return (
      <GameMenu
        onStartGame={handleStartGame}
        onFinish={onFinish}
        coinCount={coinCount}
      />
    );
  }

  return (
    <>
      <div className="coin-counter">Coins: {coinCount}</div>
      {/* <Loader /> */}
      <PhysicalMovements />
      <Canvas orthographic camera={{ zoom: 50, position: [0, 5, 0] }}>
        {renderLevel()}
      </Canvas>
    </>
  );
};

export default ThreeGame;
