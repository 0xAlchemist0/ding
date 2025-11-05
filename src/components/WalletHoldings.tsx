import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { getUserEntries } from "../uilities/contract-reads";
import imageURLS from "../uilities/imageURLs";
import logoImages from "../uilities/logo-images";

function WalletHoldings() {
  const account = useAccount();
  const [totalDeposited, setTotalDeposited] = useState<String | null>(null);

  useEffect(() => {
    const getTotalDeposited = async () => {
      const result = await getUserEntries(account?.address);
      if (result !== null && result) setTotalDeposited(result);
    };

    if (account) getTotalDeposited();
  }, [account]);

  return (
    <div className=" p-5  border-gray-600">
      <div className=" text-[10px]  border-gray-600 p-3 grid grid-cols-2 gap-3">
        <div className="relative grid  overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0a1a3d] via-[#071d3b] to-[#172554] shadow-[4px_4px_8px_rgba(0,0,0,0.6),-4px_-4px_8px_rgba(40,60,120,0.3)] text-white">
          <span className="flex gap-1">
            <FaBolt className="text-blue-500 mt-0.5 mb-1 font-light animation animate-pulse text-[10px]" />
            <h1>24h Entries</h1>
          </span>
          <h1 className="text-[16px] font-extrabold text-blue-400 px-0.5 mb-1">
            10
          </h1>
          <h1 className="text-[9px]">last 24 hours</h1>
        </div>{" "}
        <div className="relative grid  overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0a1a3d] via-[#071d3b] to-[#172554] shadow-[4px_4px_8px_rgba(0,0,0,0.6),-4px_-4px_8px_rgba(40,60,120,0.3)] text-white">
          <span className="flex gap-1">
            <FaBolt className="text-blue-500 mt-0.5 mb-1 font-light animation animate-pulse text-[10px]" />
            <h1>24h Volume</h1>
          </span>
          <h1 className="text-[16px] font-extrabold text-blue-400 px-0.5 mb-1">
            10
          </h1>
          <h1 className="text-[9px]">last 24 hours</h1>
        </div>{" "}
        <div className="relative grid  overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0a1a3d] via-[#071d3b] to-[#172554] shadow-[4px_4px_8px_rgba(0,0,0,0.6),-4px_-4px_8px_rgba(40,60,120,0.3)] text-white">
          <span className="flex gap-1">
            <FaBolt className="text-blue-500 mt-0.5 mb-1 font-light animation animate-pulse text-[10px]" />
            <h1>24h Winners</h1>
          </span>
          <h1 className="text-[16px] font-extrabold text-blue-400 px-0.5 mb-1">
            10
          </h1>
          <h1 className="text-[9px]">last 24 hours</h1>
        </div>{" "}
        <div className="relative grid  overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0a1a3d] via-[#071d3b] to-[#172554] shadow-[4px_4px_8px_rgba(0,0,0,0.6),-4px_-4px_8px_rgba(40,60,120,0.3)] text-white">
          <span className="flex gap-1">
            <FaBolt className="text-blue-500 mt-0.5 mb-1 font-light animation animate-pulse text-[10px]" />
            <h1>Pending</h1>
          </span>
          <h1 className="text-[16px] font-extrabold text-blue-400 px-0.5 mb-1">
            0
          </h1>
          <h1 className="text-[9px]">last 24 hours</h1>
        </div>{" "}
      </div>
      <div className=" mt-2 border-gray-600 rounded-lg flex justify-between p-5">
        <span className="flex gap-4">
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <img
                src={logoImages.baselogo}
                className="size-4 rounded-md bg-blue-600"
              />
            }
            overlap="circular"
          >
            {" "}
            <img
              src={imageURLS.ding}
              alt=""
              className="size-10 border-gray-800 bg-gray-800 border rounded-full h-10"
            />
          </Badge>
          <div className="grid grid-rows-1 text-sm font-bold mt-0.5">
            <span className="flex">
              <h1>$Ding</h1>
            </span>
            <h1 className="text-gray-600">Ding</h1>
          </div>
        </span>
        <h1 className="mt-2 font-bold text-2xl">20</h1>
      </div>
    </div>
  );
}

export default WalletHoldings;
