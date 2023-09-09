import {useEffect, useState} from 'react';

interface IResultProps {
    time: number;
    testText: ITypeChar[];
    testResults: ITestResults;
    isTestEnded: boolean;
    handleTestResults: (testResults: ITypeChar[]) => void;
}

const Results = (props: IResultProps) => {
    // Destructure props
    const {time, testText, testResults, isTestEnded, handleTestResults} = props;

    // State for test results
    const [typedText, setTypedText] = useState<string>('');
    const [totalCharTyped, setTotalCharTyped] = useState<number>(0);
    const [totalWrongTypedChar, setTotalWrongTypedChar] = useState<number>(0);

    const calculateCharactersPerMinute = () => {
        // Typing Speed = (Total Characters Typed / Total Time Taken) * 60
        const totalCharTyped = typedText.length;
        const totalMin = time / 60;
        return (totalCharTyped / totalMin).toFixed(2)
    }

    const calculateWorldsPerMinute = () => {
        // Typing Speed = (Total Words Typed / Total Time Taken) * 60
        const totalWordsTyped = typedText.split(' ').length;
        const totalMin = time / 60;
        return (totalWordsTyped / totalMin).toFixed(2)
    }

    const calculateTypingAccuracy = () => {
        // Typing Accuracy = (Total Characters Typed - Total Errors) / Total Characters Typed * 100
        const totalCharTyped = typedText.length;
        const totalErrors = totalWrongTypedChar;
        return ((totalCharTyped - totalErrors) / totalCharTyped * 100).toFixed(2)
    }

    const calculateTypingErrorRate = () => {
        // Typing Error Rate = Total Errors / Total Characters Typed * 100
        const totalCharTyped = typedText.length;
        const totalErrors = totalWrongTypedChar;
        return (totalErrors / totalCharTyped * 100).toFixed(2)
    }

    const calculateTypingRollovers = () => {
        const rolledOverChars = testText.filter((record) => record.attempt > 1);
        const rolloverCount = rolledOverChars.reduce((acc, record) => acc + record.attempt, 0);
        return rolloverCount;
    }

    const calculateTypingKSPM = () => {
        //KSPM = (Total Keystrokes Typed) / Time (minutes)
        // use a reducer to sum up all the atemps for each char
        const totalCharTyped = testText.reduce((acc, record) => acc + record.attempt, 0);
        const totalMin = time / 60;
        return (totalCharTyped / totalMin).toFixed(2)
    }

    const calculateTypingGWPM = () => {
        // GWPM = (Total Characters Typed / 5) / Time (minutes)
        const totalCharTyped = testText.reduce((acc, record) => acc + record.attempt, 0);
        const totalMin = time / 60;
        return ((totalCharTyped / 5) / totalMin).toFixed(2)
    }

    const calculateTypingNWPM = () => {
        // NWPM = [(Total Characters Typed - Total Errors) / 5] / Time (minutes)
        const totalCharTyped = typedText.length;
        const totalErrors = totalWrongTypedChar;
        const totalMin = time / 60;
        return (((totalCharTyped - totalErrors) / 5) / totalMin).toFixed(2)
    }

    const calculateTypingConsistency = () => {
        if (testText.length < 2) {
            return 100; // Consistency is 100% if there are fewer than 2 keystrokes
        }

        // Calculate time intervals between keypresses
        const intervals: number[] = [];
        for (let i = 1; i < testText.length; i++) {
            const interval = testText[i].time - testText[i - 1].time;
            intervals.push(interval);
        }

        // Calculate the standard deviation of time intervals
        const meanInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        const squaredDifferences = intervals.map((interval) => Math.pow(interval - meanInterval, 2));
        const variance = squaredDifferences.reduce((sum, squaredDifference) => sum + squaredDifference, 0) / intervals.length;
        const standardDeviation = Math.sqrt(variance);

        // Calculate consistency as a percentage (lower standard deviation indicates higher consistency)
        const maxDeviation = Math.max(standardDeviation, 1); // Ensure a minimum standard deviation of 1 for normalization
        const consistencyPercentage = (1 - standardDeviation / maxDeviation) * 100;

        return consistencyPercentage;
    }

    useEffect(() => {
        setTypedText(testText.map((record) => record.attemptChar).join(''));

        setTotalWrongTypedChar(testText.filter((record) => !record.isCorrect).length);
        handleTestResults({
            typingCPM: calculateCharactersPerMinute(),
            typingWPM: calculateWorldsPerMinute(),
            typingAccuracy: calculateTypingAccuracy(),
            typingErrorRate: calculateTypingErrorRate(),
            typingRollovers: calculateTypingRollovers(),
            typingKSPM: calculateTypingKSPM(),
            typingGWPM: calculateTypingGWPM(),
            typingNWPM: calculateTypingNWPM(),
            typingConsistency: calculateTypingConsistency()
        });
    }, [isTestEnded, testText]);

    return (<div className="">
            <h2>Results</h2>
            <div className="">
                <p>CPM: {testResults.typingCPM}</p>
                <p>WPM: {testResults.typingWPM}</p>
                <p>Accuracy: {testResults.typingAccuracy}%</p>
                <p>RollOvers: {testResults.typingRollovers}</p>
                <p>Accuracy: {testResults.typingRollovers}%</p>
                <p>KSPM: {testResults.typingKSPM}</p>
                <p>GWPM: {testResults.typingGWPM}</p>
                <p>NWPM: {testResults.typingNWPM}</p>
                {/*<p>Consistency: {testResults.typingConsistency}%</p>*/}
            </div>
        </div>)
}

export default Results;