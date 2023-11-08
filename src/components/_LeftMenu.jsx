import {Grid} from "@material-ui/core";
import {Badge, Box, Button} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import useStyles from "../styles/styles";

const _LeftMenu = () => {

    const classes = useStyles()

    return (
        <Grid item xs={2}>
            <Box className={classes.leftMenuStyle}>
                <div>
                    <Badge badgeContent={1} color="error">
                        <ErrorRoundedIcon className={classes.leftMenuIconStyle} />
                    </Badge>
                    <Button variant="text">Issues</Button>
                </div>
                <div>
                    <PeopleIcon className={classes.leftMenuIconStyle} />
                    <Button variant="text">User management</Button>
                </div>
            </Box>
        </Grid>
    )
}

export default _LeftMenu;