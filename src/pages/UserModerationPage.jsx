import {Card, Grid, Typography} from "@material-ui/core";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, CircularProgress, TextField} from "@mui/material";
import React from "react";
import useStyles from "../styles/styles";
import Chip from '@mui/material/Chip';
import {DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { API_BASE } from "../apis/apis";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import Link from "@mui/material/Link";
import AuthContext from "../apis/context/AuthProvider";


const UserModerationPage = () => {
    const { getToken } = useContext(AuthContext)

    let search = window.location.search;
    const params = new URLSearchParams(search);
    if(!params.get('page')) {
        params.set('page', '0')
        window.history.pushState({page:params.toString()} , null, '?page=0')
    }
    const [status, setStatus] = React.useState('all');
    const [role, setRole] = React.useState('residents');
    const [users, setUsers] = React.useState([]);
    const [searchState, setSearchState] = React.useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
      });

    const applyRoleChange = (e) => {
        setRole(e.target.value);
    }

    const applyStatusChange = (e) => {
        setStatus(e.target.value);
        console.log("itting staus")
    }

    function searchHandler(title) {
        setSearchState(title)
    }

    const newUserHandler = () => {
        window.location.replace('/#/users/add');
    };


    const classes = useStyles();

    function buildURI() {
        let uri = `${API_BASE}/${role}?size=${paginationModel.pageSize}&page=${(parseInt(paginationModel.page)+1)}`
        if (status !== '' & status !== 'all')
        {
            uri += `&status=${status}`
        }
        if(searchState.length !== 0) {
            uri += `&firstName_like=${searchState}`
        }

        console.log(uri);
        return uri;
    }


    let rows = users.map(user => {
        const r = {
            name: user.firstName + ' ' + user.lastName,
            avatar: user.photo,
            id: user.uid
        }
        user.name = r;
        user.id = user.uid;
        return user;
    })

    useEffect(() => {
        setIsLoading(true)
        let pg = parseInt(params.get('page'));
        window.history.replaceState({page:pg.toString()}, null, '?page='+(parseInt(paginationModel.page)+1))
        axios.get(buildURI(), {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(response => {
                console.log(response.data[role])
                setUsers(response.data[role])
            })
            .catch(error => console.log(error))
        setIsLoading(false);
    }, [role, status, paginationModel, searchState]);

    const columns = [
        {
            field: 'name', headerName: 'User',
            width: 300,
            renderCell: (params) => <Grid container alignItems="center" ><Avatar src={params.value.avatar} alt={params.value.name} /><Grid item style={{ margin: "10px" }}><Link href = {"user?role="+role+'&id='+params.value.id}>{params.value.name} </Link></Grid></Grid>
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 300,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 160,
           
        },
        {
            field: 'status',
            headerName: 'Account status',
            width: 160,
            renderCell:
            (params) =>
            {
                const status = params.value;
                
                let state = 'default';
                if(status === "BLOCKED")
                {
                    state = "warning";
                }
                if( status === "DELETED")
                {
                    state = "error"
                }

                return (
                    <Chip
                        label = {status}
                        color = {state}
                        />
                )
            }
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
        },
    ];


    if(isLoading) {
        return (
            <Grid  item xs={10}>
                <Box sx={{display: 'flex', justifyContent: 'center', height:"80%", alignItems:"center"}}>
                    <CircularProgress size={110}/>
                </Box>
            </Grid>
        );
    }


    return (<Grid item xs={9}>
        <Grid container spacing={1} className={classes.topHeader}>
            <Grid xs={4} item>
                <Typography variant={'h4'}>
                    User management
                </Typography>
            </Grid>
        </Grid>
        <Card className={classes.userManagementCard}>
            <Grid container className={classes.userManagementSearchItems}>
                <Grid item xs={7} >
                    <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" style={{ height: "50px" }}  onChange={(e) => searchHandler( e.target.value)}/>
                        <Box style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControl>
                                <InputLabel htmlFor="user-role-select-label">Role</InputLabel>
                                <Select
                                    id="user-role-select"
                                    value={role}
                                    onChange={applyRoleChange}
                                    style={{ width: "200px", height: '50px' }}
                                >
                                    <MenuItem value={'residents'}>Resident</MenuItem>
                                    <MenuItem value={'services'}>Public service</MenuItem>
                                    <MenuItem value={'analysts'}>Analyst</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
                            <FormControl>
                                <InputLabel htmlFor="user-status-select-label">Status</InputLabel>
                                <Select
                                    id="user-status-select"
                                    value={status}
                                    onChange={applyStatusChange}
                                    style={{ width: "200px", height: '50px' }}
                                >
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'active'}>Active</MenuItem>
                                    <MenuItem value={'blocked'}>Blocked</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid >
                    <Button variant='contained' onClick={newUserHandler}>New user</Button>
                </Grid>
            </Grid>


            <DataGrid
                rows={rows}
                rowCount={2312}
                columns={columns}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </Card>
    </Grid>);
}
export default UserModerationPage;

/*
<Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">User</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Account status</TableCell>
                        <TableCell align="right">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {rows.map(
                        row => {
                            const labelId = row.id;
                            return (
                                <TableRow
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={false}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.user}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                </TableRow>
                            )
                        }
                    )}
                </TableBody>
            </Table>

            */