import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import StatisticsCard from './StatisticsCard'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import LOGO from '../Assets/cap_logo.png'

//redux
import { useSelector, useDispatch } from "react-redux";
import * as analyticsActions from '../../store/actions/analyticsActions'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(5),
    },
    texts: {
        textAlign: 'left',
        margin: theme.spacing(1),
    },
    distance: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    gridRoot: {
        flexGrow: 1,
    },
}))

/*
    UPDATE: Removed context consumer
        Were now using useSelector to grab the objects of the root store.
        currentUser - grabs the current user from the app wide reducer
        surveys - all the surveys in the homeReducer
*/
function HomeHeader() {

    //const dispatch = useDispatch();

    const classes = useStyles();

    const currentUser = useSelector(state => state.user.userEmail);

    const surveys = useSelector(state => state.home.surveys);

    //const auth = useSelector(state => state.user.authToken);

    //const responses = useSelector(state => state.analytics.count);

    const printStatus= (status) => {
        if(status.length === 0) {
            return(
                <div>
                    <Typography variant="overline" gutterBottom style={{color:"red"}}>
                        Server might be offline
                    </Typography>
                </div>
            );
        }
    }

    //get active survey count
    const getActiveSurveys = () => {
        if(surveys.length > 0) {
            var activeSurveys = 0;
            activeSurveys = surveys.filter(item => item.published === "true").length;
            return activeSurveys;
        }

        return 0;
    }

    //get all responses
    // const getResponseCount = () => {
    //     if(surveys.length > 0) {
    //         var responsesL = 0;
    //         for(var i = 0; i < surveys.length; i++) {
    //             console.log(surveys[i])
    //             //dispatch(analyticsActions.getResponseCount(surveys[i]._id, auth));
    //             //responsesL += responses;
    //         }
    //         return responsesL;
    //     }

    //     return 0;
    // }

    return (
        <Paper className={classes.root}>
                <div className={classes.texts}>
                    <Typography variant="h2" gutterBottom >
            Welcome, <span>{currentUser} </span>
            <img src={LOGO} height={55} width={55} />
                    </Typography>
                    {/* Comment out this line later */}
                    {printStatus(currentUser)}
                    <Divider className={classes.distance} />
                    <Typography variant="overline" gutterBottom>
                    </Typography>
                    <Button 
                    style={{background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)', color: 'white'}} 
                    variant="contained"
                     to="/create" 
                     component={Link}>
                        Create A New Survey
                    </Button>
                    <div className={classes.distance}></div>
                    {/*<Divider className={classes.distance}/>
            <Typography variant="overline" guttermBottom>
                Here are your current survey statistics
            </Typography>*/}
                    <Grid container className={classes.gridRoot} spacing={3}>
                        <Grid item xs={4}>
                            <StatisticsCard title="Total Surveys Created" value={surveys.length} />
                        </Grid>
                        <Grid item xs={4}>
                            <StatisticsCard title="Total Active Surveys" value={getActiveSurveys()} />
                        </Grid>
                        <Grid item xs={4}>
                            {/* <StatisticsCard title="Total Survey Responses" value={0} /> */}
                        </Grid>
                    </Grid>
                </div>
        </Paper>
    );
}

export default HomeHeader;