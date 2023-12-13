import {Card, Grid, Typography} from "@material-ui/core";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";
import useStyles from "../styles/styles";
import Chip from '@mui/material/Chip';
import {DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { API_BASE } from "../apis/apis";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "@mui/material/Link";

const usersText =
    '{"users" : [{"name": "Ihor","surname": "Dagon","role": "ululu","email": "bobo@gmail.com","status": "active", "id":1},{"name": "Pavlo","surname": "Dagon","role": "Admin","email": "bob2o@gmail.com","status": "banned", "id":2}]}';

const UserModerationPage = () => {
    const [status, setStatus] = React.useState('');
    const [role, setRole] = React.useState('residents');
    const [users, setUsers] = React.useState([]);

    const applyRoleChange = (e) => {
        setRole(e.target.value);
    }

    const applyStatusChange = (e) => {
        setStatus(e.target.value);
        console.log("Stting staus")
    }

    const classes = useStyles();
    const userList = JSON.parse(usersText);

    function buildURI() {
        let uri = `${API_BASE}/${role==='residents'?"residents":"analysts"}`
        if (status !== '' & status !== 'all')
        {
            uri += `?status=${status}`
        }
        console.log(uri);
        return uri;
    }


    let rows = users.map(user => {
        const r = {
            name: user.firstName + ' ' + user.lastName,
            avatar: 'https://images.pexels.com/photos/13037579/pexels-photo-13037579.jpeg',
            id: user.id
        }
        user.name = r;
        return user;
    })

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(buildURI(), {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => console.log(error))
    }, [role, status]);

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
                if(status === "blocked")                
                {
                    state = "warning";
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
                        <TextField id="outlined-basic" label="Name, email, etc..." variant="outlined" style={{ height: "50px" }} />
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
                    <Button variant='contained' href = 'users/add'>New user</Button>
                </Grid>
            </Grid>


            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
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