import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Alert, Box, Button, CircularProgress, Snackbar} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import useStyles from "../styles/styles";
import Avatar from "@mui/material/Avatar";
import {API_BASE, getAxiosInstance} from "../apis/apis";
import AuthContext from "../apis/context/AuthProvider";
import {useLocation} from "react-router-dom";

// "udpUdj2B6sVbS8vKEb5Kwnq0ay83"
//"ugtH9D6UgMVzJcw4zlYvWnvn2fp2"
const UserActionPage = () => {


    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { getToken } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({status:'', name:'', description:'', photo:''})
    const [role, setRole] = useState(params.get('role'))
    const [id, setId] = useState(params.get("uid"))
    const [updateInfo, setUpdateInfo] = useState(true)
    const classes = useStyles();



    const getUserInfo = async () => {
        await getAxiosInstance(getToken()).get(`${API_BASE}/admin/${role}/${id}`)
            .then(res => {
                return res
            })
            .then(async procRes => {
                const config = { responseType: 'blob' };
                await getAxiosInstance(getToken())
                    .get(`${procRes.data.photo}?alt=media`, config)
                    .then( blobFile => {
                        setUser({
                            status: procRes.data.status,
                            name: procRes.data.name,
                            description: procRes.data.description,
                            photo:URL.createObjectURL(blobFile.data)
                        })
                        setIsLoading(false)
                    })
            })
            .catch(error => console.log(error))
    }

    const handleClickOpen = () => {
        getAxiosInstance(getToken()).patch(`${API_BASE}/admin/${role}/${id}`
        ,{status:isBanned() ? "ACTIVE" : "BANNED"
            })
            .then(res => {
                setOpen(true);
                getUserInfo()
                setUpdateInfo(true)
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isBanned = () => {
        return user.status.localeCompare("BANNED") === 0;
    }

    useEffect(() => {
        if(updateInfo){
            getUserInfo()
            setUpdateInfo(false)
        }
    },[user, updateInfo]);

    if(isLoading) {
        return (
            <Grid  item xs={10}>
                <Box sx={{display: 'flex', justifyContent: 'center', height:"80%", alignItems:"center"}}>
                    <CircularProgress size={110}/>
                </Box>
            </Grid>
        );
    }



    return (

        <React.Fragment>
            <Grid item xs={8}>
                <Card className={classes.userActionCardStyle}>
                    <CardContent>
                        <Grid container irection="column" spacing={2}>

                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Box className={classes.mainBoxInCard}>
                                        <Avatar alt="Remy Sharp" src={user.photo} sx={{ width: 120, height: 120 }}/>
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
                                    <Button size="small" sx={{marginTop:10}} onClick={handleClickOpen}>{isBanned() ? "Unblock" : "Block"}</Button>
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
                            User was {isBanned() ? "blocked" : "unblocked"}
                        </Alert>
                    </Snackbar>
        </React.Fragment>
    )
}

export default UserActionPage;