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

    testAlignCenter:{
        display:"flex",
        justifyContent:"center"
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
    },

    userManagementCard:{
        margin: 'auto',
        padding: '5px'
    },
    userManagementSearchItems:{
        justifyContent:'space-between',
        padding: '10px',
        verticalAlign: 'center'


    // User Action Element Styles
    userActionCardStyle: {
        height: '15vw',
        marginTop: '50px'
    },

    mainBoxInCard: {
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },

    modalBox: {
        position: "absolute",
        top: "-35%",
        width:"40vw",
        height:"14vh"

    }
}));

export default useStyles;