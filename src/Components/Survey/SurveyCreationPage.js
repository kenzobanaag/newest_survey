/*
    This class will hold the survey list and survey edit components
    We could use this class to manipulate and show new or existing
    survey items. 
*/

import React, { useEffect }  from 'react';
import SurveyActions from './SurveyActions';
import SurveyForm from './SurveyForm';
import NavBar from '../Header/NavBar'
import { useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import * as surveyActions from '../../store/actions/surveyActions';
import * as appWideActions from '../../store/actions/actions'


/*
    This class is where we do the requests if we are editing a survey.
    Could potentiall pass in a survey id then do request on that. 
*/
export default function SurveyPage (){

    const auth = useSelector(state => state.user.authToken)

    let location = useLocation() 
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appWideActions.switchPage(1));
        dispatch(surveyActions.clearSurvey())

        const url = location.pathname;
        let id = "";
        
        //this means that there is an id that is loaded.
        if (url.split('/').length === 3) {
            id = url.split('/')[2];
            //dispatch to get all survey ids
            dispatch(surveyActions.loadSurvey(id,auth));
        }
    }, [])

    return(
        <div className=""> 
            <NavBar/>
            <SurveyActions/>
            <SurveyForm/>
        </div>
    );
}