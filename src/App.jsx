import React from "react";
import {CssBaseline, Grid,} from '@material-ui/core'
import _Navigation from "./components/_Navigation";
import Login from "./pages/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import _LeftMenu from "./components/_LeftMenu";
import MainPage from "./pages/MainPage";
import IssuePage from "./pages/IssuePage";
import UserActionPage from "./pages/UserActionPage";
import AddUserPage from "./pages/AddUserPage";
import UserModerationPage from "./pages/UserModerationPage";
import {AuthProvider} from "./apis/context/AuthProvider";
import Cookies from "js-cookie";

const isAuthenticated =  () => {
    let token = Cookies.get('token')
    if (token !== undefined) {
        let exp = JSON.parse(token).then(res => res.expires);
        return exp  < new Date().getTime()
    }
    return false;
}

const App = () => {



    return (
        <>
            <Router>
                <CssBaseline/>
                <AuthProvider>
                    <Grid container>
                        <_Navigation/>
                        <_LeftMenu/>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/main" element={<MainPage/>}/>
                            <Route path="/issues/:id" element={<IssuePage/>}/>
                            <Route path="/users" element={<UserModerationPage/>}/>
                            <Route path="/user" element={<UserActionPage/>}/>
                            <Route path="/users/add" element={<AddUserPage/>}/>
                        </Routes>
                    </Grid>
                </AuthProvider>
            </Router>
        </>
    )
    }


export default  App;