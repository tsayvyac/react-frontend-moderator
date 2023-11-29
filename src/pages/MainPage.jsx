import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import React, {useEffect, useState} from "react";
import useStyles from "../styles/styles";
import {Link} from "react-router-dom";

const MainPage = () => {

    let search = window.location.search;
    const params = new URLSearchParams(search);
    if(!params.get('page')) {
        params.set('page', '1')
        window.history.pushState({page:params.toString()} , null, '?page=1')
    }

    function getCompareDateFn() {
        return function (a, b) {
            return new Date(b.issueDate) - new Date(a.issueDate);
        };
    }

    // todo get specified amount of issues each time when number of page in pagination was changed
    function getIssues(param) {
        // todo only for test
        let  issues= [
            {id: 4, issueHeader: "Word of the Day", issueAuthor:"Author",  issueDate: '2022-01-16', issueCategory: "Category", issueStreet:"Well meaning and kindly", isModerated: true, isVisited: true},
            {id: 5,issueHeader: "Word of the Week", issueAuthor:"Author",  issueDate: '2022-01-17', issueCategory: "Category", issueStreet:"Well meaning and kindly", isModerated: false, isVisited: false},
            {id: 1, issueHeader: "Word of the Month", issueAuthor:"Author",  issueDate: '2022-01-11', issueCategory: "Category", issueStreet:"Well meaning and kindly", isModerated: false, isVisited: false},
            {id: 2, issueHeader: "Word of the Year", issueAuthor:"Author",  issueDate: '2022-01-14', issueCategory: "Category", issueStreet:"Well meaning and kindly", isModerated: false, isVisited: false},
            {id: 3,issueHeader: "Word of the Decade", issueAuthor:"Author",  issueDate: '2022-01-12', issueCategory: "Category", issueStreet:"Well meaning and kindly", isModerated: true, isVisited: true},
            { id: 6, issueHeader: "Topic of the Day", issueAuthor: "Author", issueDate: "2023-11-28", issueCategory: "Category", issueStreet: "Meaningful and insightful", isModerated: true, isVisited: true },
            { id: 7, issueHeader: "Topic of the Week", issueAuthor: "Author", issueDate: "2023-11-29", issueCategory: "Category", issueStreet: "Meaningful and insightful", isModerated: false, isVisited: false },
            { id: 8, issueHeader: "Topic of the Month", issueAuthor: "Author", issueDate: "2023-11-21", issueCategory: "Category", issueStreet: "Meaningful and insightful", isModerated: false, isVisited: false },
            { id: 9, issueHeader: "Topic of the Year", issueAuthor: "Author", issueDate: "2023-11-24", issueCategory: "Category", issueStreet: "Meaningful and insightful", isModerated: false, isVisited: false },
            { id: 10, issueHeader: "Topic of the Decade", issueAuthor: "Author", issueDate: "2023-11-22", issueCategory: "Category", issueStreet: "Meaningful and insightful", isModerated: true, isVisited: true },
            { id: 11, issueHeader: "Discovery of the Day", issueAuthor: "Author", issueDate: "2023-11-30", issueCategory: "Exploration", issueStreet: "Fascinating and enlightening", isModerated: true, isVisited: true },
            { id: 12, issueHeader: "Invention of the Week", issueAuthor: "Author", issueDate: "2023-12-01", issueCategory: "Innovation", issueStreet: "Ingenious and groundbreaking", isModerated: false, isVisited: false },
            { id: 13, issueHeader: "Achievement of the Month", issueAuthor: "Author", issueDate: "2023-12-05", issueCategory: "Success", issueStreet: "Noteworthy and commendable", isModerated: false, isVisited: false },
            { id: 14, issueHeader: "Event of the Year", issueAuthor: "Author", issueDate: "2023-12-10", issueCategory: "Celebration", issueStreet: "Memorable and festive", isModerated: false, isVisited: false },
            { id: 15, issueHeader: "Milestone of the Decade", issueAuthor: "Author", issueDate: "2023-12-15", issueCategory: "Progress", issueStreet: "Significant and transformative", isModerated: true, isVisited: true }
        ].sort(getCompareDateFn())
        return issues
    }

    function setIsVidited(issueId) {
        //todo setIsVisited via API
    }

    function getIssuesAreNotVisited(issues) {
        return issues.filter(issue =>  !issue.isVisited)
    }

    function getToModerateIssues(issues) {
        return issues.filter(issue => !issue.isModerated)
    }

    function getSpecifiedQuantityOfIssues(issues, from, to) {
        return getIssues().slice(from, to)
    }

    function getSortedIssueByDate(issues) {
        return issues.sort((a,b) => a.issueDate.localeCompare(b.issueDate))
    }

    function getPageCount(all, page) {
        // todo only for test
        return Math.ceil(all/page)
    }

    function searchIssuesByNameLike(issues, name) {
        console.log(tempIssues)
        return issues.filter(issue => issue.issueHeader.toLowerCase().includes(name.toLowerCase()))
    }

    const classes = useStyles();
    const PAGE_HEADER = "Issues Moderation";
    const [toModerate, setToModerate] = useState(false);
    const [page, setPage] = useState(parseInt(params.get('page')))
    let issuesLimitOnPage = 5;
    let tempIssues = getSpecifiedQuantityOfIssues(getIssues(), 0, issuesLimitOnPage)
    const [issuesToView, setIssuesToView] = useState(getSpecifiedQuantityOfIssues(getIssues(), 0, issuesLimitOnPage))
    let pageCount = getPageCount(getIssues().length, issuesLimitOnPage);


    function setToModerateW(mod) {
        setToModerate(mod)
        setPageW(1)
    }

    function setPageW(page) {
        let p = params.get('page')
        window.history.replaceState({page:p.toString()}, null, '?page='+page)
        setPage(page)
        if(toModerate)
            setIssuesToView(getToModerateIssues(getSpecifiedQuantityOfIssues(tempIssues,((page-1)*issuesLimitOnPage), (page*issuesLimitOnPage))))
        else
            setIssuesToView(getSpecifiedQuantityOfIssues(tempIssues,((page-1)*issuesLimitOnPage), (page*issuesLimitOnPage)))
        tempIssues = issuesToView
    }

   function filterHandler(val) {
        switch (val){
            case 'latest': setIssuesToView(getSortedIssueByDate(tempIssues))
                break
            case 'visited': setIssuesToView(getIssuesAreNotVisited(tempIssues))
                break
        }
   }

    useEffect(() => {
        document.title = toModerate ? 'To moderate' : 'All'
    }, [toModerate]);



    return (
        <Grid  item xs={10}>
            <Grid container spacing={1} className={classes.topHeader}>

                <Grid item xs={4}>
                    <Typography variant={'h5'}>
                        {PAGE_HEADER}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => setToModerateW(true)}>To moderate</Button>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => setToModerateW(false)}>All</Button>
                </Grid>
                <Grid container xs={5} spacing={1} className={classes.topHeaderInputItems}>
                    <Grid item>
                        <TextField id="outlined-basic" label="Search" onChange={(e) => setIssuesToView(searchIssuesByNameLike(tempIssues, e.target.value))} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{maxWidth: 100}} fullWidth size={'small'}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-s select-label"
                                id="demo-simple-select"
                                label="Sort"
                                defaultValue = "none"
                                onChange={(e) =>{ filterHandler(e.target.value)}}
                            >
                                <MenuItem style={{ display: "none" }} value={'none'}>None</MenuItem>
                                <MenuItem value={'latest'}>Latest</MenuItem>
                                <MenuItem value={'visited'}>Not visited</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container spacing={1}>
                {issuesToView.map( (issue) => (
                    <Grid item xs={10} key={issue.id}>
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
                                            {!issue.isVisited ? <ErrorRoundedIcon className={classes.leftMenuIconStyle}/>:''}
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
                                            {`${issue.issueAuthor} ${issue.issueDate}`}
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
                                <Button size="small"><Link to={'/'+issue.id}>More</Link></Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={10}>
                    <Pagination count={pageCount} page={page} onChange={(e) =>{ setPageW(e.nativeEvent.target.innerText)}} className={classes.testAlignCenter}/>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default MainPage;