import React, {useEffect} from 'react'
import {parseKeys} from '@/utils'
import {ITypeChar, TypeChar} from '../TypeTest/TypeTest'

type ITypeParagraphProps = {
    handleEndTest: () => void
    handlePauseTest: () => void
    handleStartTest: () => void
    handleTypedChar: (record: ITypeChar, index: number) => void
    handleCurrentCharacter: (index: number) => void
    isTestEnded: boolean
    isTestStarted: boolean
    testText: ITypeChar[]
    time: number
    currentCharacterIndex: number
}

const TypeParagraph = (props: ITypeParagraphProps) => {
    const {
        time, isTestEnded, isTestStarted, testText, currentCharacterIndex, handleCurrentCharacter, handleTypedChar, handleEndTest, handleStartTest, handlePauseTest,
    } = props

    // Handle key presses
    useEffect(() => {
        const SPECIAL_KEYS = ['Shift', 'Control', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'CapsLock', 'Meta', 'Unidentified',]
        // Event listener to handle key presses
        const handleKeyDown = (event: KeyboardEvent) => {
            const {key} = event
            if (!SPECIAL_KEYS.includes(key) && !isTestEnded) {
                if (!isTestStarted) {
                    handleStartTest()
                }
                if (key === 'Backspace') {
                    moveToPrevCharacter()
                    return
                }
                moveToNextCharacter(parseKeys(key))
            }
        }

        // Moves to the next character and updates state
        const moveToNextCharacter = (key: string) => {
            handleTypedChar({
                textChar: testText[currentCharacterIndex].textChar, attemptChar: key, time: time, isCorrect: testText[currentCharacterIndex].textChar === key, attempt: testText[currentCharacterIndex].attempt + 1
            }, currentCharacterIndex)

            const newPosition = currentCharacterIndex + 1
            handleCurrentCharacter(newPosition)

            if (newPosition === testText.length) {
                handleEndTest()
                console.log('Test ended!')
            }
        }

        // Moves to the previous character and updates state
        const moveToPrevCharacter = () => {
            const newPosition = currentCharacterIndex - 1
            if (newPosition < 0) {
                handleCurrentCharacter(0)
                return
            }

            handleCurrentCharacter(newPosition)

            handleTypedChar({
                textChar: testText[newPosition].textChar, attemptChar: undefined, time: time, isCorrect: false, attempt: testText[newPosition].attempt + 1 // Use newPosition here
            }, newPosition)
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentCharacterIndex, time, testText, isTestEnded])

    // Handle window focus
    useEffect(() => {
        window.addEventListener('blur', handlePauseTest)
        return () => {
            window.removeEventListener('blur', handlePauseTest)
        }
    }, [isTestStarted])

    useEffect(() => {
        const text = testText.map((char) => char.textChar).join('')
        console.log("text: ", text)
        console.log("currentCharacterIndex: ", currentCharacterIndex)
    }, [currentCharacterIndex, testText]);
    return (<span className="">
      {testText.map((char, index) => {
          let charStyle: string
          if (index > currentCharacterIndex) {
              charStyle = 'text-gray-400' // Future characters
          } else if (index === currentCharacterIndex) {
              charStyle = 'text-blue-500' // Current character

          } else if (char.attempt > 1 && char.isCorrect) {
              charStyle = 'text-yellow-500' // Corrected character
          } else if (char.isCorrect) {
              charStyle = 'text-green-500' // Correct character
          } else {
              charStyle = 'text-red-500' // Wrong character
          }
          return (<span className={charStyle} key={index}>
            {char.attemptChar ? char.attemptChar : char.textChar}
              {char.attemptChar == '\n' ? <br/> : <></>}
          </span>)
      })}
    </span>)
}

export default TypeParagraph
