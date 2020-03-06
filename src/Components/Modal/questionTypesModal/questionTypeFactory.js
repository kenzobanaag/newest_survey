import React from 'react';
import MultipleChoiceType from './multipleChoiceType';
import StarRatingType from './starRatingType'
import TextFieldType from './textFieldType'
import * as qTypeStrings from './questionTypeStrings'

export default function QuestionFactory(props) {

    const returnType = (type,id) => {
        switch(type) {
            case qTypeStrings.MULTIPLE:
                return <MultipleChoiceType qID={id}/>;
            case qTypeStrings.STAR:
                return <StarRatingType qID={id}/>;
            case qTypeStrings.TEXTFIELD:
                return <TextFieldType qID={id}/>
            default: return <div/>
        }
    }

    return (<div>
        {returnType(props.type, props.qID)}
    </div>);


}