import React, {useEffect, useState} from 'react'
import {TypeChar} from '../TypeTest/TypeTest'

type TypeParagraphProps = {
    text: string
    wrongTypedChar: string[]
    time: number
    isTestStarted: boolean
    isTestEnded: boolean
    testRecord: TypeChar[]
    handleCorrectKey: (record: TypeChar) => void
    handleIncorrectKey: (wrongTypedChar: string) => void
    handleBackSpace: () => void
    handleEndTest: () => void
    handleStartTest: () => void
    handlePauseTest: () => void
}

const TypeParagraph = (props: TypeParagraphProps) => {
    const {
        text,
        wrongTypedChar,
        time,
        isTestEnded,
        isTestStarted,
        testRecord,
        handleCorrectKey,
        handleIncorrectKey,
        handleBackSpace,
        handleEndTest,
        handleStartTest,
        handlePauseTest
    } = props
    const splitText = text.split('')

    // State for keys pressed and current character
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
    const [displayText, setDisplayText] = useState<string[]>([...splitText])

    // Handle key presses
    useEffect(() => {
        const SPECIAL_KEYS = ['Shift', 'Control', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'CapsLock', 'Meta', 'Unidentified',]

        // Event listener to handle key presses
        const handleKeyDown = (event: KeyboardEvent) => {
            const {key} = event
            if (!SPECIAL_KEYS.includes(key) && !isTestEnded) {
                handleStartTest()
                // If the key pressed is not a special key and is no wrong typed character
                if (parseKeys(key) === splitText[currentCharacterIndex] && wrongTypedChar.length === 0) {
                    moveToNextCharacter()
                    handleCorrectKey({char: parseKeys(key), time: time})
                    return
                } else if (key === 'Backspace') {
                    if (wrongTypedChar.length > 0) {
                        handleBackSpace()
                        return
                    }
                    moveToPrevCharacter()
                    handleBackSpace()
                    return
                }
                handleIncorrectKey(parseKeys(key))
            }
        }

        // Parse special keys to string value
        const parseKeys = (key: string) => {
            return key === 'Enter' ? '\n' : key
        }

        // Moves to the next character and updates state
        const moveToNextCharacter = () => {
            const newPosition = currentCharacterIndex + 1
            setCurrentCharacterIndex(newPosition)

            if (newPosition === splitText.length) {
                handleEndTest()
                console.log('Test ended!')
            }
        }

        // Moves to the previous character and updates state
        const moveToPrevCharacter = () => {
            if (currentCharacterIndex === 0) {
                return
            }
            const newPosition = currentCharacterIndex - 1
            setCurrentCharacterIndex(newPosition)
        }

        // Parses the display text based on the current state
        const parseDisplayText = () => {
            // Calculate the new display text based on the current state
            const newDisplayText = [...splitText]

            // Insert the keysPressed characters at the currentCharacter.position
            newDisplayText.splice(currentCharacterIndex, 0, ...wrongTypedChar)

            // Update the displayText state using the calculated newDisplayText
            setDisplayText(newDisplayText)
        }

        document.addEventListener('keydown', handleKeyDown)
        parseDisplayText()

        if (testRecord.length === 0) {
            setCurrentCharacterIndex(0)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentCharacterIndex, wrongTypedChar, time, testRecord, isTestEnded])

    // Handle window focus
    useEffect(() => {
        window.addEventListener('blur', handlePauseTest)
        return () => {
            window.removeEventListener('blur', handlePauseTest)
        }
    }, [isTestStarted])

    return (<span className="">
      {displayText.map((char, index) => {
          const keyPressedLength = wrongTypedChar.length
          let charStyle: string
          if (index <= currentCharacterIndex + keyPressedLength - 1 && index >= currentCharacterIndex) {
              // Wrong
              charStyle = `bg-red-400`
          } else if (index < currentCharacterIndex) {
              // Correct
              charStyle = `bg-green-400`
          } else {
              // Remaining
              charStyle = `bg-gray-400`
          }

          return (<span className={charStyle} key={char + index}>
            {char}
              {char == '\n' ? <br/> : <></>}
          </span>)
      })}
    </span>)
}

export default TypeParagraph
