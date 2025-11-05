import { Button, ButtonGroup, Snackbar } from "@mui/material";
import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaWallet } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { LuArrowDownUp } from "react-icons/lu";
import { useAccount, useWalletClient } from "wagmi";
import { excecutePaymentRequest } from "../uilities/api-request-handler";
import { getDepositTier, verifyApproval } from "../uilities/contract-reads";
import { approveSpending } from "../uilities/contract-writes";
import contracts from "../uilities/contracts";
import imageURLS from "../uilities/imageURLs";
// { usdCost, dingMint, winChancePPM, winChancePercent }
function DingDepositor() {
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [opensnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    message: null,
    failed: null,
  });
  const [depositAmount, setDepositAmount] = useState(null);
  const [tierQuote, setTierQuote] = useState({
    usdCost: null,
    dingMint: null,
    winChancePPM: null,
    winChancePercent: null,
  });
  const [txReciept, setTxReciept] = useState(null);
  const { wallets } = useWallets();
  useEffect(() => {
    //tier returns an array returns a tuple
    const getTierQuote = async () => {
      const tier: any = await getDepositTier(depositAmount);
      setTierQuote(tier);
    };
    if (depositAmount !== null && depositAmount !== "0") {
      getTierQuote();
    }
    console.log("Deposited: ", depositAmount);
  }, [depositAmount]);

  const handleChange = (e: any) => {
    if (e.target) {
      setDepositAmount(e.target.value);
    }
  };

  const getApiWallet = async () => {
    if (wallets) return walletClient;

    return null;
  };

  const handleDepositEvent = async () => {
    if (wallets[0] && depositAmount !== null && depositAmount !== "0") {
      console.log("Running tx");
      const isApproved = await verifyApproval(
        wallets[0]?.address,
        contracts.lottery,
        contracts.usdc,
        depositAmount
      );

      const excecuteApproval = async () => {
        await approveSpending(contracts.lottery, wallets[0]?.address);
      };

      if (!isApproved) excecuteApproval();

      if (!isApproved) throw new Error("Asset not approvd tx failed");

      const apiWallet = await getApiWallet();

      const message: any = await excecutePaymentRequest(
        depositAmount,
        apiWallet
      );

      if (message) setSnackMessage(message);

      return apiWallet;

      //wallet excecution goes here
    }
  };

  function SwapBox() {
    //swap box goes here to prevent duplicate code
    //code will be refactored when done
    return <div></div>;
  }
  //tx goes ere
  function TxModal() {}
  function WinChanceCard() {
    //i will fix
    //we dont need no custome vieport styling since farcaster apps have a fixed size thank u god :)
    return (
      <div className="border p-4 rounded-md bg-gradient-to-br from-green-500/15 to-green-500/5 border-2 border-green-500/30">
        <div className="flex gap-3">
          <FaArrowTrendUp className="text-green-500 text-sm mt-0.5" />
          <h1 className="text-sm font-extrabold">Win Chance</h1>
        </div>
        <div className="px-0.5">
          <h1 className="text-green-500 text-2xl font-extrabold mt-2">1:250</h1>
        </div>
        <div>
          <h1 className="text-[10px] mt-1 font-extrabold text-gray-400">
            Every $1 entry
          </h1>
        </div>
      </div>
    );
  }

  function JackpotCard() {
    return (
      <div className="border p-4 rounded-md bg-gradient-to-br from-blue-500/15 to-blue-500/5 border-2 border-blue-500/30">
        <div className="flex gap-3">
          <GoTrophy className="text-blue-500 text-sm mt-0.5" />
          <h1 className="text-sm font-extrabold">Prize Value</h1>
        </div>
        <div className="px-0.5">
          <h1 className="text-blue-400 text-2xl font-extrabold mt-2">
            $10,000
          </h1>
        </div>
        <div>
          <h1 className="text-[10px] mt-1 font-extrabold text-gray-400">
            Every $1 entry
          </h1>
        </div>
      </div>
    );
  }

  //we will fix the types
  function AmountButtons({ tiers }: any) {
    return (
      <ButtonGroup sx={{ color: "#008000" }} aria-label="Basic button group">
        {tiers.map((item: any, index: any) => {
          return (
            <Button
              key={index}
              onClick={() => {
                setDepositAmount(item);
              }}
              className="border px-3 text-xs border-gray-700 rounded-md p-1 text-gray-300 font-semibold"
            >
              ${item}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }

  ///these componeents will be put in speerate files to have clean and readable code just etting up flow

  return (
    <div className="mb-40 mt-20">
      <div className="border w-100 border-gray-600 bg-gray-900 [#1b2431]rounded-lg m-auto mt-3 p-5 grid grid-flow-row gap-2 rounded-md">
        <h1 className="text-xl font-bold mb-3 text-gray-500">Enter Lottery</h1>
        <AmountButtons tiers={["1", "10", "100", "1000"]} />

        <h1 className="text-xs ms-1 mt-4">You Pay</h1>

        <div className="grid grid-flow-row border p-5 border-gray-600 bg-gray-800 rounded-md">
          <div className=" rounded-md  grid grid-cols-7">
            <input
              type="text"
              className="col-span-4 p-0 outline-0 text-3xl font-bold font-sans"
              placeholder="0"
              value={depositAmount || ""}
              onChange={handleChange}
            />
            <div className="flex gap-3  border-0 w-full bg-gray-800 text-gray-300 font-bold col-span-3 justify-center rounded-lg  ">
              <button className="flex gap-2 border rounded-md ms-auto border-gray-600 h-8 px-5  justify-right  text-[14px] hover:cursor-pointer bg-gray-700">
                <img
                  src={imageURLS.usdc}
                  alt=""
                  className="size-4.5 mt-1 rounded-full"
                />

                <h1 className="mt-1">USDC</h1>
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-500 ">
            <h1 className="mt-1.5">$0.00</h1>
            <span className="flex gap-2  ">
              <FaWallet className="mt-1.5" />
              <h1 className=" mt-1">0.00</h1>
            </span>
          </div>
        </div>

        {/* bot are same elow and above compose into a component  */}
        <LuArrowDownUp className="m-auto text-2xl text-gray-600" />

        {/*separator i middle icon  */}
        <h1 className="text-xs ms-1">You Recieve</h1>

        <div className="grid grid-flow-row border p-5 border-gray-600 bg-gray-800 rounded-md">
          <div className=" rounded-md  grid grid-cols-7">
            <input
              type="text"
              className="col-span-4 p-0 outline-0 text-3xl"
              placeholder={tierQuote ? "2000" : "0"}
              // fix make template obect to handle tehese errors
              value={
                tierQuote && tierQuote?.dingMint ? tierQuote?.dingMint : "0"
              }
              disabled={true}
            />
            <div className="flex gap-3  border-0 w-full bg-gray-800 text-gray-300 font-bold col-span-3 justify-center rounded-lg ">
              <button className=" flex justify-end  gap-2 border rounded-md ms-auto border-gray-600 h-8 px-5  justify-right  text-[14px] hover:cursor-pointer bg-gray-700">
                <img
                  src={imageURLS.ding}
                  alt=""
                  className="size-4.5 mt-1 rounded-full"
                />

                <h1 className="mt-1">Ding</h1>
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-500 ">
            <h1 className="mt-1.5">$0.00</h1>
            <span className="flex gap-2  ">
              <FaWallet className="mt-1.5" />
              <h1 className=" mt-1">0.00</h1>
            </span>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="border w-full p-3 rounded-md border-gray-600 text-sm  bg-slate-800 font-extrabold hover:text-gray-200/50 hover:bg-slate-800/70 hover:cursor-pointer"
            onClick={() => {
              handleDepositEvent();
            }}
          >
            Enter Lottery with x402
          </button>
        </div>
      </div>
      {/* cards cgo here stat card */}
      <div className="grid grid-flow-row gap-3 mt-10 mb-2 w-90 m-auto">
        <WinChanceCard />
        <JackpotCard />
      </div>
      <Snackbar
        open={snackMessage.message !== null}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnack(false);
        }}
        message={
          <span className="flex gap-2">
            <FaCheckCircle
              className={`text-${snackMessage.failed ? "red-500" : "green-500"} mt-1`}
            />
            {snackMessage.message}
          </span>
        }
        color="white"
      />

      {/* connect wallet or deposit button */}
    </div>
  );
}

export default DingDepositor;
