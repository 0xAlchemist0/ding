import { FaCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import logoImages from "../uilities/logo-images";
function MiniAppHome() {
  function DepositActivityLive() {
    return (
      <div className="border border-gray-600  rounded-md p-5">
        <span className="flex gap-2 font-bold">
          <FaCircle className="text-green-500 animate-pulse text-sm mt-1" />
          <h1>Live Activity</h1>
        </span>
      </div>
    );
  }
  return (
    <div className="mt-10">
      <div>
        <img
          src={logoImages.dinglogo}
          alt=""
          className="size-50 m-auto  h-20"
        />
      </div>

      <div>
        <span className="flex gap-2 font-extrabold justify-center text-2xl">
          <h1>Pay with</h1>
          <h1 className="text-blue-400">x402</h1>
          <h1>,</h1>
          <h1>Win</h1>
          <h1 className="text-green-500">$10k</h1>
        </span>
        <h1 className="text-center text-sm m-auto w-93 mt-3 ">
          Buy DING tokens with USDC through secure x402 payments. Every purchase
          automatically enters you into our provably fair lottery with massive
          prizes.
        </h1>
      </div>
      <div className="mt-2 grid grid-cols-2 w-93 m-auto gap-3 mt-5">
        <button className="border p-2 rounded-md border-gray-600 font-bold bg-blue-600">
          <div className="flex gap-2 justify-center">
            <IoDocumentTextOutline className="text-lg font-bold text-gray-200" />
            <h1>Read Docs</h1>
          </div>
        </button>
        <button className="border p-2 rounded-md border-gray-600 bg-green-700 font-bold text-white">
          <div className="flex gap-2 justify-center">
            <IoDocumentTextOutline className="text-lg font-bold text-gray-200" />
            <h1>Enter Lottery</h1>
          </div>
        </button>
      </div>
      <div className="w-93 m-auto mt-10">
        <DepositActivityLive />
      </div>
    </div>
  );
}

export default MiniAppHome;
//be back quick break :)
//4 more min :( we back
