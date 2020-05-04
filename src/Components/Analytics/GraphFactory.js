import React from 'react';
import MultGraph from './MultipleChoiceGraph'
import CloudVisualizer from './CloudVisualizer'

export default function GraphFactory(props) {

    const returnType = (type,id) => {
        switch(id) {
            case "1":
                return <MultGraph/>;
            default: return <CloudVisualizer/>
        }
    }

    return (<div>
        {returnType(props.type, props.qID)}
    </div>);


}