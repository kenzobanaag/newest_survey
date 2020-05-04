import React from 'react'
import * as AnalyticsTypes from './AnalyticsTypeStrings'
import MultipleChoiceGraph from './MultipleChoiceGraph'
import WordCloudPlaceholder from './CloudVisualizer'
import StarGraph from './StarRatingGraph'
import ResponseGraph from './ResponseGraph'

export default function Visualizer(props) {

    const grapher = (type, id) => {
        switch(type) {
            case AnalyticsTypes.RESPONSE:
            return <ResponseGraph responseId={id}/>
            case AnalyticsTypes.STAR: 
            return <StarGraph choiceId={id}/>
            case AnalyticsTypes.MULTIPLE: 
            return <MultipleChoiceGraph choiceId={id}/>
            case AnalyticsTypes.TEXTFIELD: 
            return <WordCloudPlaceholder/>
            //probably have this return some text to say that the user should select something
            default: return <div>Select a question or response</div>;
        }
    }

    return(<div>
        {grapher(props.type, props.id)}
    </div>);
}


/*
    The prop will determine what were gonna load

    There will be a graph option and a response view option

    Types: MutlipleChoice, TextField, Stars, Response
    (type, id, number)

    Q: (questionType, surveyID, questionNumber)
    R: (response, responseID, 0 - <not needed>)

    Factory(props)
    type = props.type
    id = props.id
    num = props.num 
*/