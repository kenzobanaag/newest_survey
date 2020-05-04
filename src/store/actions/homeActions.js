import ApiCalls from '../../Components/Axios/ApiCall'

export const LOAD_SURVEYS = "LOAD_SURVEYS";
export const DELETE_SURVEY = "DELETE_SURVEY";

export const saveSurveys = (surveyVal) => {
    return {
        type: LOAD_SURVEYS,
        surveys: surveyVal
    }
}

/*
    Called by the HomePage, this loads all the surveys from the current user
    and attaches it to the state. 
*/
export const loadSurveys = (token) => {
    return dispatch => {
        ApiCalls.newGetAllSurveys(token).then(response => {
            console.log(response)
            if(response.data.result) {
                dispatch(saveSurveys(response.data.data));
            }
        });
    }
}

/*
    Called by SurveyTable, basically deletes the survey in the 
    database first, then if that is successful it will delete
    the entry in the surveyList.
*/
export const deleteSurvey = (token, id)  => {
    return dispatch => {
        ApiCalls.newDeleteSurvey(token, id).then(response => {
            console.log(response)
            if(response.data.result > 0) {
                dispatch(storeDeletedSurveyId(id));
            }
        }).catch(error => {
            dispatch(storeDeletedSurveyId(null));
        })
    }
}

export const storeDeletedSurveyId = (id) => {
    return {
        type: DELETE_SURVEY,
        surveyId: id
    }
}

