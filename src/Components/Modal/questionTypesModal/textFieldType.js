import React from 'react'
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux'
import * as surveyActions from '../../../store/actions/actions'
import * as questionTypes from '../questionTypesModal/questionTypeStrings'


export default function TextFieldType(props) {

    const dispatch = useDispatch();

    const currentQArray = useSelector(state => state.create.questions);

    //update the value of maxStars
    const handleOnTextChange = () => {
        dispatch(surveyActions.getQuestionType(questionTypes.TEXTFIELD, document.getElementById("maxLength").value))
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
            id="maxLength"
            autoFocus
            fullWidth
            defaultValue={choicesArray === undefined ? 140 : choicesArray.charLimit}
            onChange={() => handleOnTextChange()}
            inputProps = {{
                maxLength: 4,
            }}
            label="TextField Max Character Length"
            />
        </div>);
}