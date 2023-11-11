import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    appBar: {
        position:'relative'
    },

    leftMenuIconStyle: {
        verticalAlign: 'middle',
    },

    leftMenuStyle:{
        display:'flex',
        flexDirection:'column',
        width:'200px',
        height:'100vh',
        position:'relative',
        flexGrow:'1',
        marginLeft:'7px',
        marginTop:'7px',
        borderRight: "2px solid lightGrey"
    },

    topHeader: {
        display:'flex',
        flexDirection:'row',
        marginTop:'30px',
        marginBottom:'30px',
        justifyContent: 'flex-start'
    },
    buttonGrid: {
        display:'flex',
        flexDirection:'row',
        marginTop:'30px',
        marginBottom:'30px',
        justifyContent: 'space-around'
    },
    buttonSmallContainer:{
        width:'250px',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    testBorders:{
        border:'1px solid black'
    },
    topHeaderInputItems: {
        marginLeft:"11%"
    },

    cardIconStateContainer: {
        display:'flex',
        justifyContent:'center'
    },

    paginationContainer: {
        justifyContent:"center"
    }

}));

export default useStyles;