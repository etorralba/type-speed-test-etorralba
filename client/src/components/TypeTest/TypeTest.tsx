import React, {useEffect, useState} from 'react';
import TypeParagraph from '../TypeParagraph/TypeParagraph';
import Timer from '../Timer/Timer';

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
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)

    const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
    const [isTestEnded, setIsTestEnded] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    // Handle typed character
    const handleTypedChar = (record: TypeChar, index: number) => {
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
        //Todo: Add error handling
        const splitText = text.split('');
        const parsedText = splitText.map((char) => {
            return {
                textChar: char, attemptChar: undefined, time: 0, isCorrect: false, attempt: 0
            } as TypeChar
        })
        setTestText(parsedText);
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
    </div>);
}

export default TypeTest;