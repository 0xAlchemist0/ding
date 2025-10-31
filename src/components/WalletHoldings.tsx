import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUserTotalSpent } from "../uilities/contract-reads";
import logoImages from "../uilities/logo-images";

function WalletHoldings() {
  const account = useAccount();
  const [totalDeposited, setTotalDeposited] = useState<String | null>(null);

  useEffect(() => {
    const getTotalDeposited = async () => {
      const result = await getUserTotalSpent(account?.address);
      if (result !== null && result) setTotalDeposited(result);
    };

    if (account) getTotalDeposited();
  }, [account]);

  return (
    <div className=" p-5">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Balance</h1>
        <h1 className="text-xl">${totalDeposited}</h1>
      </div>
      <div className="border p-2">
        <span className="flex">
          <img src={logoImages.dinglogo} alt="" className="size-8" />
        </span>
      </div>
    </div>
  );
}

export default WalletHoldings;
