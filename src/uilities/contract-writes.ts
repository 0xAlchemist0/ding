import ERC20ABI from "../abi/ERC20ABI";
import { publicClient, walletClient } from "../wagmi";
import contracts from "./contracts";

async function approveSpending(spender: any, account: any) {
  //value should be high amount
  const spend_cap = "100000000000000";
  try {
    const { request }: any = await publicClient.simulateContract({
      address: contracts.usdc,
      abi: ERC20ABI,
      functionName: "approve",
      args: [spender, spend_cap],
      account,
    });

    await walletClient.writeContract(request);
  } catch (error) {
    console.log(error);
  }
}

export { approveSpending };
