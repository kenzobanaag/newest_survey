import React, { useEffect } from 'react'
import HomeHeader from './HomeHeader'
import SurveyTable from './SurveyTable'
import NavBar from '../Header/NavBar'
//redux
import { useDispatch, useSelector } from "react-redux";
import * as homeActions from '../../store/actions/homeActions';
import * as appActions from '../../store/actions/actions'


function HomePage() {
    const dispatch = useDispatch();

    //get token
    const currentUser = useSelector(state => state.user.authToken);

    //component did mount
    useEffect(() => {
        dispatch(appActions.switchPage(0))
        dispatch(homeActions.loadSurveys(currentUser));
    }, []);

    return (
    <div>
        <NavBar />
        <HomeHeader />
        <SurveyTable />
    </div>);
}

export default HomePage;