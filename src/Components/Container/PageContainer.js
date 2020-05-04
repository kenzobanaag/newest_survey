import React from 'react'
import NavBar from '../Header/NavBar'
import LoginPage from '../Login/loginPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import SurveyPage from '../Survey/SurveyCreationPage';
import HomePage from '../Home/HomePage';
import AnalyticsPage from '../Analytics/AnalyticsPage';

import { useSelector } from "react-redux";


export default function PageContainer() {

    //repplace true with if auth token is not null or something 
    // or if user is authenticated. Probably lets make a new redux crap
    const authenticated = useSelector(state => state.user.authenticated)

    return (
        <div>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route exact path="/">
                    {authenticated ? <Redirect exact from="/" to="/home" /> : <Redirect exact from="/" to="/login" />}
                </Route>
                {authenticated && (
                    <div>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/create" component={SurveyPage}/>
                        <Route path="/analytics" component={AnalyticsPage}/>
                    </div>
                )}  
            </Switch>
        </div>
    )
}