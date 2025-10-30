import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { modalStyle } from "../uilities/mui-styles";

function ConnectAccount() {
  const [open, setOpen] = useState(true);
  const { isConnected, address }: any = useAccount();
  const { connect, connectors }: any = useConnect();

  return (
    <div>
      <Modal
        open={false}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div>
            <h1 className="font-bold">Wallet Not Connected</h1>

            <button className="border w-full p-2 rounded-md bg-gray-800 border-gray-900 mt-3">
              Conect Wallet{" "}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <>
      <button
        type="button"
        onClick={() => signMessage({ message: "hello orld" })}
        disabled={isPending}
      >
        {isPending ? "Signing..." : "Sign message"}
      </button>
      {data && (
        <>
          <div>Signature</div>
          <div>{data}</div>
        </>
      )}
      {error && (
        <>
          <div>Error</div>
          <div>{error.message}</div>
        </>
      )}
    </>
  );
}

export default ConnectAccount;
