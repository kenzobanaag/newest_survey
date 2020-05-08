import * as analyticsActions from '../actions/analyticsActions';

const intialState = {
    responses: [],
    currentSurveyId: "",
    count: 0,
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
            case analyticsActions.GET_RESPONSE_COUNT:
                return {
                    ...state,
                    count: state.count + action.responseCount
                }
        default: return state;
    }
}

export default reducer;