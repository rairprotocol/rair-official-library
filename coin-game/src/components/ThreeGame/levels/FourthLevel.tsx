//@ts-nocheck
import { useState, useMemo } from "react";
import { Stats } from "@react-three/drei";

import Plane from "../components/Plane";
import Player from "../components/Player";
import Object from "../components/Object";
import Coin from "../components/Coin";
import { mapDataString } from "../utils/mapDataString";
import { chest, orb } from "../utils/textureManager";

const mapData = mapDataString(`
    # # # # # # # # # # # # # # # # # # # # # #
    # · · · · C · · · · # · · C · · · · · · · #
    # · # # # # # · # · # · # # # # · # # # · #
    # · # · · · · · # · · · · · · · · · # · · #
    # · # · # # · # # · # # # · # # # · # · C #
    # · # · # C · · · · · C · · · # · · # · · #
    # · · · · · · # # # # # # · · # · · · · · #
    # · # · # # · · · · · # · · · # # # # # · #
    # · # · # · · # # # · # · · · · · · · # · #
    # · # · # · C · · · · · C · · # # # · # · #
    # · # · # # # # # # # # # · # · · # · # · #
    # · · · · · · · · · · · · # · C # · # · · #
    # · # # # # # · # # # · # # · # # · # # · #
    # C · · · · # · · · # · · · · · · · · T · #
    # · # # · # # · # · # # · # # # # # · # # #
    # · · · · · C · # · · · · · · C · · · · · #
    # # # # # # # # # # # # # # # # # # # # # #
    `);

const resolveMapTile = (type, x, y, mapData, setCurrentMap, onCoinCollect) => {
  const key = `${x}-${y}`;

  switch (type) {
    case "#":
      return (
        <Object
          key={key}
          position={[x, 0.5, y]}
          type="Static"
          name="Blocking"
        />
      );
    case "T":
      return (
        <Object
          key={key}
          position={[x, 0.5, y]}
          texture={chest}
          name="Draggable"
        />
      );
    case "C":
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

const FourthLevel = ({ onCoinCollect }) => {
  const [colour, setColour] = useState("#a855f7");
  const [currentMap, setCurrentMap] = useState(mapData);

  const memoizedMapData = useMemo(() => {
    return currentMap.map((row, y) =>
      row.map((type, x) => resolveMapTile(type, x, y, mapData, setCurrentMap, onCoinCollect))
    );
  }, [currentMap, onCoinCollect]);

  return (
    <>
      <Player startPosition={[1, 0.5, 1]} />
      <Plane position={[0, 0, 0]} colour={colour} />
      {memoizedMapData}
      
      {/* Decorative lights */}
      <Object position={[5, 0.5, 5]} texture={orb} />
      
      <Object position={[12, 0.5, 5]} texture={orb} />

      {/* Portal light to next level */}
      <rectAreaLight
        position={[10, 1, 12.5]}
        intensity={20}
        width={2}
        height={2}
        color="#3b82f6"
        name="Portal"
      />
    </>
  );
};

export default FourthLevel; 