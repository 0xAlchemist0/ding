import logoImages from "../uilities/logo-images";

function MiniAppHome() {
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
    </div>
  );
}

export default MiniAppHome;
//be back quick break :)
//4 more min :( we back
