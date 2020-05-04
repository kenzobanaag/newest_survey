import * as analyticsActions from '../actions/analyticsActions';

const intialState = {
    responses: [],
    currentSurveyId: "",
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
        default: return state;
    }
}

export default reducer;