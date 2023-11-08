import React  from "react";
import {
    CssBaseline, Grid,
} from '@material-ui/core'
import _Navigation from "./components/_Navigation";
import Login from "./pages/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import _LeftMenu from "./components/_LeftMenu";
import MainPage from "./pages/MainPage";

const App = () => {

    return (
        <>
            <Router>
                <CssBaseline />
                <Grid container>
                    <_Navigation />
                    <_LeftMenu />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/main" element={<MainPage />} />
                    </Routes>
                </Grid>
            </Router>
        </>
    )
}


export default  App;