import React, { useEffect } from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsResponse from './AnalyticsResponseList';
import NavBar from '../Header/NavBar'
//redux
import { useDispatch, useSelector} from "react-redux";
import * as analyticsActions from '../../store/actions/analyticsActions'
import * as appActions from '../../store/actions/actions'
import * as surveyActions from '../../store/actions/surveyActions'


/*
    UPDATE: Removed analytics context provider
    If there is an id in the url, make an api call
*/
function AnalyticsPage() {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.user.authToken);

    useEffect(() => {
        dispatch(appActions.switchPage(2))
        dispatch(surveyActions.clearSurvey())
        const url = (window.location.pathname);
        let id = "";
        //this means that there is an id that is loaded.
        if (url.split('/').length === 3) {
            id = url.split('/')[2];
            //dispatch to get all survey ids
            dispatch(analyticsActions.loadResponses(id, auth));
            dispatch(analyticsActions.setCurrentSurvey(id)); 
            dispatch(surveyActions.loadSurvey(id,auth));
        }
    }, [])

    return (
        <div>
            <NavBar />
            <AnalyticsHeader />
            <AnalyticsResponse/>
        </div>
    );
}

export default AnalyticsPage;