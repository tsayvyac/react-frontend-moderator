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
import {Link, useNavigate} from "react-router-dom";
import {API_BASE, getAxiosInstance} from "../apis/apis";
import AuthContext from "../apis/context/AuthProvider";
import { useLocation } from 'react-router-dom';


//API key: AIzaSyC6-kPQq0Hv7gacfZ_1NenpyS_a1ahV910
// Map id: 8682b82c7c8bf444
//     "email": "moderator@better-city.mikita.dev",
//     "password": "12345678",
//     "returnSecureToken": true
// }
const MainPage = () => {
    const location = useLocation();
    const nav = useNavigate()
    const params = new URLSearchParams(location.search);
    const classes = useStyles();
    const issuesLimitOnPage = 5;
    const [isLoading, setIsLoading] = useState(true)
    const [sortState, setSortState] = useState("none")
    const [toModerate, setToModerate] = useState(false);
    const [page, setPage] = useState(params.get('page') || 1)
    const [searchState, setSearchState] = useState("")
    const [issues, setIssues] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [changes, setChanges] = useState(true)
    const { getToken } = useContext(AuthContext)


    const checkParams = ()=> {
        if (!params.has('page')) {
            nav(`?page=1`);
        } else {
            let fromParam = params.get('page');
            fromParam = parseInt(fromParam) <= 0 ? '1' : fromParam;
            fromParam = parseInt(fromParam) >= totalPages ? totalPages : fromParam;
            setPageHandler(fromParam)
        }
    }

    useEffect( () => {
        if(changes){
            setIsLoading(true)
            getIssues().then(res =>
            {
                document.title = toModerate ? 'To moderate' : 'All'
                setChanges(false)
            })
        }
    }, [changes]);


    useEffect(() => {
        checkParams()
    }, [nav, location.search]);

    function buildURI() {
        let number = page-1;
        let uri = `${API_BASE}/admin/issues?size=${issuesLimitOnPage}&page=${number}`
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

    const getAuthor =  (uid) => {
        return getAxiosInstance(getToken()).get(`${API_BASE}/admin/residents/${uid}`)
    }

    const getCategory = (id) => {
        return getAxiosInstance(getToken()).get(`${API_BASE}/categories/${id}`)
    }

    const getIssues = async () => {
        const response = await getAxiosInstance(getToken()).get(buildURI())
        setTotalPages(response.data.totalPages);
        await Promise.all(response.data.issues.map(async issue => {
            const authorResponse = await getAuthor(issue.authorUid);
            const issueAuthor = `${authorResponse.data.firstName} ${authorResponse.data.lastName}`;
            const categoryResponse = await getCategory(issue.categoryId)
            const issueCategory = categoryResponse.data.name
            const issueDate = new Date(issue.creationDate)
            const dateString = issueDate.toISOString().split('T')[0];
            return{
                ...issue,
                author:issueAuthor,
                category:issueCategory,
                creationDate:dateString
            }
        }))
            .then(succ => {
            setIssues(succ)
            setIsLoading(false)
        });
    }


    function setIsVisited(issueId) {
        //todo setIsVisited via API
    }

    function setToModerateHandler(toMod) {
        setToModerate(toMod)
        setPageHandler(1, toMod)
    }

    function setPageHandler(page) {
        if(page !== undefined || !isNaN(page)){
            let newPg = parseInt(page)
            setPage(newPg)
            setChanges(true)
            nav(`?page=${newPg}`)
        }
    }

    function searchHandler(title) {
        setSearchState(title)
        setChanges(true)
    }

   function filterHandler(val) {
       setSortState(val)
       setChanges(true)
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
                                    <br/>
                                </Typography>
                                <Box display={'flex'}>
                                    <Grid item xs={6} md={12}>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" variant={'subtitle2'}
                                                    gutterBottom>
                                            {`${issue.author} ${issue.creationDate}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={2}>
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
                    <Pagination count={totalPages} page={page} onChange={(e) =>{ setPageHandler(e.nativeEvent.target.innerText)}} className={classes.testAlignCenter}/>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default MainPage;