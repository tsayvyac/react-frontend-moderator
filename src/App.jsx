import React  from "react";
import {
    CssBaseline, Grid,
} from '@material-ui/core'
import _Navigation from "./components/_Navigation";
import Login from "./pages/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import _LeftMenu from "./components/_LeftMenu";
import MainPage from "./pages/MainPage";
import IssuePage from "./pages/IssuePage";
import UserModerationPage from "./pages/UserModerationPage";

const App = () => {

    return (
        <>
            <Router>
                <CssBaseline />
                <Grid container>
                    <_Navigation />
                    <_LeftMenu />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/issue" element={<IssuePage />} />
                        <Route path="/users" element={<UserModerationPage />} />
                    </Routes>
                </Grid>
            </Router>
        </>
    )
}


export default  App;