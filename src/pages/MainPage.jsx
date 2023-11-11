import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import React from "react";
import useStyles from "../styles/styles";

const MainPage = () => {

    const classes = useStyles();

    return (
        <Grid  item xs={10}>
            <Grid container spacing={1} className={classes.topHeader}>
                <Grid xs={4} item>
                    <Typography variant={'h5'}>
                        Issues Moderation
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text">To moderate</Button>
                </Grid>
                <Grid item>
                    <Button variant="text">All</Button>
                </Grid>
                <Grid container xs={5} spacing={1} className={classes.topHeaderInputItems}>
                    <Grid item>
                        <TextField id="outlined-basic" label="Search" variant="outlined" size='small'/>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{maxWidth: 100 }} fullWidth size={'small'}>
                            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                            <Select
                                labelId="demo-simple-s select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>


        <Grid container spacing={1} >
            <Grid item xs={10}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Box display={'flex'}>
                            <Grid item xs={6} md={12}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={1}>
                                <Box className={classes.cardIconStateContainer}>
                                    <ErrorRoundedIcon className={classes.leftMenuIconStyle} />
                                </Box>
                            </Grid>
                        </Box>

                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                        </Typography>
                        <Box display={'flex'}>
                            <Grid item  xs={6} md={12}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" variant={'subtitle2'} gutterBottom>
                                    Author
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={1}>
                                <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" variant={'subtitle2'} gutterBottom>
                                    Category
                                </Typography>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href = '/issue'>More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </Grid>
    )

}

export default MainPage;