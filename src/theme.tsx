import { createMuiTheme } from "@material-ui/core";

const headerFonts = { fontFamily: ["Raleway", "sans serif"].join(",") };
const bodyFonts = { fontFamily: ["sans-serif"].join(",") };

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
  typography: {
    ...headerFonts,
    h1: { color: "#fff" },
    body1: bodyFonts,
    body2: bodyFonts
  },
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      md: 720
    }
  },
  palette: {
    primary: {
      main: "#fff"
    }
  }
});
