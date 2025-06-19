// @ts-nocheck
import React, { useEffect, useRef } from 'react';

import { bomb } from './../utils/textureManager';

const ChestExplosion = ({ position = [0, 0, 0], onFinish }) => {
  const ref = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish?.();
    }, 600); // длительность взрыва, можно настроить
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshStandardMaterial
        transparent
        map={bomb || null}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
};

export default ChestExplosion;
