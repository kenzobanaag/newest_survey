import React from 'react'
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis } from 'recharts'
import {Typography, Divider} from '@material-ui/core'
import { useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    textLeft: {
        textAlign: "left",
        marginLeft: theme.spacing(5)
    }
}));

export default function MultipleChoiceGraph(props) {

    const classes = useStyles();

    //let responses;
    let data = [];

    const currentId = props.choiceId;

    const responses = useSelector(state => state.analytics.responses)

    const questions = useSelector(state => state.create.questions)

    const dictionary = {
        "0" : 0,
        "1" : 0,
        "2" : 0,
        "3" : 0,
    }

    const initData = () => {
        if(responses.length > 0 && currentId !== undefined) {
            responses.map(element => element.answers.map(answer => buildDictionary(answer)))
            buildData();
        }
    }

    const buildDictionary = (answer) => {
        if (answer.questionID === currentId)
            dictionary[answer.selectionID] = ++dictionary[answer.selectionID];
    }

    const buildData = () => {
        var choices = []
        if(questions.length > 0) {
            for(var i = 0; i < questions.length; i++) {
                if(questions[i].questionId === currentId) {
                    choices = questions[i].choices;
                    break;
                }
            }
        }


        for (var key in dictionary) {
            // check if the property/key is defined in the object itself, not in parent
            data.push({
                "name": choices[key],
                "val": dictionary[key]
            })
        }
    }

    const getQuestion = () => {
        var questionText = "";
        if(questions.length > 0) {
            questions.map(question => question._id === currentId ? questionText = question.prompt : 0)
            return <div><Typography variant="h4" className={classes.textLeft}>{questionText}</Typography><br/></div>
        }
    }

    return (
        <div > 
            {initData()}
            {getQuestion()}
            <div className={classes.root}>
            <BarChart width={700} height={400} data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Bar dataKey="val" fill="#644e5b"/>
            </BarChart>
            {/* add something to the right of the graph, probably legends and all that */}
            </div>
        </div>
    );
}