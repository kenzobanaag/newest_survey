import * as analyticsActions from '../actions/analyticsActions';

const intialState = {
    responses: [],
    currentSurveyId: "",
    cloudData: []
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case analyticsActions.LOAD_RESPONSES:
            return {
                ...state,
                responses: action.responses,
            }
        case analyticsActions.CLEAR_RESPONSES:
            return {
                ...state,
                responses: action.responses
            }
        case analyticsActions.SET_CURRENT_SURVEY:
            return {
                ...state,
                currentSurveyId: action.surveyId
            }
        case analyticsActions.GET_WORDCLOUD:
            return {
                ...state,
                cloudData: action.data
            }
        default: return state;
    }
}

export default reducer;