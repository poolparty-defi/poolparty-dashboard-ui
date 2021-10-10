import {Button, Collapse, Grid, Hidden, IconButton, makeStyles} from "@material-ui/core";
import {FilterList} from "@material-ui/icons";
import {SearchBar} from "../Utility/SearchBar";
import {useState} from "react";
import {MarketPlaceFilterView} from "./MarketPlaceFilterView";
import AssetCard from "../AssetCard/AssetCard";
import MarketPlaceContext from "./MarketPlaceContext";

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

    /* These states represent filters. TODO: use states to filter things out. */
    const [raffle, setRaffleFilter] = useState("Newly listed")
    const [rarity, setRarityFilter] = useState("Common")
    const [poolSize, setPoolSizeFilter] = useState("Empty")
    const [verified, setVerifiedFilter] = useState(true)
    /* End of filter states. */

    return (
        <MarketPlaceContext.Provider value={{setRaffleFilter, setRarityFilter, setPoolSizeFilter, setVerifiedFilter}}>
            <Grid container direction="column">
                <Grid container spacing={2} direction="row" className={classes.gutterBottom}>
                    <Grid item>
                        <Button className={classes.button} color="primary" variant="contained">List an NFT</Button>
                    </Grid>
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
                    <Grid item>
                        <IconButton onClick={toggleFilterView} size="small"><FilterList/></IconButton>
                    </Grid>
                </Grid>
                <Collapse in={!filterView}>
                    <Grid container spacing={2} className={classes.gutterBottom}>
                        <MarketPlaceFilterView/>
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
        </MarketPlaceContext.Provider>
    )
}

export default MarketPlace