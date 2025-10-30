import { Outlet } from "react-router-dom";
import LotteryStats from "./components/LotteryStats";
import NavigationBar from "./components/NavigationBar";

function Layout() {
  return (
    <div className="text-white ">
      <NavigationBar />
      <LotteryStats />
      <Outlet />
    </div>
  );
}

export default Layout;
