const baseUrl = "https://www.dingdotfun.com";
const lottoEndpoint = "https://www.dingdotfun.com/api/x402/lottery";
import axios from "axios";
import { decodeXPaymentResponse, withPaymentInterceptor } from "x402-axios";
import { dingBaseURL } from "./ding-endpoints";

function getWrappedFetcher(baseURL: any, account: any) {
  return withPaymentInterceptor(
    axios.create({
      baseURL,
    }),
    account
  );
}

async function excecutePaymentRequest(amount: String, account: any = null) {
  try {
    if (!account) throw new Error("No account provided!");
    const x402Fetcher = getWrappedFetcher(dingBaseURL, account);
    //complette refator we will try to use axios fetch instead to wrap into custom excecutor
    const endpoint = detectEndpoint(amount);
    console.log(dingBaseURL + endpoint);
    const paymentRequest = await x402Fetcher.post(
      dingBaseURL + "/api/x402" + endpoint
    );
    const { data: paymentData } = await paymentRequest.data;
    if (!paymentData) throw new Error("No request data recieved to proceed!");

    const paymentResponse = decodeXPaymentResponse(
      paymentData.headers["x-payment-response"]!
    );
    console.log("Payment success!");
    console.log(paymentResponse);
    return {};
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
// node_modules/@solana-program/compute-budget/dist/src/index.mjs:1:217
function detectEndpoint(amount: String) {
  let key: any | null;
  switch (amount) {
    case "1":
      key = "/tier-1";
      break;

    case "10":
      key = "/tier-10";
      break;

    case "100":
      key = "/tier-100";
      break;

    case "1000":
      key = "/tier-1000";
      break;

    default:
      key = null;
      break;
  }
  console.log("key determined: ", key);
  return key;
}

export { excecutePaymentRequest };

//this is the contract that gives entry to the lottery
// 0x402b1b5d000bd7bB21a99FFA54FF23ce3E3f570e
//example tx hash https://basescan.org/tx/0xac58b935b809e9bac8e4e07ef6d661b028256d4caf06019d00fe6ff3c6cc82d6
