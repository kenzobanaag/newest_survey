import React from 'react';
import { useSelector} from "react-redux";
import Rating from 'material-ui-rating'


export default function StarGraph(props) {

    const currentId = props.choiceId;

    //grab the current loaded survey and get the maxStars of the question with the same choiceId
    const question = useSelector(state => state.create.questions)

    var starAverage = 0;
    var maxStars = 9;

    const responses = useSelector(state => state.analytics.responses)

    const initData = () => {
        if(responses.length > 0 && currentId !== undefined) {
            responses.map(element => element.answers.map(answer => getSum(answer))) 

            calculateAverage();
            getMaxStars();
        }
    }

    const getMaxStars = () => {
        if(question.length > 0)
            question.map(element => element.questionId === currentId ? maxStars = element.maxStars : 0)
    }

    const getSum = (answer) => {
        if (answer.questionID === currentId)
            starAverage += answer.stars
    }

    const calculateAverage = () => {
        if(starAverage > 0 && responses.length > 0)
            starAverage /= responses.length;
    }

    return (
        <div>
            {initData()}
            <Rating
            value={starAverage}
            max={maxStars}
            readOnly = {true}
            />
            <br/>
            Average Stars:
            {starAverage.toFixed(2)}
        </div>
    );
}
/*
    Average stars, median,
*/