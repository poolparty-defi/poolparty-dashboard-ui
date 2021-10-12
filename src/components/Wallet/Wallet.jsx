import {Button, Grid, IconButton} from "@material-ui/core";
import {AccountBalanceWalletOutlined} from "@material-ui/icons";
import useWallet from "../../hooks/useWallet";
import {useState} from "react";

const Wallet = () => {
    const wallet = useWallet()

    if (wallet.connected) {
        return <ConnectedWallet/>
    }

    return (
        <>
            <Grid item>
                <Button onClick={wallet.openWalletsModal} variant="outlined" color="secondary">Connect Wallet</Button>
            </Grid>
        </>
    )
}

/* TODO: Make the wallet clickable and show a menu. */
const ConnectedWallet = () => {
    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(!open)

    return (
        <>
            <Grid item>
                <IconButton onClick={toggle}>
                    <AccountBalanceWalletOutlined/>
                </IconButton>
            </Grid>
        </>
    )
}

export default Wallet