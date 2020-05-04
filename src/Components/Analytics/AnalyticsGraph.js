import React from 'react';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CloudVisualizer from './CloudVisualizer'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles';
import { useSelector} from "react-redux";
import Grapher from './GraphFactory'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3),
        minHeight: 400,
    },
    top: {
        padding: theme.spacing(1),
    },
    graph: {
        marginTop: 10
    }, 
    paperHeight: {
        minHeight: 400,
    }
    
}))



export default function AnalyticsGraph(props) {

    const classes = useStyles();

    const [type, setType] = React.useState("")

    const data = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]

    const responses = useSelector(state => state.analytics.responses);

    /*
        Need sync function here, we need to wait for responses to load before we can do anything, or we can pass 
    */
    const buildList = () => {
        // console.log(responses.length)
        if(responses > 0) {
            //console.log("This ranas")
            return responses.map(element => (
                <MenuItem value={element.questionID}>{element.answerType}</MenuItem>
            ))
        }   
    }

    /*
        There will be 3 types of extractions based on the answerType,

        TextFieldAnswer - text, questionID
        MultipleChoiceAnswer - selectionID, questionID
        StarsAnswer - stars?, questionID
    
    */

    /*
        This will probably return a type of graph that we need to populate. 

        The graph could probably have the parser.
    */
   const handleChange = (event) => {
        //console.log("Selected: " + event.target.value)
        setType(event.target.value);
    };

    const testPrint = () => {
        console.log(responses.map(element => element.map(answer => (answer.questionID + "," + answer.answerType))))
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paperHeight}>
                {/* we are removing this select thing */}
                <Select className={classes.top}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={"choose"}
                    onClick={handleChange}
                    fullWidth
                >
                    <MenuItem disabled={true} value="choose">Choose a question</MenuItem>
                    <MenuItem  value="1">MultipleChoice</MenuItem>
                    <MenuItem  value="2">TextFieldAnswer</MenuItem>
                    <MenuItem  value="0">TextFieldAnswer</MenuItem>
                    {/* Probably just load the questions from survey itself */}
                    {/* {responses > 0 ?
                        responses[0].map(element => (
                            <MenuItem value={element.questionID}>{element.answerType}</MenuItem>)) : ""
                    } */}
                </Select>
                <div className={classes.graph}>
                {/* Have some type of factory here that returns a graph depending on which question is selected */}
                <Grapher type={type} qID={type}/>
                </div>
            </Paper>
            
        </div>
    );

}