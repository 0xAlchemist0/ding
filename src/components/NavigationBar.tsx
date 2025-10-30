import { FaTelegramPlane } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import logoImages from "../uilities/logo-images";
function NavigationBar() {
  const account = useAccount();
  let walletButtonValue = account?.address ? sliceAddress() : "Connect Wallet";

  function sliceAddress() {
    if (account?.address) {
      return (
        account?.address?.slice(0, 4) +
        "..." +
        account?.address.slice(
          account?.address?.length - 4,
          account?.address.length
        )
      );
    }
  }
  //   thinking bout storing these classes in a seperate file since some of our elements implement the same classes
  return (
    <div className="border border-gray-600 p-2 flex justify-between ">
      <div className="flex gap-3">
        <Link to={"/"}>
          <img src={logoImages.dinglogo} alt="" className="size-15" />
        </Link>
        <div className=" h-7 mt-3.5 px-1.5 rounded-md border border-gray-600 text-green-500 text-xs">
          <span className="flex gap-1 mt-[5px]">
            <GoDotFill className="text-green-500 animate-pulse mt-0.5" />

            <h1 className="">Live</h1>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={"https://relax-marie-hour-prescription.trycloudflare.com/deposit"}
          target="_blank"
          className="border h-7 mt-3.5 px-2 rounded-md border-gray-600"
        >
          <FaTelegramPlane className="mt-1.5 text-gray-400 text-sm" />
        </Link>
        <div className="border h-7 mt-3.5 px-3 rounded-md border-gray-600 flex gap-1">
          <img
            src={logoImages.farcasterlogo}
            alt=""
            className="size-3.5 mt-1.5 rounded-md me-1"
          />
          <h1 className="text-xs mt-1.5">{walletButtonValue}</h1>
        </div>
      </div>
    </div>
  );
}
export default NavigationBar;
