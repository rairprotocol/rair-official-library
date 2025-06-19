//@ts-nocheck
import { useEffect, useState } from 'react';

function actionByValue(key) {
  const value = 10;
  const keys = {
    moveForward: -value,
    moveBackward: value,
    moveLeft: -value,
    moveRight: value,
    action: value
  };
  return keys[key];
}

function actionByKey(key) {
  const keys = {
    KeyW: 'moveForward',
    ArrowUp: 'moveForward',

    KeyS: 'moveBackward',
    ArrowDown: 'moveBackward',

    KeyA: 'moveLeft',
    ArrowLeft: 'moveLeft',

    KeyD: 'moveRight',
    ArrowRight: 'moveRight',

    KeyE: 'action',
    Enter: 'action'
  };

  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: 0,
    moveBackward: 0,
    moveLeft: 0,
    moveRight: 0,
    action: 0,
    lastMovement: null
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        e.preventDefault();
      }

      const action = actionByKey(e.code);
      if (action) {
        setMovement((state) => ({
          ...state,
          [action]: actionByValue(action),
          lastMovement: action
        }));
      }
    };

    const handleKeyUp = (e) => {
      const action = actionByKey(e.code);
      if (action) {
        setMovement((state) => ({
          ...state,
          [action]: 0
        }));
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
