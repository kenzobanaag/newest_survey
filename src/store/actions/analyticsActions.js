import ApiCalls from '../../Components/Axios/ApiCall'

export const LOAD_RESPONSES = "LOAD_RESPONSES";
export const CLEAR_RESPONSES = "CLEAR_RESPONSES";
export const SET_CURRENT_SURVEY = "SET_CURRENT_SURVEY";

/*
    Called by the analytics page to instantiate the state and populate the 
    survey responses if there are any.
*/
export const loadResponses = (id) => {
    return dispatch => {
        ApiCalls.getAllSurveyResponses(id).then(response => {
            dispatch(clearResponses());
            console.log(response)
            if (response.data.result) {
                dispatch(saveResponses(response.data.data));
            }
            //answers array
            
        }).catch(error => {
            console.log(error)
        });
    }
}

export const saveResponses = (surveyResponses) => {
    return {
        type: LOAD_RESPONSES,
        responses: surveyResponses
    }
}

export const clearResponses = () => {
    return {
        type: CLEAR_RESPONSES,
        responses: []
    }
}

export const setCurrentSurvey = (id) => {
    return {
        type: SET_CURRENT_SURVEY,
        surveyId: id
    }
}
