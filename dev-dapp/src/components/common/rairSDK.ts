import { RairSDK } from "@rair-protocol/sdk";

const settings = {
  serverURL: import.meta.env.VITE_SDK_MAIN_URL,
};

export const rairSDK = new RairSDK(settings);
