import ApiCalls from '../../Components/Axios/ApiCall'


export const LOAD_SURVEY = "LOAD_SURVEY";
export const SAVE_SURVEY = "SAVE_SURVEY";
export const UPDATE_SURVEY = "UPDATE_SURVEY"
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const CLEAR_SURVEY = "CLEAR_SURVEY";
export const GET_EMBED = "GET_EMBED";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_TRIGGER = "UPDATE_TRIGGER";

export const loadSurvey = (id, token) => {
    return dispatch => {
        ApiCalls.newGetASurvey(id, token)
            .then(response => {
                console.log(response.data.data)
                dispatch(returnSurvey(response.data.data));
            }).catch(error => {
                console.log(error)
            });
    }
}

export const returnSurvey = (surveyVal) => {
    return {
        type: LOAD_SURVEY,
        survey: surveyVal
    }
}

export const clearSurvey = () => {
    return {
        type: CLEAR_SURVEY,
    }
}

//decide how were gonna save...
//probably pass the survey object using the useSelector.
export const saveSurvey = (surveyObject, token) => {
    return dispatch => {
        let survId = "";
        //remove this if it causes errors
        if (surveyObject.surveyId === undefined || surveyObject.surveyId === "") {
            const filteredObject = {
                ...surveyObject,
                questions: surveyObject.questions.map(question => filterObject(question))
            }
            ApiCalls.newPostSurvey(filteredObject, token).then(response => {
                survId = response.data.id;
                alert("Survey saved!")
                dispatch(loadSurvey(survId, token));
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            //console.log("Update")
            const filteredObject = {
                ...surveyObject,
                questions: surveyObject.questions.map(question => filterObject(question))
            }
            ApiCalls.newUpdateSurvey(filteredObject, token).then(response => {
                survId = response.data.id;
                alert("Changes saved!")
                dispatch(loadSurvey(survId, token));
                //console.log(JSON.stringify(filteredObject))
                return {
                    type: UPDATE_SURVEY
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

/*
    Filter the question object to remove the extra properties that are not needed in the backend
*/
const filterObject = (questions) => {
    const newObject = {
        prompt: questions.prompt,
        questionType: questions.questionType,
    }

    switch (questions.questionType) {
        case "StarQuestion":
            newObject.maxStars = (questions.maxStars === null || questions.maxStars === 0 ? 5 : questions.maxStars)  
            break;
        case "MultipleChoiceQuestion":
            newObject.choices = questions.choices
            break;
        case "TextFieldQuestion":
            newObject.charLimit = (questions.charLimit === null || questions.charLimit === 0 ? 140 : questions.charLimit)
            break;
        default:
    }

    if ('_id' in questions)
                newObject._id = questions._id
                
    return newObject;
}

    export const updateTitle = (title) => {
        return {
            type: UPDATE_TITLE,
            surveyTitle: title
        }
    }

    export const updateTrigger = (triggerObject) => {
        return {
            type: UPDATE_TRIGGER,
            trigger: triggerObject,
        }
    }


    export const addQuestion = (newQuestion) => {
        return {
            type: ADD_QUESTION,
            //whole question object
            question: newQuestion
        }
    }

    //accept the id, then edit that item
    export const editQuestion = (newValue) => {
        // return {
        //     type: EDIT_QUESTION,
        //     //either pass new state value or pass id
        //     questionId: newValue.questionId,
        //     newQuestion: newValue
        // }
        return dispatch => {
            dispatch(deleteQuestion(newValue.questionId));
            dispatch(addQuestion(newValue));
        }

    }

    //accept the id then delete that item from the state list
    export const deleteQuestion = (id) => {
        return {
            type: DELETE_QUESTION,
            questionId: id
        }
    }

    //I was thinking we could call this on any of the items that need extra text
    //basically, pass 2 values, like the questionId, then the extra prompt.
    export const addQuestionExtras = () => {
        return {
            type: "TEST"
        }
    }


    export const getEmbed = (id) => {
        return dispatch => {
            if (id !== undefined)
                alert(ApiCalls.getEmbedCode(id));
            return {
                type: GET_EMBED
            }
        }
    }

