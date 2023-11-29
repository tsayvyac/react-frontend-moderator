import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {
    Alert,
    Box,
    Button,
    Snackbar
} from "@mui/material";
import React, {useEffect, useState} from "react";
import useStyles from "../styles/styles";
import Avatar from "@mui/material/Avatar";

const UserActionPage = () => {

    const [flag, setFlag] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    const username = "lol";
    const role  = "service";
    const publicatedIssues = 3;

    useEffect(() => {
        console.log('Action with user')
    }, [flag]);

    const handleClickOpen = () => {
        setFlag(!flag)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Grid item xs={8}>
                <Card className={classes.userActionCardStyle}>
                    <CardContent>
                        <Grid container irection="column" spacing={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Box className={classes.mainBoxInCard}>
                                        <Avatar alt="Remy Sharp" src="../img/banana.jpg"  sx={{ width: 120, height: 120 }}/>
                                    </Box>

                                </Grid>
                                <Grid  xs={6} item>
                                    <Box>
                                        <Typography variant="h6" component="div">Name: {username}</Typography>
                                        <Typography variant="h6" component="div">Role: {role}</Typography>
                                        <Typography variant="h6" component="div">Status: {flag ? "Banned" : "Not banned"}</Typography>
                                        <Typography variant="h6" component="div">Publicated Issues: {publicatedIssues}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid xs={4} item>
                            <CardActions>
                                    <Button size="small" sx={{marginTop:10}} onClick={() => handleClickOpen()}>{flag ? "Unblock" : "Block"}</Button>
                            </CardActions>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  sx={{width:"67vw"}} anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}>

                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' , backgroundColor:"lightblue"}}>
                            User was {flag ? "blocked" : "unblocked"}
                        </Alert>
                    </Snackbar>
        </React.Fragment>
    )
}

export default UserActionPage;