import { decodeXPaymentResponse, wrapFetchWithPayment } from "x402-fetch";
import { dingEndpoints } from "./ding-endpoints";
const baseUrl = "https://www.dingdotfun.com";
const lottoEndpoint = "https://www.dingdotfun.com/api/x402/lottery";

async function excecutePaymentRequest(usdAmout: String, signer: any) {
  try {
    //custom fetch for x402 stuff
    //x402-fetch extends the native fetch API to handle 402 responses and payment headers for you. Full example here
    const fetchWithPayment = wrapFetchWithPayment(fetch, signer);

    const endpointKey: any | null = detectEndpoint(usdAmout);

    if (endpointKey !== null) {
      //no body params needed everything is doen automatically since endpoint has no body just pass in wallet client
      console.log("Endpoint selected: ", dingEndpoints[endpointKey]);
      const paymentRequest: any = await fetchWithPayment(
        baseUrl + dingEndpoints[endpointKey] + import.meta.env.VITE_CB_API_KEY,
        {
          method: "POST",
        }
      );
      const paymentBodyRes = await paymentRequest.json();
      const reciept = decodeXPaymentResponse(
        paymentBodyRes.headers.get("x-payment-response")
      );
      return reciept;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
// node_modules/@solana-program/compute-budget/dist/src/index.mjs:1:217
function detectEndpoint(amount: String) {
  let key: any | null;
  switch (amount) {
    case "1":
      key = "tier1";
      break;

    case "10":
      key = "tier10";
      break;

    case "100":
      key = "tier100";
      break;

    case "1000":
      key = "tier1000";
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
