import {Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import {Button} from "@mui/material";
import React from "react";
import useStyles from "../styles/styles";
import Chip from '@mui/material/Chip';
import bananaImage from "../img/banana.jpg"

const IssuePage = () => {

    const author = "Lavin Yakiv";
    const address = "Olympijska 1902/5";
    const category = "Item";
    const publishedDate = "23.07.2023";
    const issueName = "Issue 000-000-000";
    const issueDescription = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Vestibulum fermentum tortor id mi. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Aliquam in lorem sit amet leo accumsan lacinia. Maecenas lorem. Fusce suscipit libero eget elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Pellentesque arcu. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien.\
Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Nulla est. Praesent vitae arcu tempor neque lacinia pretium. Suspendisse sagittis ultrices augue. Aliquam erat volutpat. Nulla pulvinar eleifend sem. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Ut tempus purus at lorem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";
                            
    
    const classes = useStyles();
    console.log(classes.topHeader)
    return (
        <Grid item xs={10}>
            <Grid container spacing={1} className={classes.topHeader}>
                
                    <Typography variant={'h4'}>
                        Issue 000-000-000
                    </Typography>
                
            </Grid>
            <Grid container spacing={8}>
                <Grid item>
                <Card style = {{ maxWidth: 550 }}>
                    <CardMedia 
                    component="img" 
                    height='256px'
                    alt="Issue problem" 
                    src={bananaImage}
                    fit = "contain"
                    />
                    
                    <CardHeader title = "Description" />
                    <CardContent>
                        <Typography variant = "body2">{issueDescription}</Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item>
                <Card style = {{minWidth: 430,  maxWidth: 500}}  >
                    <CardHeader title = "Information"/>
                    <CardContent>
                        <Typography variant = "body2">Author: {author}</Typography>
                        <Typography variant = "body2">Address: {address}</Typography>
                        <Typography variant = "body2">Category: {category}</Typography>
                        <Typography variant = "body2">Published: {publishedDate}</Typography>
                        <Chip label="Minor damage" sx={{mt:2}}/>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={10} spacing={1} className={classes.buttonGrid}>
                <Grid container className={classes.buttonSmallContainer}>
                    <Button variant="contained" >Reject</Button>
                    <Button variant="contained">Approve</Button>
                </Grid>
            </Grid>
            </Grid>
            
        </Grid>
        
            )
        }

export default IssuePage;