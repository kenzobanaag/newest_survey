import React from 'react'
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis } from 'recharts'

import { useSelector} from "react-redux";

// const testPrint = () => {
//     console.log(responses.map(element => element.map(answer => (answer.questionID + "," + answer.answerType))))
// }

export default function MultipleChoiceGraph(props) {

    //let responses;
    let data = [];

    const currentId = props.choiceId;

    const responses = useSelector(state => state.analytics.responses)

    const dictionary = {
        "0" : 0,
        "1" : 0,
        "2" : 0,
        "3" : 0,
    }

    const initData = () => {
        //console.log(responses.map(element => element.map(answer => answer.filter(selectionId => selectionId > 0))))
        //return responses.map(element => element.map(answer => ({ name: "Choice#:" + answer.selectionID })))
        if(responses.length > 0 && currentId !== undefined) {
            responses.map(element => element.answers.map(answer => buildDictionary(answer)))
            buildData();
        }
    }

    const buildDictionary = (answer) => {
        if (answer.questionID === currentId)
            dictionary[answer.selectionID] = ++dictionary[answer.selectionID];
    }

    const buildData = () => {
        for (var key in dictionary) {
            // check if the property/key is defined in the object itself, not in parent
            data.push({
                "name": "Choice #" + key,
                "val": dictionary[key]
            })
        }
    }

    return (
        <div> 
            <BarChart width={500} height={350} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="val" fill="#8884d8" />
            </BarChart>
            {/* add something to the right of the graph, probably legends and all that */}
            {initData()}
        </div>
    );
}

//width={730} height={250}