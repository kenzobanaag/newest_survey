/* This will handle accepting all the stuff from the modal and outputting 
it to the survey page in a form of a survey.
Accept props to fill up the survey */

/* 
    TODO: Create or mock question list
    Item mock should look like below
    | Icon  | Question #       | Edit      |
    | Icon  | Question Text    | Button    |
    Potentially get all the information after adding question

    TODO!!!
    Change icon to star or a multiple choice icon or comment box
*/
import React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import QuestionList from './SurveyQuestionList';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
//redux 
import {useSelector } from 'react-redux'


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(5),
      minHeight: "100px"
    },
    title: {
        //margin: theme.spacing(4, 0, 2),
        textAlign: 'left',
        marginLeft: theme.spacing(1),
      },
  }));

  /*
  FIXME: This will not work if we create our own id. We should probably check if element has an _id if undefined then we create our own or refer to our created id...
  */
  //array should be state, so when state is updated, everything is rerendered
  //put this inside survey Form 
  // function generateQuestionArray(questionArray) {
  //     if(questionArray.length > 0)
  //     return questionArray.map(element => <QuestionList 
  //       question={element.prompt} 
  //       type={element.questionType}
  //       id={element._id}
  //       key={element._id}
  //       />);
  // }


/*
    param: props.questions (Question object, should contain all the questions in one object?)
*/  
export default function SurveyForm() {

  const surveyList = useSelector(state => state.create.questions)

    const classes = useStyles();
    const [dense, setDense] = useState(false);

    const checkId = (currentItem) => {
      if(currentItem._id === undefined) {
        // console.log("WE CREATED THIS: " + currentItem.key)
        return currentItem.key
      }
        
      else {
        // console.log("FROM DATABASE: " + currentItem._id)
        return currentItem._id
      }
        
    }

    const generateQuestionArray = (questionArray) => {
      if(questionArray.length > 0)
      return questionArray.map(element => 
      <QuestionList 
        question={element.prompt} 
        type={element.questionType}
        id={checkId(element)}
        key={checkId(element)}
        />);
    }

    return(
        <div className="">
            <Paper className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Questions
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
                {(generateQuestionArray(surveyList))}
            </List>
          </div>
            </Paper>
        </div>
    );
}



