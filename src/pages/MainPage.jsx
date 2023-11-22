import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import React from "react";
import useStyles from "../styles/styles";

const MainPage = () => {

    const classes = useStyles();
    const PAGE_HEADER = "Issues Moderation";

    let pageCount = 10;
    let issueLimitOnPage = 7;

    let  issues= [
        {issueHeader: "Word of the Day", issueAuthorAndDate:"Author 21.12.12", issueCategory: "Category", issueStreet:"Well meaning and kindly"},
        {issueHeader: "Word of the Day", issueAuthorAndDate:"Author 21.12.12", issueCategory: "Category", issueStreet:"Well meaning and kindly"},
        {issueHeader: "Word of the Day", issueAuthorAndDate:"Author 21.12.12", issueCategory: "Category", issueStreet:"Well meaning and kindly"},
        {issueHeader: "Word of the Day", issueAuthorAndDate:"Author 21.12.12", issueCategory: "Category", issueStreet:"Well meaning and kindly"},
        {issueHeader: "Word of the Day", issueAuthorAndDate:"Author 21.12.12", issueCategory: "Category", issueStreet:"Well meaning and kindly"},

    ]


    return (
        <Grid item xs={10}>
            <Grid container spacing={1} className={classes.topHeader}>
                <Grid item xs={4}>
                    <Typography variant={'h5'}>
                        {PAGE_HEADER}
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
                        <FormControl sx={{maxWidth: 100}} fullWidth size={'small'}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-s select-label"
                                id="demo-simple-select"
                                label="Sort"
                            >
                                <MenuItem value={10}>Latest</MenuItem>
                                <MenuItem value={20}>Moderated</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container spacing={1}>
                {issues.map( (issue) => (
                    <Grid item xs={10}>
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Box display={'flex'}>
                                    <Grid item xs={6} md={12}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {issue.issueHeader}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={1}>
                                        <Box className={classes.cardIconStateContainer}>
                                            <ErrorRoundedIcon className={classes.leftMenuIconStyle}/>
                                        </Box>
                                    </Grid>
                                </Box>


                                <Typography variant="body2">
                                    {issue.issueStreet}
                                    <br/>
                                </Typography>
                                <Box display={'flex'}>
                                    <Grid item xs={6} md={12}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" variant={'subtitle2'}
                                                    gutterBottom>
                                            {issue.issueAuthorAndDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={1}>
                                        <Typography align="center" sx={{fontSize: 14}} color="text.secondary"
                                                    variant={'subtitle2'} gutterBottom>
                                            {issue.issueCategory}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href='/issue'>More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={10}>
                    <Pagination count={pageCount} className={classes.testAlignCenter}/>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default MainPage;