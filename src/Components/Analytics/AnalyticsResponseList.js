import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, List, ListItem, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import AnalyticsGraph from './AnalyticsVisualizer';
import { RESPONSE } from './AnalyticsTypeStrings'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3),
        minHeight: 400,
    },
    paperHeight: {
        minHeight: 370,
        maxHeight: 360,
        overflow: 'auto'
    },
    grapherMargin: {
        marginTop: 50,
    }
}));

export default function ResponseList() {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const [qItem, setQItem] = React.useState(0);

    const [rItem, setRItem] = React.useState(0);

    const [graphType, setGraphType] = React.useState("");

    const [itemId, setItemId] = React.useState("");

    const changeValue = (event, newValue) => {
        setValue(newValue)
    }

    const responses = useSelector(state => state.analytics.responses)

    //load questions
    const questions = useSelector(state => state.create.questions);

    const loadId = (id, index) => {
        //do something with id.
        //we need to give a factory a type and an id
        setGraphType(RESPONSE)
        setItemId(id)
        setRItem(index)
    }

    const loadGraph = (gType,id, index) => {
        //we need to give a factory a type and an id and a question number.
        //console.log(type)
        setGraphType(gType)
        setItemId(id)
        setQItem(index)
    }

    //when something is clicked in the graph, we could filter all of these....
    const getItems = () => {
        if (value === 0 && questions.length > 0 && responses.length > 0) {
            //load questions
            //console.log(questions)
            return questions.map((id, index) => (
            <ListItem 
            button 
            selected={qItem === index}
            key={id.questionId} 
            onClick={() => loadGraph(id.questionType, id.questionId, index)}>
                Q{index + "-" + id.questionType}
                </ListItem>))
        }
        else {
            if (responses.length > 0) {
                //load response ids
                //console.log(responses)
                return responses.map((response, index) => (
                <ListItem 
                button
                selected={rItem === index}
                key={response.responseId}
                onClick={() => loadId(response.responseId, index)}>
                    R{index + "-" + response.responseId}
                    </ListItem>))
            }   
            else{
                return <div>
                    <Typography variant="h6" className={classes.grapherMargin}>
                        Sorry, you dont have responses yet
                    </Typography>
                </div>
            }
        }
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Tabs
                        value={value}
                        onChange={changeValue}>
                        <Tab label="Questions"></Tab>
                        <Tab label="Responses"></Tab>
                    </Tabs>
                    <Paper className={classes.paperHeight}>
                        {/* Load a list depending on which tab is selected */}
                        <List>
                            {getItems()}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    {/* pass a prop here when something is selected */}
                    <AnalyticsGraph type={graphType} id={itemId} />
                </Grid>
            </Grid>
        </div>
    );
}