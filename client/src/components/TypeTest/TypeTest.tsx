import React, {useEffect, useState} from 'react';
import TypeParagraph from '../TypeParagraph/TypeParagraph';
import Timer from '../Timer/Timer';
import Results from '../Results/Results';

export interface ITypeChar {
    textChar: string;
    attemptChar: string | undefined;
    time: number;
    isCorrect: boolean;
    attempt: number;
}

export interface ITestResults {
    typingCPM: number;
    typingWPM: number;
    typingAccuracy: number;
    typingErrorRate: number;
    typingRollovers: number;
    typingKSPM: number;
    typingGWPM: number;
    typingNWPM: number;
    typingConsistency: number;
}

const TypeTest = () => {

    // State for global test record
    const [text, setText] = useState<string>('Lorem Ipsum is simply dummy text.');
    const [testText, setTestText] = useState<ITypeChar[]>([]);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)

    const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
    const [isTestEnded, setIsTestEnded] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    const [testResults, setTestResults] = useState<ITestResults>({
        typingCPM: 0,
        typingWPM: 0,
        typingAccuracy: 0,
        typingErrorRate: 0,
        typingRollovers: 0,
        typingKSPM: 0,
        typingGWPM: 0,
        typingNWPM: 0,
        typingConsistency: 0
    });

    // Handle test results
    const handleTestResults = (results: ITestResults) => {
        setTestResults(results);
    }

    // Handle typed character
    const handleTypedChar = (record: ITypeChar, index: number) => {
        setTestText((prevTestText) => {
            const updatedTestText = [...prevTestText];
            updatedTestText[index] = record;
            return updatedTestText;
        });
    }

    // Handle current character
    const handleCurrentCharacter = (index: number) => {
        setCurrentCharacterIndex(index);
    }

    // Set time
    const handleSetTime = (time: (prevTime: any) => any) => {
        setTime(time);
    }

    // Start Test
    const handleStartTest = () => {
        setIsTestStarted(true);
        parseText(text);
    }

    // Pause Test
    const handlePauseTest = () => {
        setIsTestStarted(false);
    }

    // End Test
    const handleEndTest = () => {
        setIsTestStarted(false);
        setIsTestEnded(true);
    }

    // Reset Test
    const handleResetTimer = () => {
        setIsTestStarted(false);
        setIsTestEnded(false);
        parseText(text);
        setTime(0);
        setCurrentCharacterIndex(0);
    };

    // Parse text into testText
    const parseText = (text: string) => {
        try {
            if (typeof text !== 'string') {
                throw new Error('Text must be a string');
            }

            const splitText = text.split('');
            const parsedText = splitText.map((char) => ({
                textChar: char,
                attemptChar: undefined,
                time: 0,
                isCorrect: false,
                attempt: 0
            })) as ITypeChar[];

            setTestText(parsedText);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        parseText(text);
    }, []);

    return (<div className='bg-white text-black'>
        <TypeParagraph
            time={time}
            isTestStarted={isTestStarted}
            isTestEnded={isTestEnded}
            testText={testText}
            currentCharacterIndex={currentCharacterIndex}
            handleTypedChar={handleTypedChar}
            handleEndTest={handleEndTest}
            handleStartTest={handleStartTest}
            handlePauseTest={handlePauseTest}
            handleCurrentCharacter={handleCurrentCharacter}
        />
        <Timer
            time={time}
            isTestStarted={isTestStarted}
            handleSetTime={handleSetTime}
            handleResetTimer={handleResetTimer}
        />
        <Results
            time={time}
            testText={testText}
            testResults={testResults}
            handleTestResults={handleTestResults}
        />
    </div>);
}

export default TypeTest;