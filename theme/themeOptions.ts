import { createTheme } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

const theme = createTheme({
    palette: {
      primary: {
        main: blue[50],
      },
      secondary: {
        main: cyan[500],
      },
    },
});

export default theme