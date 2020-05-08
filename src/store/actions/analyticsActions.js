import ApiCalls from '../../Components/Axios/ApiCall'

export const LOAD_RESPONSES = "LOAD_RESPONSES";
export const CLEAR_RESPONSES = "CLEAR_RESPONSES";
export const SET_CURRENT_SURVEY = "SET_CURRENT_SURVEY";
export const GET_WORDCLOUD = "GET_WORDCLOUD";


/*
    Called by the analytics page to instantiate the state and populate the 
    survey responses if there are any.
*/
export const loadResponses = (id, token) => {
    return dispatch => {
        ApiCalls.newGetAllSurveyResponses(id, token).then(response => {
            dispatch(clearResponses());
            //console.log(response.data.data)
            if (response.data.result) {
                var responseData = response.data.data.map(element => ({
                    answers: element.answers,
                    responseId: element._id
                }))
                
                dispatch(saveResponses(responseData));
            }
            //answers array
            
        }).catch(error => {
            console.log(error)
        });
    }
}

export const getWordCloud = (id) => {
    return dispatch => {
        ApiCalls.getWordCloud(id).then(response => {
            //console.log(response)
            if (response.data) {
                dispatch(saveWordCloudData(response.data));
            }
        }).catch(error => {
            console.log(error)
        });
    }
}

export const saveWordCloudData = (cloudData) => {
    return {
        type: GET_WORDCLOUD,
        data: cloudData
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