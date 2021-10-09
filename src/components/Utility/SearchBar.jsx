import {IconButton, TextField} from "@material-ui/core";
import {Clear, Search} from "@material-ui/icons";
import {useRef} from "react";

/* TODO: Finish this. */
export const SearchBar = () => {
    const ref = useRef('')

    const clear = () => {
        ref.current.value = ''
    }

    return (
        <TextField
            fullWidth
            onChange={(val) => console.log(val)}
            size="small"
            label="Search"
            variant="outlined"
            InputProps={{
                startAdornment: <Search/>,
                endAdornment: <IconButton onClick={clear} size="small">{<Clear/>}</IconButton>
            }}
            inputRef={ref}
        >

        </TextField>
    )
}

