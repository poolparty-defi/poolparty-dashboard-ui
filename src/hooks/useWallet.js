import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import {useState} from "react";

const useWallet = () => {
    const [web3Modal, setWeb3Modal] = useState(null)
    const [account, setAccount] = useState({})
    const [connected, setConnected] = useState(false)

    let provider = null

    const fetchAccountData = async () => {
        if (!provider)
            return
        try {
            const accounts = await provider.eth.getAccounts();
            const account = {}
            account.address = accounts[0]
            account.balance = await provider.eth.getBalance(account.address)
            setConnected(true)
            setAccount(account)
            console.log("Connected wallet.")
        } catch (e) {
            console.log("Could not set wallet.", e);
        }
    }

    const initWeb3Modal = () => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "INFURA_ID" // unsure about this.
                }
            }
        };

        // Unsure about this options.
        const modal = new Web3Modal({
            cacheProvider: true,
            network: "rinkeby", // unsure about this.
            providerOptions,
            disableInjectedProvider: false
        })
        setWeb3Modal(modal)
    }

    const openWalletsModal = async () => {

        try {
            if (!web3Modal)
                initWeb3Modal()
            const connection = await web3Modal.connect()
            provider = new Web3(connection)

            try {
                await fetchAccountData();
            } catch (e) {
                console.log("Error fetching wallet data:", e)
            }
        } catch (e) {
            // log if needed.
        }
    }

    return {
        connected,
        account,
        openWalletsModal,
    }
}

export default useWallet;