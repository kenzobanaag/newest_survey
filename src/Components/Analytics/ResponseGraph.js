import React from 'react'
import { useSelector} from "react-redux";
import Rating from 'material-ui-rating';
import * as AnalyticsTypes from './AnalyticsTypeStrings'
import {Divider, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

/*
    for each question, we want to check what type it is. We want to map the answers to each question.

    What do we need?

    Need question type, the prompt, then the answer
    the text for textfield
    the maxstars for star rating so we have alot of things
    the choices for the multiple choice

    The response has the answers....

    We should only load something if we actujally have responses, if we dont then display you dont have responses yet....

*/

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        flexWrap: "wrap",
        marginLeft: theme.spacing(2)
    },
    answer: {
        marginLeft: theme.spacing(2)
    },
}));

export default function ResponseGraph(props) {

    const classes = useStyles();

    //get questions
    const questions = useSelector(state => state.create.questions)
    //get responses
    const responses = useSelector(state => state.analytics.responses)

    var responseObject = {};

    const emptyGraph = () => {
        return(<div>
            Your survey doesn't have responses yet, check back again later.
        </div>)
    }

    const loadGraph = () => {
        if(responses.length > 0) 
            return responseView();
        else
            return emptyGraph();
    }

    /*
        For each question, add something
    */
    const responseView = () => {
        responses.map(response => response.responseId === props.responseId ? responseObject = response : 0)

        //console.log(responseObject)

        if(Object.keys(responseObject).length !== 0)
            //use question
            return questions.sort().map(question => getComponent(question))
    }


    const getComponent = (question) => {
        switch(question.questionType) {
            case AnalyticsTypes.STAR: 
            return starResponse(question);
            case AnalyticsTypes.MULTIPLE: 
            return multipleChoiceResponse(question);
            case AnalyticsTypes.TEXTFIELD: 
            return textFieldResponse(question);
            //probably have this return some text to say that the user should select something
            default: return <div>Empty response</div>;     
        }
    }

    const textFieldResponse = (question) => {

        let questionResponse = {};
        responseObject.answers.map(answer => question.questionId === answer.questionID ? questionResponse = answer : 0);
        
        return(<div key={questionResponse._id} className={classes.root}>
            <Divider/>
            <Typography variant="h6"><b>{question.prompt}</b></Typography>
            <Typography variant="body1" className={classes.answer}>{questionResponse.text}</Typography>
            <Divider/>
            <br/>
        </div>)
    }

    const starResponse = (question) => {

        let questionResponse = {};
        responseObject.answers.map(answer => question.questionId === answer.questionID ? questionResponse = answer : 0);

        return (
        <div key={questionResponse._id} className={classes.root}>
            <Divider/>
            <Typography variant="h6"><b>{question.prompt}</b></Typography>
            <Rating
            value={questionResponse.stars}
            max={question.maxStars}
            readOnly = {true}
            className={classes.answer}/>
            <Divider/>
            <br/>
        </div>)
    }

    const multipleChoiceResponse = (question) => {
        
        let questionResponse = {};
        responseObject.answers.map(answer => question.questionId === answer.questionID ? questionResponse = answer : 0);

        return (
            <div key={questionResponse._id} className={classes.root}>
                <Divider/>
                <Typography variant="h6"><b>{question.prompt}</b></Typography>
                <Typography variant="body1" className={classes.answer}>
                    {question.choices[questionResponse.selectionID]}
                </Typography>
                <Divider/>
                <br/>
            </div>)
    }

    
  
    return(<div>
        {loadGraph()}
    </div>);
}