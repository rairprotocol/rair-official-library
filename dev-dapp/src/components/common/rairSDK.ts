import { RairSDK } from "@rair-protocol/sdk";

const settings = {
  serverURL: "http://localhost:3002",
};

export const rairSDK = new RairSDK(settings);
