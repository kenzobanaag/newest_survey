import React from 'react';
import TimerTrigger from './timerBasedTrigger'
import * as triggerStrings from './triggerTypeStrings'

export default function TriggerFactory(props) {

    const getType = (type) => {
        switch(type) {
            case triggerStrings.TIMER:
                return <TimerTrigger/>;
            case triggerStrings.SCROLL:
                return <div/>;
        }
    }

    return (<div>
        {getType(props.type)}
    </div>);
}