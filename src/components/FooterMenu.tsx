import { FaHome, FaWallet } from "react-icons/fa";
import { MdCasino } from "react-icons/md";
import { Link } from "react-router-dom";
function FooterMenu() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg- border-t bg-stone-900 border-gray-600 flex justify-around py-3">
      <Link
        to={"/"}
        className="flex flex-col items-center text-gray-500 hover:text-blue-500"
      >
        <FaHome className="text-2xl" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        to={"/deposit"}
        className="flex flex-col items-center text-gray-500 hover:text-blue-500"
      >
        <MdCasino className="text-2xl" />
        <span className="text-xs mt-1">Deposit</span>
      </Link>

      <Link
        to={"/wallet"}
        className="flex flex-col items-center text-gray-500 hover:text-blue-500"
      >
        <FaWallet className="text-2xl" />
        <span className="text-xs mt-1">Wallet</span>
      </Link>
    </div>
  );
}
export default FooterMenu;
