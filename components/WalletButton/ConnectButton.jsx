import { Button } from "../index";
import styles from "./connect-button.module.css";
// import { useAppContext } from "../../contexts/appContext";

function ConnectButton() {
  const loading = false;
  const { handleWalletConnect, hasMetaMask } = {
    handleWalletConnect: () => alert("Connected!"),
    hasMetaMask: true,
  };

  async function connect() {
    const connectionStatus = await handleWalletConnect();
    if (!connectionStatus) return;
  }

  return (
    <div className={styles["container"]}>
      {!hasMetaMask && (
        <div className="">
          <a
            rel="noreferrer"
            referrerPolicy="no-referrer"
            target="_blank"
            href="https://metamask.io/download"
          >
            <Button buttonText="Get Meta mask" />
          </a>
        </div>
      )}
      {hasMetaMask && (
        <button
          onClick={connect}
          disabled={loading}
          className={`${styles["connect-btn"]} btn shadow-l`}
        >
          <span className="d-none d-md-block">Connect Wallet</span>
        </button>
      )}
    </div>
  );
}

export { ConnectButton };
