import {AppBar, Grid, makeStyles, Toolbar, Typography} from '@material-ui/core'
import Wallet from "../Wallet/Wallet";

const useStyles = makeStyles(theme => ({
    header: {
        zIndex: theme.zIndex.drawer + 1
    },
    toolbar: theme.mixins.toolbar,
}))

const Header = () => {
    const classes = useStyles()

    return (
        <>
            <AppBar className={classes.header} position="fixed" color="inherit">
                <Toolbar>
                    <Grid container justifyContent="flex-start" alignItems="center">
                        <Grid item>
                            <Typography>PoolParty</Typography>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Wallet/>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}/>
        </>
    )
}

export default Header