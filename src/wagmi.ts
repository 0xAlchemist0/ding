import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { createPublicClient, createWalletClient, custom } from "viem";

import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
export const config = createConfig({
  chains: [base, mainnet],
  connectors: [farcasterMiniApp()],
  transports: {
    [base.id]: http("https://base.llamarpc.com"),
    [mainnet.id]: http(),
  },
});
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://base.llamarpc.com"),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
