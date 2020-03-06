import * as questionTypes from '../../Components/Modal/questionTypesModal/questionTypeStrings'

export const SWITCH_PAGE = 'SWITCH_PAGE';
//temp sol
export const GET_MULTIPLE = "GET_MULTIPLE_TYPE";
export const GET_STAR = "GET_STAR_TYPE";
export const GET_TEXTFIELD = "GET_TEXTFIELD_TYPE";


export const switchPage = (value) => {
    return {
        type: SWITCH_PAGE,
        page_index: value
    }
}

export const getQuestionType = (type, val) => {
    if(type === questionTypes.MULTIPLE) {
        return {
            type: GET_MULTIPLE,
            valid_val: val
        }
    }
    if(type === questionTypes.STAR) {
        return {
            type: GET_STAR,
            valid_val: val
        }
    }
    if(type === questionTypes.TEXTFIELD) {
        return {
            type: GET_TEXTFIELD,
            valid_val: val
        }
    }
}

