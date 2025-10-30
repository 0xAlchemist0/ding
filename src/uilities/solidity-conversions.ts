function regulareToUint(amount: String, decimals: String) {
  try {
    const result = Number(amount) * Math.pow(10, Number(decimals));

    return String(result);
  } catch (error) {
    console.log(error);
  }
}

function uintToRegular(amount: any, decimals: any) {
  try {
    const result = Number(amount) / Math.pow(10, Number(decimals));

    return result;
  } catch (error) {
    console.log(error);
  }
}

export { regulareToUint, uintToRegular };
//rn 1 usdc = 1000000000000000000
//get lotto stats https://basescan.org/address/0x402b1b5d000bd7bB21a99FFA54FF23ce3E3f570e#readContract
//getTier gives u how much tokens u get https://basescan.org/address/0x402b1b5d000bd7bB21a99FFA54FF23ce3E3f570e#code

// uint256 public constant TIER_1_USD = 1_000_000;        // $1 (6 decimals) 100000000000000000000 / 10^18 = 100 , s 1usd  == 100 tokens from deposit
// uint256 public constant TIER_10_USD = 10_000_000;      // $10
// uint256 public constant TIER_100_USD = 100_000_000;    // $100
// uint256 public constant TIER_1000_USD = 1_000_000_000; // $
