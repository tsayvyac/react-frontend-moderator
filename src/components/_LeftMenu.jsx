import {Grid} from "@material-ui/core";
import {Badge, Box, Button} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import useStyles from "../styles/styles";
import {useNavigate} from "react-router-dom";

const _LeftMenu = () => {
    const nav = useNavigate();
    const classes = useStyles()
    const handleUsers = () => {
        nav('/users');
    };
    const handleIssues = () => {
        nav('/main');
    };

    return (
        <Grid item xs={2} elevation={3} style={{ position: "sticky"}}>
            <Box className={classes.leftMenuStyle}>
                <div>
                    <Badge badgeContent={1} color="error">
                        <ErrorRoundedIcon className={classes.leftMenuIconStyle} />
                    </Badge>
                    <Button variant="text" onClick={handleIssues}>Issues</Button>
                </div>
                <div>
                    <PeopleIcon className={classes.leftMenuIconStyle} />
                    <Button variant="text" onClick={handleUsers}>User management</Button>
                </div>
            </Box>
        </Grid>
    )
}

export default _LeftMenu;