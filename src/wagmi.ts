import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

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

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
