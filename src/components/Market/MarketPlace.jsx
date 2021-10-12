import {Button, Collapse, Grid, Hidden, IconButton, makeStyles} from "@material-ui/core";
import {FilterList} from "@material-ui/icons";
import {SearchBar} from "../Utility/SearchBar";
import {useState} from "react";
import {MarketPlaceFilter} from "./MarketPlaceFilter";
import AssetCard from "../AssetCard/AssetCard";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.fontColor,
        fontWeight: "bold"
    },
    searchBar: {
        flexGrow: 1
    },
    gutterBottom: {
        marginBottom: theme.spacing(2)
    }
}))

const MarketPlace = () => {
    const classes = useStyles()
    const [filterView, setFilterView] = useState(true)
    const toggleFilterView = () => setFilterView(!filterView)

    return (
        <Grid container direction="column">
            <Grid container spacing={2} direction="row" className={classes.gutterBottom} alignContent="center" justifyContent="center">
                <Grid item>
                    <Button className={classes.button} color="primary" variant="contained">List an NFT</Button>
                </Grid>
                <Hidden mdUp>
                    <Grid item>
                        <IconButton onClick={toggleFilterView} size="small"><FilterList/></IconButton>
                    </Grid>
                </Hidden>
                <Grid item className={classes.searchBar}>
                    <SearchBar/>
                </Grid>
                <Hidden smDown>
                    <Grid item>
                        <Button className={classes.button} color="primary" variant="contained">Newest</Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} color="primary" variant="contained">Most Popular</Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} color="primary" variant="contained">Most expensive</Button>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item>
                        <IconButton onClick={toggleFilterView} size="small"><FilterList/></IconButton>
                    </Grid>
                </Hidden>
            </Grid>
            <Collapse in={!filterView}>
                <Grid container className={classes.gutterBottom}>
                    <MarketPlaceFilter/>
                </Grid>
            </Collapse>
            <Grid container spacing={2}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                        <Grid item xs={3} key={index}>
                            <AssetCard title="Some Title" subheader="Some sub header"/>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default MarketPlace