import React from 'react'
import * as AnalyticsTypes from './AnalyticsTypeStrings'
import MultipleChoiceGraph from './MultipleChoiceGraph'
import WordCloudPlaceholder from './CloudVisualizer'
import StarGraph from './StarRatingGraph'
import ResponseGraph from './ResponseGraph'
import { Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    innerPrompt: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#A9A9A9"
    }
}));


export default function Visualizer(props) {

    const classes = useStyles();

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
            default: return emptyComponent();
        }
    }

    const emptyComponent = () => {
        return <div>
            <Typography variant="h4" className={classes.innerPrompt}>Please select a question or response</Typography>
        </div>
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