import React from 'react';

interface TimerProps {
    time: string;
    handleResetTimer: () => void;
}

const Timer = (props: TimerProps) => {
    const {time, handleResetTimer} = props;

    return (<div>
        <h1>{time}</h1>
        <div>
            <span><button onClick={handleResetTimer}>Restart Test</button></span>
        </div>
    </div>)
}

export default Timer;