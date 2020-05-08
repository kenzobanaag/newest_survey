/*
    javascript static methods are called without instantiating the class.
    These methods are also used to create utility functions.. whatever that means 
    
    How to use: import ApiCall from '../File_location'
    Then: 
        ApiCall.getAllSurveyResponses(surveyId).then(response => {process information....})
*/
import axios from 'axios'

const LOCAL_URL = "https://guerilla-backend.azurewebsites.net/api/";

const LOGIN_URL = "https://guerilla-backend.azurewebsites.net/";

const WORD_CLOUD_URL = "http://127.0.0.1:5000/wordcloud";

const USER = "user/";

const SURVEY = "survey/";

const RESPONSE = "response/";

const EMBED = "embed/";

class ApiCall {

    static getWordCloud(id) {
        return (axios.get(WORD_CLOUD_URL));
    }

    static login(userObject) {
        return (axios.post(LOGIN_URL + "login/", userObject));
    }


    static signup(userObject) {
        return (axios.post(LOGIN_URL + "login/register", userObject));
    }


    static newPostSurvey(surveyObject, token) {
        return (axios.post(LOCAL_URL + SURVEY + USER, surveyObject,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }))
    }

    static newUpdateSurvey(surveyObject, token) {
        return (axios.put(LOCAL_URL + SURVEY + SURVEY + surveyObject.surveyId, surveyObject,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }))
    }

    static newDeleteSurvey(token, id) {
        return (axios.delete(LOCAL_URL + SURVEY + SURVEY + id,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }))
    }

    static newGetASurvey(surveyId, token) {
        return (axios.get(LOCAL_URL + SURVEY + SURVEY + surveyId, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }))
    }
    
    static newGetAllSurveys(token) {
        return (axios.get(LOCAL_URL + SURVEY + USER, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }))
    }

    static newGetAllSurveyResponses(surveyId, token) {
        return (axios.get(LOCAL_URL + RESPONSE + SURVEY + surveyId, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }));
    }

    static getEmbedCode(id) {
        //return (axios.get(URL + EMBED + id));
        return (
        "<script type=\"text/javascript\" id=\"embedID\" data-name=\"" + id + "\" src=\"https://guerilla-backend.azurewebsites.net/embed/main.js\"></script>"
        );
    }

    /*
        Gets all survey responses from an id
        @param: surveyId

        Currently returns a survey id, creationTime, an answers array that contains
            [answerType = StarRating, questionId = 0 <- should be varrying, stars:, id]

        "5dec493cf525a2415c89c290"
    */
    static getAllSurveyResponses(surveyId) {
        return (axios.get(LOCAL_URL + RESPONSE + SURVEY + surveyId));
    }

    /*
        Gets one single survey response
        @param: responseId

        Currently cannot access one survey response, im probably not 
        pulling from the latest backend

        "5dec57ba743746253cb0039e" <- id i tried
    */
    static getASurveyResponse(responseId) {
        return (axios.get(LOCAL_URL + RESPONSE + RESPONSE + responseId));
    }

    /*********************************************************************************************/
    /*
        Deprecated stuff
    */
   
    /*
        Gets all the surveys a user has
        @param: userId

        "TestPacito"
    */
   static getAllSurveys(userId) {
    return (axios.get(LOCAL_URL + SURVEY + USER + userId));
    }

    /*
        Gets a single survey
        @param: surveyId

        Returns an object with
        creationTime, owner, published, questions, title, triggers, _id.

        "5dec493cf525a2415c89c290"
    */
    static getASurvey(surveyId) {
    return (axios.get(LOCAL_URL + SURVEY + SURVEY + surveyId));
    }

    static postSurvey(surveyObject,id) {
        return (axios.post(LOCAL_URL + SURVEY + USER + id, surveyObject));
    }

    static deleteSurvey(id) {
        return (axios.delete(LOCAL_URL + SURVEY + SURVEY + id));
    }

    static updateSurvey(surveyObject,id) {
        return (axios.put(LOCAL_URL + SURVEY + SURVEY + id, surveyObject));
    }

}

export default ApiCall;