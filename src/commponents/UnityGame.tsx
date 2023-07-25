import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Fragment, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export const UnityGame = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "build/Builds.loader.js",
    dataUrl: "build/Builds.data",
    frameworkUrl: "build/Builds.framework.js",
    codeUrl: "build/Builds.wasm",
  });

  useEffect(() => {
    if (wallet.publicKey && isLoaded) {
      sendMessage('WalletHandler', 'OnWalletConnected', wallet.publicKey.toString())
      console.log(wallet.publicKey)
    }
  }, [wallet, isLoaded])

  return (
    <div >
      <div>
        <Unity unityProvider={unityProvider} style={{width: 800, height: 600}} devicePixelRatio={window.devicePixelRatio} className={`${wallet.publicKey ? " " : "hidden"}`} />
      </div>
    </div>
  );
}