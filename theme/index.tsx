import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { ReactNode } from "react"
import theme from "./themeOptions"

interface Props {
    children: ReactNode
}
const ThemeComponent = (props: Props) => {
    const { children } = props

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeComponent
