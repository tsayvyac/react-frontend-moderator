import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField
} from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import React, {useContext, useEffect, useState} from "react";
import useStyles from "../styles/styles";
import {Link} from "react-router-dom";
import axios from 'axios';
import {API_BASE} from "../apis/apis";
import Cookies from "js-cookie";
import * as apis from "../apis/apis";
import AuthContext from "../apis/context/AuthProvider";



//API key: AIzaSyC6-kPQq0Hv7gacfZ_1NenpyS_a1ahV910
// Map id: 8682b82c7c8bf444
// npx json-server --watch apis/data/db.json --port 8000
//{
//     "email": "moderator@better-city.mikita.dev",
//     "password": "12345678",
//     "returnSecureToken": true
// }
const MainPage = () => {

    const classes = useStyles();
    const { auth } = useContext(AuthContext)

    let search = window.location.search;
    const params = new URLSearchParams(search);
    if(!params.get('page')) {
        params.set('page', '0')
        window.history.pushState({page:params.toString()} , null, '?page=0')
    }

    // todo change impl depends on real api
    let issuesLimitOnPage = 5;
    const [isLoading, setIsLoading] = useState(true)
    const [sortState, setSortState] = useState("none")
    const [toModerate, setToModerate] = useState(false);
    const [page, setPage] = useState(parseInt(params.get('page')))
    const [searchState, setSearchState] = useState("")
    const [issues, setIssues] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        document.title = toModerate ? 'To moderate' : 'All'
        axios.get(buildURI(), {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setIssues(response.data.issues)
                setTotalPages(Math.ceil(response.data.totalPages/issuesLimitOnPage))
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }, [issuesLimitOnPage, page, toModerate, sortState, searchState]);

    function buildURI() {
        let uri = `${API_BASE}/issues?size=${issuesLimitOnPage}&page=${page}`
        if(toModerate) {
            uri += "&statuses=MODERATION"
        }
        // if(sortState === 'visited') {
        //     uri += "&isVisited=false"
        // }
        if(sortState === 'latest') {
            uri += "&order-by=CREATION_DATE&order=DESC"
        }
        if(searchState.length !== 0) {
            uri += `&title_like=${searchState}`
        }
        return uri;
    }

    function setIsVisited(issueId) {
        //todo setIsVisited via API
    }


    function setToModerateHandler(toMod) {
        setToModerate(toMod)
        setPageHandler(1, toMod)
    }

    function setPageHandler(page) {
        let pg = parseInt(params.get('page'))
        window.history.replaceState({page:pg.toString()}, null, '?page='+page-1)
        setPage(page)
    }

    function searchHandler(title) {
        setSearchState(title)
    }

   function filterHandler(val) {
       setSortState(val)
   }

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
        <Grid  item xs={9}>
            <Grid container spacing={1} className={classes.topHeader}>
                <Grid item xs={4}>
                    <Typography variant={'h5'}>
                        Issues Moderation
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => setToModerateHandler(true)}>To moderate</Button>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => setToModerateHandler(false)}>All</Button>
                </Grid>
                <Grid container xs={5} spacing={1} className={classes.topHeaderInputItems}>
                    <Grid item>
                        <TextField id="outlined-basic" label="Search" onChange={(e) => searchHandler( e.target.value)} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{maxWidth: 100}} fullWidth size={'small'}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-s select-label"
                                id="demo-simple-select"
                                label="Sort"
                                defaultValue = "none"
                                onChange={(e) =>{filterHandler(e.target.value)}}
                            >
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={'latest'}>Latest</MenuItem>
                                <MenuItem value={'visited'}>Not visited</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container spacing={1}>
                {issues.map( (issue) => (
                    <Grid item xs={10} key={issue.id}>
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Box display={'flex'}>
                                    <Grid item xs={6} md={12}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {issue.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={1}>
                                        <Box className={classes.cardIconStateContainer}>
                                            {!issue.isVisited ? <ErrorRoundedIcon className={classes.leftMenuIconStyle}/>:''}
                                        </Box>
                                    </Grid>
                                </Box>
                                <Typography variant="body2">
                                    TEST street
                                    <br/>
                                </Typography>
                                <Box display={'flex'}>
                                    <Grid item xs={6} md={12}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" variant={'subtitle2'}
                                                    gutterBottom>
                                            {`${issue.authorId} ${issue.creationDate}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={1}>
                                        <Typography align="center" sx={{fontSize: 14}} color="text.secondary"
                                                    variant={'subtitle2'} gutterBottom>
                                            {issue.category}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"><Link to={'/issues?id='+issue.id}>More</Link></Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={10}>
                    <Pagination count={totalPages} page={page} onChange={(e) =>{ setPageHandler(parseInt(e.nativeEvent.target.innerText))}} className={classes.testAlignCenter}/>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default MainPage;