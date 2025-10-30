import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ConnectAccount from "./components/ConnectAccount";
import DingDepositor from "./components/DingDepositor";
import MiniAppHome from "./components/MiniAppHome";

function App() {
  useEffect(() => {
    //initializes the mini app must be in app.tsx because this is the hub
    sdk.actions.ready();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MiniAppHome />} />
          <Route path="/connect" element={<ConnectAccount />} />
          <Route path="/deposit" element={<DingDepositor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
