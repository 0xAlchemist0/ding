import { Outlet } from "react-router-dom";
import FooterMenu from "./components/FooterMenu";
import LotteryStats from "./components/LotteryStats";
import NavigationBar from "./components/NavigationBar";

function Layout() {
  return (
    <div className="text-white ">
      <NavigationBar />
      <LotteryStats />
      <Outlet />
      <FooterMenu />
    </div>
  );
}

export default Layout;
