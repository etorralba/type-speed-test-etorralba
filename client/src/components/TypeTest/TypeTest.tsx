import React, {useEffect, useState} from 'react';
import TypeParagraph from '../TypeParagraph/TypeParagraph';
import Timer from '../Timer/Timer';
import {formatTime} from '@/utils';

export interface TypeChar {
    textChar: string;
    attemptChar: string | undefined;
    time: number;
    isCorrect: boolean;
    attempt: number;
}

const TypeTest = () => {

    // State for global test record
    const [text, setText] = useState<string>('Lorem Ipsum is simply dummy text.');
    const [testText, setTestText] = useState<TypeChar[]>([]);

    const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
    const [isTestEnded, setIsTestEnded] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    // Type Handlers
    // Handle character typed
    const handleTypedChar = (record: TypeChar, index: number) => {
        const newTestText = [...testText];
        newTestText[index] = record;
        setTestText(newTestText);
    }

    // Timer Handlers
    const handleStartTest = () => {
        setIsTestStarted(true);
        parseText(text);
    }

    const handlePauseTest = () => {
        setIsTestStarted(false);
    }

    const handleEndTest = () => {
        setIsTestStarted(false);
        setIsTestEnded(true);
    }

    // Reset Test
    const handleResetTimer = () => {
        setIsTestStarted(false)
        setIsTestEnded(false);
        parseText(text);
        setTime(0);
    };

    // Parse text into testText
    const parseText = (text: string) => {
        //Todo: Add error handling
        const splitText = text.split('');
        const parsedText = splitText.map((char) => {
            return {
                textChar: char,
                attemptChar: undefined,
                time: 0,
                isCorrect: false,
                attempt: 0
            } as TypeChar
        })
        setTestText(parsedText);
    }

    useEffect(() => {
        parseText(text);
    }, []);

    //TODO: Move timer logic to separated component

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTestStarted) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 0.01); // Add 0.01 seconds (10 milliseconds)
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTestStarted, time]);

    return (<div className='bg-white text-black'>
        <TypeParagraph
            text={text}
            time={time}
            isTestStarted={isTestStarted}
            isTestEnded={isTestEnded}
            testText={testText}
            handleTypedChar={handleTypedChar}
            handleEndTest={handleEndTest}
            handleStartTest={handleStartTest}
            handlePauseTest={handlePauseTest}
        />
        <Timer time={formatTime(time)} handleResetTimer={handleResetTimer}/>
    </div>);
}

export default TypeTest;