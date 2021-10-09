import useWallet from "use-wallet";
import {Button, Grid, IconButton, makeStyles, Menu, MenuItem, Typography} from "@material-ui/core";
import {AccountBalanceWallet, Error} from "@material-ui/icons";
import {useState} from "react";

const walletTypes = ["MetaMask"]

const useStyles = makeStyles((theme) => ({
    accountMenu: {
        marginTop: theme.spacing(5),
        textTransform: 'none'
    }
}))

const DisconnectedWallet = () => {
    const styles = useStyles()
    const wallet = useWallet()

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = e => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    const connectWallet = (type) => {
        if (type === "MetaMask") {
            wallet.connect()
            return
        }
        wallet.connect(type)
    }

    return (
        <>
            <Grid item>
                <Button onClick={openMenu} variant="outlined" color="secondary">Connect Wallet</Button>
            </Grid>
            <Menu
                id="wallet-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                onClick={closeMenu}
                PaperProps={{
                    className: styles.accountMenu
                }}
            >
                {
                    walletTypes.map((wallet, index) => (
                        <MenuItem onClick={() => connectWallet(wallet)} key={index} color="inherit">{wallet}</MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}

const ConnectedWallet = () => {
    const styles = useStyles()
    const wallet = useWallet()

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = e => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    return (
        <>
            <Grid item>
                <IconButton onClick={openMenu}>
                    <AccountBalanceWallet/>
                </IconButton>
                <Menu
                    id="wallet-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    onClick={closeMenu}
                    PaperProps={{
                        className: styles.accountMenu
                    }}
                >
                    <MenuItem>
                        <Typography>Balance: {wallet.balance} ETH</Typography>
                    </MenuItem>
                    <MenuItem onClick={wallet.reset}>
                        <Typography>Disconnect</Typography>
                    </MenuItem>
                </Menu>
            </Grid>
        </>
    )
}

const Wallet = () => {
    const wallet = useWallet()
    switch (wallet.status) {
    case "disconnected":
    case "connecting":
        return <DisconnectedWallet/>
    case "connected":
        return <ConnectedWallet/>
    }
    return <Error/>
}

export default Wallet