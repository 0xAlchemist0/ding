import { readContract } from "@wagmi/core";
import lotteryABI from "../abi/lotteryABI";
import { config } from "../wagmi";
import contracts from "./contracts";
import { regulareToUint, uintToRegular } from "./solidity-conversions";
async function getDepositTier(amountUSD: any) {
  try {
    //converts to uint256
    const parsedUint = regulareToUint(amountUSD, "6");
    console.log("parsed: ", parsedUint);
    const tier = await readContract(config, {
      abi: lotteryABI,
      address: contracts.lottery,
      functionName: "getTier",
      args: [parsedUint],
    });
    const formattedTier = formatTierResponse(tier);
    console.log("Amount recieved in ding: ", tier);

    return formattedTier;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getUSDCollected() {
  try {
    const totalUSD = await readContract(config, {
      address: contracts.lottery,
      abi: lotteryABI,
      functionName: "totalUSD",
    });

    const formattedUsd = uintToRegular(String(totalUSD), "6");

    return formattedUsd;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTotalEntries() {
  try {
    const totalEntries = await readContract(config, {
      address: contracts.lottery,
      abi: lotteryABI,
      functionName: "totalEntries",
    });

    //no need for formatting this value already fine

    return Number(totalEntries);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// [ getTier(uint256) method Response ]
//   usdCost   uint256 :  1000000
//   dingMint   uint256 :  100000000000000000000
//   winChancePPM   uint256 :  4
//   winChancePercent   uint256 :  0

function formatTierResponse(tier: any) {
  try {
    let [usdCost, dingMint, winChancePPM, winChancePercent]: any = tier;
    usdCost = uintToRegular(String(usdCost), "6");
    dingMint = uintToRegular(String(dingMint), "18");

    return { usdCost, dingMint, winChancePPM, winChancePercent };
  } catch (error) {
    console.log(error);
  }
}

export { getDepositTier, getTotalEntries, getUSDCollected };
