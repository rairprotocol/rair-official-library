//@ts-nocheck
import {
  EquirectangularReflectionMapping,
  LinearMipMapLinearFilter,
  NearestFilter,
  sRGBEncoding,
  TextureLoader
} from 'three';
import GifLoader from 'three-gif-loader';

import bombImg from '../images/bomb.gif';
import chestImg from '../images/chest.png';
import coinImg from '../images/coin.gif';
import orbImg from '../images/orb.gif';
import playerDown from '../images/playerDown.gif';
import playerIdle from '../images/playerIdle.gif';
import playerLeft from '../images/playerLeft.gif';
import playerRight from '../images/playerRight.gif';
import playerUp from '../images/playerUp.gif';
import wallImg from '../images/wall.jpg';

const gifLoader = new GifLoader();
const pngLoader = new TextureLoader();

function imgLoader(path, type) {
  let image;

  if (type === 'gif') {
    image = gifLoader.load(path);
  } else {
    image = pngLoader.load(path);
  }

  image.encoding = sRGBEncoding;
  image.mapping = EquirectangularReflectionMapping;
  image.magFilter = NearestFilter;
  image.minFilter = LinearMipMapLinearFilter;

  return image;
}

const wood = imgLoader(wallImg, 'png');
const playerUpMovement = imgLoader(playerUp, 'gif');
const playerDownMovement = imgLoader(playerDown, 'gif');
const playerRightMovement = imgLoader(playerRight, 'gif');
const playerLeftMovement = imgLoader(playerLeft, 'gif');
const playerIdleMovement = imgLoader(playerIdle, 'gif');
const coin = imgLoader(coinImg, 'gif');
const chest = imgLoader(chestImg, 'png');
const orb = imgLoader(orbImg, 'gif');
const bomb = imgLoader(bombImg, 'gif');

export {
  bomb,
  chest,
  coin,
  orb,
  playerDownMovement,
  playerIdleMovement,
  playerLeftMovement,
  playerRightMovement,
  playerUpMovement,
  wood
};
