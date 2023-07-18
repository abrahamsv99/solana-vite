import { Unity, useUnityContext } from "react-unity-webgl";

export const UnityGame = ({walletIsConnected, setWalletIsConnected, wallet}: {walletIsConnected: Boolean, setWalletIsConnected: React.Dispatch<React.SetStateAction<Boolean>>, wallet: string }) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/Builds.loader.js",
    dataUrl: "build/Builds.data",
    frameworkUrl: "build/Builds.framework.js",
    codeUrl: "build/Builds.wasm",
  });

  function getWallet() {
    return wallet
  }

  return <Unity unityProvider={unityProvider} />;
}