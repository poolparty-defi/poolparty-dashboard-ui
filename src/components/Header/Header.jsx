import { AppBar, Button, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    header: {
        zIndex: theme.zIndex.drawer + 1
    },
    toolbar: theme.mixins.toolbar,
}))

export default () => {
    const classes = useStyles()

    return (
        <>
            <AppBar className={classes.header} position="fixed" color="inherit">
                <Toolbar>
                    <Grid container justify="flex-start" alignItems="center">
                        <Grid item>
                            <Typography>PoolParty</Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify="flex-end" alignItems="center">
                        <Grid item>
                            <Button variant="outlined" color="secondary">Connect Wallet</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
        </>
    )
}