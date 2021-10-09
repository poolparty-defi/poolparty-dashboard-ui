import {createTheme} from "@material-ui/core";

const theme = isDark => createTheme({
    palette: {
        type: isDark ? "dark" : "light",
        primary: {main: "#93E9BE"},
        secondary: {main: "#CD2155"},
        fontColor: "#483C32"
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;