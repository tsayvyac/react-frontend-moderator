import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useEffect, useContext } from "react";
import useStyles from "../styles/styles";
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {API_BASE, getAddress, getAxiosInstance} from "../apis/apis";
import axios from "axios";
import AuthContext from "../apis/context/AuthProvider";
import { useLocation } from "react-router-dom";


const IssuePage = () => {

    const author = "Lavin Yakiv";
    const category = "Item";
    const publishedDate = "23.07.2023";
    const issueName = "Issue 000-000-000";
    const issueDescription = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Vestibulum fermentum tortor id mi. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Aliquam in lorem sit amet leo accumsan lacinia. Maecenas lorem. Fusce suscipit libero eget elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Pellentesque arcu. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien.\
Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Nulla est. Praesent vitae arcu tempor neque lacinia pretium. Suspendisse sagittis ultrices augue. Aliquam erat volutpat. Nulla pulvinar eleifend sem. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Ut tempus purus at lorem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";
    const [approveOpened, setApproveOpened] = React.useState(false);
    const [rejectOpened, setRejectOpened] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [errorOpened, setErrorOpened] = React.useState(false);
    const [rejectReason, setRejectReason] = React.useState("")
    const [image, setImage] = React.useState();
    const [address, setAddress] = React.useState("")
    const classes = useStyles();
    const { getToken } = useContext(AuthContext)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const [issue, setIssue] = React.useState({
        author: "",
        address: "",
        category: "",
        publishedDate: "",
        name: "loading...",
        description: "loading...",
        photo:"",
        status:"loading..."
    });
    console.log(params)
    console.log(id);
    const url = API_BASE + '/admin/issues/' + id;
    const getIssue = () => {
        console.log("got here")
       
    }

    const getAuthor =  (uid) => {
        return getAxiosInstance(getToken()).get(`${API_BASE}/admin/residents/${uid}`)
    }

    const getCategory = (id) => {
        return getAxiosInstance(getToken()).get(`${API_BASE}/categories/${id}`)
    }

    const getPhoto = async (localUrl) =>
    {
        const config = { responseType: 'blob' };
        
        await getAxiosInstance(getToken()).get(`${localUrl}?alt=media`, config)
        .then(resp => 
            {
                setImage(URL.createObjectURL(resp.data));
            })
        
        ;
    } 

    const changeTextAreaContent = (e) =>
    {
        setRejectReason(e.target.value)
    }

    const rejectIssue = (id, comment) =>
    {
        const payload = {
            comment: comment
        }
        return getAxiosInstance(getToken()).put(`${API_BASE}/admin/issues/${id}/decline`, payload);

    } 

    const approveIssue = (id) =>
    {
        return getAxiosInstance(getToken()).put(`${API_BASE}/admin/issues/${id}/approve`);
    } 



    const getIssues = async () => 
    {
        const response = await getAxiosInstance(getToken()).get(url)
        const authorResponce = await getAuthor(response.data.authorUid);
        const categoryResp = await getCategory(response.data.categoryId);
        const author = authorResponce.data.firstName + " " + authorResponce.data.lastName;
        const category = categoryResp.data.name;
        console.log(response)
        if (response.data.photo!=null)
        {
            const photo = getPhoto(response.data.photo);

            console.log(photo)
        }

        console.log(response)
        getAddress(response.data.coordinates.longitude, response.data.coordinates.latitude)
            .then(resp => {
                setAddress(resp.data.features[0].place_name)
                console.log(resp)
            })

        setIssue(
            {
                author: author,
                address: address,
                category: category,
                publishedDate: response.data.creationDate,
                name:response.data.title,
                description:response.data.description,
                photo:response.data.photo,
                status:response.data.status
            }
        )
        console.log(author)
    }

    useEffect(() => {
        console.log("got here")
/*
        axios.get(url, {
            headers: {
            'Authorization': `Bearer ${getToken()}`
        }})
            .then(responce => {
                console.log(responce.data.categoryId)
                let issueTemp = 
                {
                    author: "Author",
                    address: "Address",
                    category: responce.data.categoryId,
                    publishedDate: responce.data.creationDate,
                    name: responce.data.title,
                    description: responce.data.description,
                    url: responce.data.photo
                }
                axios.get(API_BASE+'/residents/'+responce.data['authorUid'], {
                    headers: {
                    'Authorization': `Bearer ${getToken()}`
                }}).
                then(r => {
                    const name = r.data.firstName + ' ' + r.data.lastName;
                    issueTemp.author = name;
                    setIssue(issueTemp);
                })
                console.log(issueTemp)                
            }
            )
            .catch(e => console.log("Can not fetch"));*/
            getIssues()
    }, [url])


    
    const approve = async () => { 
        const response = await approveIssue(id);
        console.log(response);
        if (Math.floor(response.status/100) == 2)
        {
            setApproveOpened(true);
        }
        else
        {
            console.log(response.status)
            setErrorOpened(true);
        } 
    }
    const reject = async () => {
        console.log(rejectReason);
        const response = await rejectIssue(id, rejectReason);
        if(Math.floor(response.status/100) == 2)
        {
            setDialogOpen(false);
            setRejectOpened(true);    
        }
        else
        {
            console.log(response.status)
            setErrorOpened(true);
        }
    }

    return (
        <Grid item xs={9} >
            <Snackbar
                sx={{ width: '80%' }}
                open={approveOpened}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={() => setApproveOpened(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setApproveOpened(false)} variant="filled" severity="success" sx={{ width: '80%' }}>
                    Issue approved
                </Alert>
            </Snackbar>
            <Snackbar
                sx={{ width: '80%' }}
                open={errorOpened}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={() => setErrorOpened(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorOpened(false)} variant="filled" severity="error" sx={{ width: '80%' }}>
                    Action was not successfull
                </Alert>
            </Snackbar>
            <Snackbar
                sx={{ width: '80%' }}
                open={rejectOpened}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={() => setRejectOpened(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setRejectOpened(false)} variant="filled" severity="success" sx={{ width: '80%' }}>
                    Issue rejected
                </Alert>
            </Snackbar>
            <Grid container spacing={1} className={classes.topHeader}>

                <Typography variant={'h4'}>
                    {issue.name}
                </Typography>

            </Grid>
            <Grid container spacing={8}>
                <Grid item>
                    <Card style={{ maxWidth: 550 }}>
                        <CardMedia
                            component="img"
                            height='256px'
                            alt="Issue problem"
                            src={image}
                            fit="contain"
                        />

                        <CardHeader title="Description" />
                        <CardContent>
                            <Typography variant="body2">{issue.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card style={{ minWidth: 430, maxWidth: 500 }}  >
                        <CardHeader title="Information" />
                        <CardContent>
                            <Typography variant="body2">Author: {issue.author}</Typography>
                            <Typography variant="body2">Address: {address}</Typography>
                            <Typography variant="body2">Category: {issue.category}</Typography>
                            <Typography variant="body2">Created: {issue.publishedDate}</Typography>
                            <Chip label={issue.status} sx={{ mt: 2 }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={10} spacing={1} className={classes.buttonGrid}>
                    <Grid container className={classes.buttonSmallContainer}>
                        <Button variant="contained" onClick={() => setDialogOpen(true)}>Reject</Button>
                        <Button variant="contained" onClick={approve}>Approve</Button>
                        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
                            fullWidth={true}
                        >
                            <DialogTitle>Reject</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Provide the reason why this issue is rejected
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="issuecomment"
                                    label="Issue comment"
                                    fullWidth
                                    variant="standard"
                                    multiline
                                    rows='3'
                                    onChange={changeTextAreaContent}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                                <Button onClick={reject}>Reject issue</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

    )
}

export default IssuePage;