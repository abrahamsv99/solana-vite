import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { useEffect } from "react";

export const SomeComponent = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
  
    const { getUserSOLBalance } = useUserSOLBalanceStore()
  
    useEffect(() => {
      if (wallet.publicKey) {
        console.log(wallet.publicKey.toBase58())
        getUserSOLBalance(wallet.publicKey, connection)
      }
    }, [wallet.publicKey, connection, getUserSOLBalance])

    return(
        <h1 className="text-3xl">Hello:  {wallet?.publicKey?.toString()}</h1>
    )
} 