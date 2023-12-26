import Container from "@mui/material/Container";
import {Grid, Typography} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';

import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    Snackbar,
    TextField
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {API_BASE} from "../apis/apis";
import axios from "axios";
import {validateEmail} from "./Login";

const AddUserPage = () => {

    

    const [msg, setMsg] = useState("User was created")
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('NONE-ERROR')


    function validateFields (email, bio, pass, name) {
        if(!email || !bio || !pass || !name) setError('Fill all fields')
        else if(!validateEmail(email)) setError('Email format is invalid')
        else if(pass.length < 8) setError('Password must be at least 8 characters long')
        else {
            setError('NONE-ERROR')
            return true
        }
        return false
    }
    function handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData(e.currentTarget);
        let user = {
            name: formData.get('firstName'),
            password: formData.get('password'),
            email: formData.get('email'),
            description: formData.get('bio')
        }
        if(validateFields(user.email, user.description, user.password, user.name)){
            let role = formData.get('radio-buttons-group')
            axios.post(buildURI(role), JSON.stringify(user))
                .then(res => {
                    setOpen(true)
                }).catch(error => {
                setMsg(error)
                setOpen(true)
            })
        }
    }

    function handleClose(e) {
        setOpen(false)
    }

    function buildURI(role) {
        return `${API_BASE}/${role}?`;
    }


    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
    }, [msg]);

    return(
        <Grid item xs={10}>
            <Box sx={{marginTop:"10px"}}>
                <Typography variant={"h5"} sx={{textDecoration: 'underline'}} display="inline">Create new user</Typography>
                <Divider />
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />

            <Container component="main" maxWidth={"xs"}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Box sx={{
                            marginBottom: 2,
                            display: error === 'NONE-ERROR' ? 'none' : 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent:'center',
                            backgroundColor:'#EE4B2B',
                            width:"100%",
                            height:"35px",
                            borderRadius:"5px",
                        }}>
                            <Typography sx={{fontSize:"13px", color:"white"}}>{error}</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline={true}
                                    rows={5}
                                    required
                                    fullWidth
                                    id="bio"
                                    label="Bio"
                                    name="bio"
                                    autoComplete="bio"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-start">
                            <Grid xs={12} item>
                                <FormControl sx={{marginTop:"20px"}}>
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontWeight:"bolder"}}>Select user's type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="services"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="services" control={<Radio />} label="Public service" />
                                        <Typography variant={'caption'}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Typography>
                                        <FormControlLabel value="analysts" control={<Radio />} label="Analyst" />
                                        <Typography variant={'caption'}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Typography>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                            >
                                Submit
                            </Button>
                            <Button
                                type="reset"
                                onClick={() => window.location = '/main'}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                            >
                                Back
                            </Button>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </Grid>

    );



}
export default AddUserPage;