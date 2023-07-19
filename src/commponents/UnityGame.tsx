import { Unity, useUnityContext } from "react-unity-webgl";

export const UnityGame = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/Builds.loader.js",
    dataUrl: "build/Builds.data",
    frameworkUrl: "build/Builds.framework.js",
    codeUrl: "build/Builds.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}