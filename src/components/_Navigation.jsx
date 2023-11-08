import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import useStyles from "../styles/styles";

const _Navigation = () => {

    const classes = useStyles()

    return (
        <AppBar className={classes.appBar}>
            <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 1 new mails" color="inherit">
                        <AdminPanelSettingsIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )

}

export default _Navigation;