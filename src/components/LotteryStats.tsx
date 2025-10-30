import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { getTotalEntries, getUSDCollected } from "../uilities/contract-reads";

function LotteryStats() {
  const [usdCollected, setUsdCollected] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  useEffect(() => {
    const getTargetInfo = async () => {
      const entries: any = await getTotalEntries();
      const usdDeposited: any = await getUSDCollected();
      console.log("Entries: ", entries);
      console.log("usd deposited: ", usdDeposited);
      if (entries !== null) setTotalEntries(entries);
      if (usdDeposited !== null) setUsdCollected(usdDeposited);
    };

    getTargetInfo();
  }, []);
  return (
    <div className="border  border-gray-600 border-t-0 border-l-0 border-r-0 grid grid-flow-col p-2.5">
      <div className="border border-gray-600 border-l-0 border-t-0 border-b-0 flex gap-2 text-xs">
        <span className="flex gap-2 m-auto font-bold">
          <GoDotFill className="text-blue-400 animate-pulse mt-0.5" />
          <h1 className="text-gray-400">Total entries</h1>
          <h1 className="text-blue-400">{totalEntries}</h1>
        </span>
      </div>
      <div className="border border-r-0 border-gray-600 border-t-0 border-b-0 flex text-xs gap-2">
        <span className="flex gap-2 m-auto font-bold">
          <GoDotFill className="text-green-500 animate-pulse mt-0.5" />

          <h1 className="text-gray-400">Total USD</h1>
          <h1 className="text-green-500 ">${usdCollected}.00</h1>
        </span>
      </div>
    </div>
  );
}
export default LotteryStats;
// getDepositTier, getTotalEntries, getUSDCollected
