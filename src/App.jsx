import React from "react";
import {CssBaseline, Grid,} from '@material-ui/core'
import _Navigation from "./components/_Navigation";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import _LeftMenu from "./components/_LeftMenu";
import MainPage from "./pages/MainPage";
import IssuePage from "./pages/IssuePage";
import UserActionPage from "./pages/UserActionPage";
import AddUserPage from "./pages/AddUserPage";
import UserModerationPage from "./pages/UserModerationPage";
import {AuthProvider} from "./apis/context/AuthProvider";


const App = () => {
    return (
        <>
            <AuthProvider>
                <CssBaseline/>
                <Grid container>
                    <_Navigation/>
                    <_LeftMenu/>
                    <Routes>
                        <Route path="login" element={<Login/>}/>
                        <Route path="main" element={<MainPage/>}/>
                        <Route path="issues" element={<IssuePage/>}/>
                        <Route path="users" element={<UserModerationPage/>}/>
                        <Route path="user" element={<UserActionPage/>}/>
                        <Route path="users/add" element={<AddUserPage/>}/>
                    </Routes>
                </Grid>
            </AuthProvider>
        </>
    )
    }


export default  App;