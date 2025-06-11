import { RairSDK } from '@rair-protocol/sdk';

const settings = {
  serverURL: import.meta.env.VITE_BACKEND_URL || window.location.origin
};

export const rairSDK = new RairSDK(settings);
