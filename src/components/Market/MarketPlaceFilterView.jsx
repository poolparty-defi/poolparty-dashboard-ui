import {Checkbox, Grid, MenuItem} from "@material-ui/core";
import {SelectController} from "../Controls/SelectController";
import useForm from "../../hooks/useForm";
import {useContext} from "react";
import MarketPlaceContext from "./MarketPlaceContext";

const raffleOptions = [
    "Newly listed", "Stable", "Pending de-list", "De-listed", "Expires soon", "Ending", "Ended"
].map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)

const rarityOptions = [
    "Common", "Uncommon", "Rare", "Super rare", "Ultra rare", "One of a kind"
].map(rarity => <MenuItem key={rarity} value={rarity}>{rarity}</MenuItem>)

const poolSizeOptions = [
    "Empty", "Low", "Medium", "High", "Full"
].map(poolSize => <MenuItem key={poolSize} value={poolSize}>{poolSize}</MenuItem>)

const filterInputs = {
    raffle: {
        value: "Newly listed"
    },
    rarity: {
        value: "Common"
    },
    poolSize: {
        value: "Empty"
    }
}

export const MarketPlaceFilterView = () => {
    const {errors, inputEvents, values} = useForm(filterInputs);
    const {setRaffleFilter, setRarityFilter, setPoolSizeFilter, setVerifiedFilter} = useContext(MarketPlaceContext)

    setRaffleFilter(values.raffle)
    setRarityFilter(values.rarity)
    setPoolSizeFilter(values.poolSize)

    return (
        <Grid item container spacing={2} justifyContent="center">
            <Grid item>
                <SelectController
                    fullWidth
                    name="raffle"
                    label="Raffle Status"
                    variant="outlined"
                    options={raffleOptions}
                    value={values.raffle}
                    {...inputEvents}
                    errors={errors}
                />
            </Grid>
            <Grid item>
                <SelectController
                    fullWidth
                    name="rarity"
                    label="Rarity"
                    variant="outlined"
                    options={rarityOptions}
                    value={values.rarity}
                    {...inputEvents}
                    errors={errors}
                />
            </Grid>
            <Grid item>
                <SelectController
                    fullWidth
                    name="poolSize"
                    label="Pool size"
                    variant="outlined"
                    options={poolSizeOptions}
                    value={values.poolSize}
                    {...inputEvents}
                    errors={errors}
                />
            </Grid>
            <Grid item>
                <Checkbox
                    label="Verified"
                    onChange={(event) => setVerifiedFilter(event.target.checked)}
                />
            </Grid>
        </Grid>
    )
}