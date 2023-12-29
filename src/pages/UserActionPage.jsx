import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Alert, Box, Button, Snackbar} from "@mui/material";
import React, {useEffect, useState, useContext} from "react";
import useStyles from "../styles/styles";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {API_BASE} from "../apis/apis";
import AuthContext from "../apis/context/AuthProvider";


const UserActionPage = () => {

    const params = new URLSearchParams(window.location.search);

    const [flag, setFlag] = useState(false)
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({status:'', name:'', description:'', photo:''})
    const [role, setRole] = useState(params.get('role'))
    const [id, setId] = useState(params.get('id'))
    const classes = useStyles();
    const { auth } = useContext(AuthContext)



    const getUserInfo = () => {
        axios.get(`${API_BASE}/${role}/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }).then(res => {
            console.log(res.data)
            setUser({status:res.data['status'], name:res.data['firstName'] + ' ' + res.data['lastName'], description:"", photo:res.data['photo']})
        }).catch(error => console.log(error))
    }

    const handleClickOpen = () => {
        axios.put(`${API_BASE}/${role}/${id}`, {
            status:flag ? "ACTIVE" : "BLOCKED", name:user.name, description:user.description, photo:user.photo}).then(res => {  setFlag(!flag)})
        setOpen(true);
        setFlag(!flag)
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getUserInfo()
    },[flag]);

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
                                        <Typography variant="h6" component="div">Name: {user.name}</Typography>
                                        <Typography variant="h6" component="div">Role: {role}</Typography>
                                        <Typography variant="h6" component="div">Status: {user.status}</Typography>
                                        <Typography variant="h6" component="div">Info: {user.description}</Typography>
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