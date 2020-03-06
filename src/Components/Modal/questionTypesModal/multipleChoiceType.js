import React from 'react'
import TextField from '@material-ui/core/TextField';

import {useDispatch, useSelector} from 'react-redux'
import * as surveyActions from '../../../store/actions/actions'
import * as questionTypes from '../questionTypesModal/questionTypeStrings'


export default function MultipleChoiceType(props) {
    
    const dispatch = useDispatch();

    const currentQArray = useSelector(state => state.create.questions);

    const buildChoices = () => {
        let choice1 = document.getElementById("question_choice_1").value
        let choice2 = document.getElementById("question_choice_2").value
        let choice3 = document.getElementById("question_choice_3").value
        let choice4 = document.getElementById("question_choice_4").value


        return [choice1,choice2,
            choice3,choice4]
    }

    //update the value of maxStars
    const handleOnTextChange = () => {
        dispatch(surveyActions.getQuestionType(questionTypes.MULTIPLE, buildChoices()))
    }

    let choicesArray = undefined;

    const loadValues = () => {
        choicesArray = getValues();
    }

    const getValues = () => {
        if(props.qID !== undefined) {
            for (var i=0; i < currentQArray.length; i++) {
                if (currentQArray[i].questionId === props.qID) {
                    return currentQArray[i];
                }
            }
        } 
    }


    return (
        <div>
            {loadValues()}
            <TextField 
            id="question_choice_1"
            autoFocus
            fullWidth
            defaultValue={choicesArray === undefined ? "" : choicesArray.choices[0]}
            onChange={() => handleOnTextChange()}
            inputProps = {{
                maxLength: 60,
            }}
            label="Choice One"
            />

            <TextField 
            id="question_choice_2"
            autoFocus
            fullWidth
            defaultValue={choicesArray === undefined ? "" : choicesArray.choices[1]}
            onChange={() => handleOnTextChange()}
            label="Choice Two"/>

            <TextField 
            id="question_choice_3"
            autoFocus
            fullWidth
            defaultValue={choicesArray === undefined ? "" : choicesArray.choices[2]}
            onChange={() => handleOnTextChange()}
            label="Choice Three"/>

            <TextField 
            id="question_choice_4"
            autoFocus
            fullWidth
            defaultValue={choicesArray === undefined ? "" : choicesArray.choices[3]}
            onChange={() => handleOnTextChange()}
            label="Choice Four"/>
        </div>
    );
}