import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { useEffect, useState } from "react";
import { UnityGame } from './UnityGame'

export const SomeComponent = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [ walletIsConnected, setWalletIsConnected  ] = useState<Boolean>(false);

    useEffect(() => {
        if (wallet.publicKey) {
            setWalletIsConnected(true)
        }
    }, [wallet.publicKey, connection])

    return (
        <>
            <h1 className="text-3xl">Hello:  {wallet?.publicKey?.toString()}</h1>
            <div className={wallet.publicKey ? 'hidden': ' '}>
                Connect wallet pliss
            </div>
            {wallet.publicKey && <UnityGame
                walletIsConnected={walletIsConnected}
                setWalletIsConnected={setWalletIsConnected}
                wallet={wallet.publicKey?.toString()}
            />}
        </>
    )
} 