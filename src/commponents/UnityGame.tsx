import { Wallet, WalletContextState, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createBurnCheckedInstruction } from "@solana/spl-token";

export const UnityGame = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const { unityProvider, sendMessage, isLoaded, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/Build.loader.js",
    dataUrl: "build/Build.data",
    frameworkUrl: "build/Build.framework.js",
    codeUrl: "build/Build.wasm",
  });

  useEffect(() => {
    if (wallet.publicKey && isLoaded) {
      sendMessage('WalletHandler', 'OnWalletConnected', wallet.publicKey.toString())
    }
  }, [wallet, isLoaded])

  const insertToken = async () => {
    const mint = new PublicKey("ANdWPSrEjLiLWwdiZw36u9vUCHRLmpiK1WMHwftezvcX")

    if (wallet.publicKey && wallet.signTransaction) {

      let response2 = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey, // owner here
        {
          mint: mint, // mint (token)
        }
      );

      console.log(response2.value[0].account.data.parsed.info.mint)
      console.log(response2.value[0].pubkey.toBase58())

      let tx = new Transaction().add(
        createBurnCheckedInstruction(
          response2.value[0].pubkey, // token account
          mint, // mint
          wallet.publicKey, // owner of token account
          1, // amount, if your deciamls is 8, 10^8 for 1 token
          0 // decimals
        )
      );

      const latest = await connection.getLatestBlockhash()

      tx.recentBlockhash = latest.blockhash

      tx.feePayer = wallet.publicKey

      const txIsSigned = await wallet.sendTransaction(tx, connection, {
        skipPreflight: true
      })

      console.log(txIsSigned)

      const res = await connection.confirmTransaction({
        blockhash: latest.blockhash,
        lastValidBlockHeight: latest.lastValidBlockHeight,
        signature: txIsSigned,
      });

      if (res.value.err === null) {
        sendMessage('WalletHandler', 'OnTokenBurned');
      } else {
        console.log(" failed ")
        console.log(res)
      }

    }
    else {
      console.log(wallet.publicKey?.toString())
      console.log("connect your wallet")
    }
  }

  const insertTokenToo = useCallback(async () => {
    insertToken();
  }, [])

  useEffect(() => {
    addEventListener("insertToken", insertTokenToo as any);
    return () => {
      removeEventListener("insertToken", insertTokenToo as any)
    };
  }, [addEventListener, removeEventListener, insertTokenToo])

  return (
    <div className="flex justify-center items-center h-screen bg-black pt-64" >
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Unity unityProvider={unityProvider} style={{ "width": 576, "height": 432 }} devicePixelRatio={window.devicePixelRatio} />
        <button onClick={() => insertToken()} className="z-20 bg-amber-400 justify-center mt-8 ">
          Insert token
        </button>
      </div>
    </div>
  );
}