import React, {useEffect} from 'react';
import {formatTime} from '@/utils';

interface TimerProps {
    time: number;
    isTestStarted: boolean;
    handleSetTime: (time: (prevTime: any) => any) => void;
    handleResetTimer: () => void;
}

const Timer = (props: TimerProps) => {
    const {time, handleSetTime, isTestStarted, handleResetTimer} = props;

    useEffect(() => {
        let interval: string | number | NodeJS.Timer | undefined;

        if (isTestStarted) {
            interval = setInterval(() => {
                handleSetTime((prevTime) => prevTime + 0.01); // Add 0.01 seconds (10 milliseconds)
            }, 10);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTestStarted, handleSetTime]);

    return (<div>
        <h1>{formatTime(time)}</h1>
        <div>
            <span><button onClick={handleResetTimer}>Restart Test</button></span>
        </div>
    </div>)
}

export default Timer;