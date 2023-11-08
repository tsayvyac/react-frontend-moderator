import React  from "react";
import {
    CssBaseline, Grid,
} from '@material-ui/core'
import _Navigation from "./components/_Navigation";
import _LeftMenu from "./components/_LeftMenu";
import MainPage from "./pages/MainPage";



const App = () => {

    return (
        <>
            <CssBaseline/>
            <_Navigation/>
            <Grid container>
                <_LeftMenu/>
                <MainPage/>
            </Grid>
        </>
    )
}


export default  App;