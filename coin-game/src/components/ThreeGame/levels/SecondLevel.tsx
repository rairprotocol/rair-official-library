// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import Coin from '../components/Coin';
import Object from '../components/Object';
import Plane from '../components/Plane';
import Player from '../components/Player';
import { calcDistance } from '../utils/calcDistance';
import { mapDataString } from '../utils/mapDataString';
import { chest, orb } from '../utils/textureManager';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · C · · · · · · · · · · C · · #
# · · # # # · · · · · # # # · · #
# · · # · · · · T · · · · # · · #
# · · # · · · · · · · · · # · · #
# · · · · · · · · · · · · · · · #
# · · · · · C · · · C · · · · · #
# · · # · · · · · · · · · # · · #
# · · # · · · · · · · · · # · · #
# · C # · · · · · · · · · # C · #
# · · # # # · · · · · # # # · · #
# · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # #
`);

const resolveMapTile = (type, x, y, mapData, setCurrentMap, onCoinCollect) => {
  const key = `${x}-${y}`;

  switch (type) {
    case '#':
      return (
        <Object
          key={key}
          position={[x, 0.5, y]}
          type="Static"
          name="Blocking"
        />
      );
    case 'T':
      return (
        <Object
          key={key}
          position={[x, 0.5, y]}
          texture={chest}
          name="Draggable"
        />
      );
    case 'C':
      return (
        <Coin
          key={key}
          position={[x, 0.5, y]}
          mapData={mapData}
          setCurrentMap={setCurrentMap}
          type={type}
          onCollect={onCoinCollect}
        />
      );
    default:
      return null;
  }
};

const SecondLevel = ({ onCoinCollect, onLevelComplete }) => {
  const [colour, setColour] = useState('#2E8B57');
  const [currentMap, setCurrentMap] = useState(mapData);

  const { scene } = useThree();

  useEffect(() => {
    const checkPortalCollision = () => {
      const player = scene.children.find((child) => child.name === 'Player');
      const portal = scene.children.find((child) => child.name === 'Portal');

      if (player && portal) {
        const distance = calcDistance(player.position, portal.position);
        if (distance < 2) {
          console.log('Portal reached!');
          onLevelComplete();
        }
      }
    };

    const interval = setInterval(checkPortalCollision, 100);
    return () => clearInterval(interval);
  }, [scene, onLevelComplete]);

  const memoizedMapData = useMemo(() => {
    return currentMap.map((row, y) =>
      row.map((type, x) =>
        resolveMapTile(type, x, y, mapData, setCurrentMap, onCoinCollect)
      )
    );
  }, [currentMap, onCoinCollect]);

  return (
    <>
      <Player />
      <Plane position={[0, 0, 0]} colour={colour} />
      {memoizedMapData}

      {/* Decorative lights */}
      <Object position={[5, 0.5, 5]} texture={orb} />

      <Object position={[12, 0.5, 5]} texture={orb} />

      {/* Portal light to next level */}

      <rectAreaLight
        position={[15.5, 1, 11]}
        intensity={10}
        width={2}
        height={2}
        rotation={[0, 20.4, 0]}
        color="yellow"
        name="Portal"
      />
    </>
  );
};

export default SecondLevel;
