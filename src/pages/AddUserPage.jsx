import Container from "@mui/material/Container";
import {CssBaseline, Grid, Typography} from "@material-ui/core";

import React, {useEffect, useState} from "react";
import useStyles from "../styles/styles";
import {Box, Button, Divider, FormControl, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import {Copyright} from "@material-ui/icons";

const AddUserPage = () => {


    function handleSubmit(e) {

    }

    return(
        <Grid item xs={10}>
            <Box sx={{marginTop:"10px"}}>
                <Typography variant={"h5"} sx={{textDecoration: 'underline'}} display="inline">Create new user</Typography>
                <Divider />
            </Box>
            <Container component="main" maxWidth={"xs"}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{width:"100%"}}>
                        <Typography variant={"subtitle2"}>Avatar</Typography>
                    </Box>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"start"}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        <Button>
                            Upload image
                        </Button>
                    </Box>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                        defaultValue="pub_serv"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="pub_serv" control={<Radio />} label="Public service" />
                                        <Typography variant={'caption'}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Typography>
                                        <FormControlLabel value="analyst" control={<Radio />} label="Analyst" />
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
                                type="back"
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