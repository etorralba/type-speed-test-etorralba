import React, {useEffect, useState} from 'react';
import TypeParagraph from '../TypeParagraph/TypeParagraph';
import Timer from '../Timer/Timer';

export interface TypeChar {
    char: string;
    time: number;
}

// TODO: Move this to a utils file
const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
};

const TypeTest = () => {
    /* TODO: Calculate test results:
        Typing Speed, Typing Accuracy, Typing Error Rate, Typing Rollovers,
        Typing KSPM, Typing GWPM, Typing NWPM, Typing Consistency, Timed Segments*/
    // TODO: Added Reset Test button
    // TODO: Pause Test functionality

    // State for global test record
    const [testRecord, setTestRecord] = useState<TypeChar[]>([]);
    const [testText, setTestText] = useState<string>('Neque');
    const [wrongTypedChar, setWrongTypedChar] = useState<string[]>([]);
    const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
    const [isTestEnded, setIsTestEnded] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    // Type Handlers
    // Handle correct key
    const handleCorrectKey = (record: TypeChar) => {
        const newTestRecord = [...testRecord];
        newTestRecord.push(record);
        setTestRecord(newTestRecord);
    }

    // Handle incorrect key
    const handleIncorrectKey = (key: string) => {
        const newWrongTypedChar = [...wrongTypedChar];
        newWrongTypedChar.push(key);
        setWrongTypedChar(newWrongTypedChar);
    }

    // Handle backspace key
    const handleBackSpace = () => {
        if (wrongTypedChar.length > 0) {
            const newWrongTypedChar = [...wrongTypedChar];
            newWrongTypedChar.pop();
            setWrongTypedChar(newWrongTypedChar);
        } else {
            const newTestRecord = [...testRecord];
            newTestRecord.pop();
            console.log("newTestRecord: ", newTestRecord)
            setTestRecord(newTestRecord);
        }
    }

    // Timer Handlers
    const handleStartTest = () => {
        setIsTestStarted(true);
    }

    const handlePauseTest = () => {
        setIsTestStarted(false);
    }

    const handleEndTest = () => {
        setIsTestStarted(false);
        setIsTestEnded(true);
    }

    const handleResetTimer = () => {
        setIsTestStarted(false)
        setIsTestEnded(false);
        setTestRecord([])
        setWrongTypedChar([]);
        setTime(0);
    };

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

    useEffect(() => {
        console.log("testRecord: ", testRecord);
    }, [testRecord]);

    return (<div className='bg-white text-black'>
        <TypeParagraph
            text={testText}
            wrongTypedChar={wrongTypedChar}
            time={time}
            isTestStarted={isTestStarted}
            isTestEnded={isTestEnded}
            testRecord={testRecord}
            handleCorrectKey={handleCorrectKey}
            handleIncorrectKey={handleIncorrectKey}
            handleBackSpace={handleBackSpace}
            handleEndTest={handleEndTest}
            handleStartTest={handleStartTest}
            handlePauseTest={handlePauseTest}
        />
        <Timer time={formatTime(time)} handleResetTimer={handleResetTimer}/>
    </div>);
}

export default TypeTest;