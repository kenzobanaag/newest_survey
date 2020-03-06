import * as actionTypes from '../actions/actions'

const initialState = {
    page_index: 0,
    current_user: "TheWordMEME",//"TestPacito",
    //bad design, its not scalable
    choices: [],
    maxStars: 0,
    charLimit: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCH_PAGE:
            //console.log("This ran and index is: " + action.page_index);
            return {
                ...state,
                //change the page index
                page_index: action.page_index
            }
        case actionTypes.GET_MULTIPLE: 
        {
            return {
                ...state, 
                choices: action.valid_val,
                maxStars: undefined,
                charLimit: undefined
            }
        }
        case actionTypes.GET_STAR: 
        {
            return {
                ...state, 
                maxStars: action.valid_val,
                charLimit: undefined,
                choices: undefined
            }
        }
        case actionTypes.GET_TEXTFIELD: 
        {
            return {
                ...state, 
                charLimit: action.valid_val,
                maxStars: undefined,
                choices: undefined
            }
        }
        default: return state;
    }
}

export default reducer;