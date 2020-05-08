import React from 'react';
import { useSelector } from "react-redux";
import Rating from 'material-ui-rating'
import { Grid, Typography, List, ListItem, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        minWidth: 5
      },
      textLeft: {
        textAlign: "left",
        marginLeft: theme.spacing(5)
    }
}));

export default function StarGraph(props) {

    const classes = useStyles();

    const currentId = props.choiceId;

    //grab the current loaded survey and get the maxStars of the question with the same choiceId
    const question = useSelector(state => state.create.questions)

    var starAverage = 0;
    var maxStars = 5;
    var starDictionary = {};

    const responses = useSelector(state => state.analytics.responses)

    const initData = () => {
        getMaxStars();
        if (responses.length > 0 && currentId !== undefined) {
            responses.map(element => element.answers.map(answer => getSum(answer)))

            calculateAverage();
        }
    }

    const getMaxStars = () => {
        if (question.length > 0) {
            question.map(element => element.questionId === currentId ? maxStars = element.maxStars : 0)

            //build star dictionary
            loadAllStars();
        }
    }

    const loadAllStars = () => {
        if (maxStars > 0) {
            for (var i = 1; i <= maxStars; i++) {
                starDictionary[i] = 0;
            }
        }
    }

    const getSum = (answer) => {
        if (answer.questionID === currentId) {
            starAverage += answer.stars
            starDictionary[answer.stars] = ++starDictionary[answer.stars];
        }
    }

    const calculateAverage = () => {
        if (starAverage > 0 && responses.length > 0)
            starAverage /= responses.length;
    }


    const loadList = () => {
        if (responses.length > 0) {

            var starList = []
            for (var i = 1; i <= maxStars; i++) {
                starList.push(starDictionary[i]);
            }
            return starList.reverse().map((element, index) => getRating(maxStars - index, element));
        }
    }


    const getRating = (index, star) => {
        return (<ListItem key={index}>
            <Rating
                value={index}
                max={maxStars}
                readOnly={true}
            />
            <Typography variant="h5">
                {star}
            </Typography>
        </ListItem>)
    }

    const getQuestion = () => {
        var questionText = "";
        if(question.length > 0) {
            question.map(question => question._id === currentId ? questionText = question.prompt : 0)
            return <div><Typography variant="h4" className={classes.textLeft}>{questionText}</Typography><br/></div>
        }
    }


    return (
        <div >
            {initData()}
            {getQuestion()}
            <Grid container spacing={0}>
                <Grid item xs={4} className={classes.root}>
                    <div>
                        <Typography variant="h1">
                            {starAverage.toFixed(2)}
                        </Typography>
                        <Rating
                            value={starAverage}
                            max={maxStars}
                            readOnly={true}
                        />
                        <Typography variant="h6">
                            {responses.length} Responses
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Divider className={classes.divider} orientation="vertical"/> 
                </Grid>
                <Grid item xs={7}>
                    <List >
                        {loadList()}
                    </List>
                </Grid>
            </Grid>

        </div>
    );
}