import React, { useEffect, useState } from 'react'

type TypeParagraphProps = {
  text: string
}

const TypeParagraph = (props: TypeParagraphProps) => {
  const listText = props.text.split('')

  // State for keys pressed and current character
  const [typedCharacters, setTypedCharacters] = useState<string[]>([])
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
  const [displayText, setDisplayText] = useState<string[]>([...listText])

  useEffect(() => {
    const SPECIAL_KEYS = [
      'Shift',
      'Control',
      'Alt',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'CapsLock',
      'Meta',
      'Unidentified',
    ]

    // Event listener to handle key presses
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (!SPECIAL_KEYS.includes(key)) {
        if (
          parseKeys(key) === listText[currentCharacterIndex] &&
          typedCharacters.length === 0
        ) {
          moveToNextCharacter()
        } else if (key === 'Backspace') {
          handleBackSpace()
        } else {
          handleIncorrectKey(key)
        }
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

      if (newPosition === listText.length) {
        console.log('Test ended!')
      }
    }

    // Handles the Backspace key press and updates state
    const handleBackSpace = () => {
      if (typedCharacters.length > 0) {
        setTypedCharacters((prevItems) =>
          prevItems.slice(0, prevItems.length - 1)
        )
      } else {
        const newPosition =
          currentCharacterIndex == 0 ? 0 : currentCharacterIndex - 1
        setCurrentCharacterIndex(newPosition)
      }
    }

    // Handles an incorrect key press and updates state
    const handleIncorrectKey = (key: string) => {
      setTypedCharacters((prevKeys) => [...prevKeys, parseKeys(key)])
    }

    const calculateDisplayText = () => {
      // Calculate the new display text based on the current state
      const newDisplayText = [...listText]

      // Insert the keysPressed characters at the currentCharacter.position
      newDisplayText.splice(currentCharacterIndex, 0, ...typedCharacters)

      // Update the displayText state using the calculated newDisplayText
      setDisplayText(newDisplayText)
      console.log(newDisplayText)
    }

    document.addEventListener('keydown', handleKeyDown)
    calculateDisplayText()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharacterIndex, typedCharacters])

  return (
    <span className="">
      {displayText.map((char, index) => {
        const keyPressedLength = typedCharacters.length
        let charStyle: string
        if (
          index <= currentCharacterIndex + keyPressedLength - 1 &&
          index >= currentCharacterIndex
        ) {
          // Wrong
          charStyle = `bg-red-400`
        } else if (index < currentCharacterIndex) {
          // Correct
          charStyle = `bg-green-400`
        } else {
          // Remaining
          charStyle = `bg-gray-400`
        }

        return (
          <span className={charStyle} key={char + index}>
            {char}
            {char == '\n' ? <br /> : <></>}
          </span>
        )
      })}
    </span>
  )
}

export default TypeParagraph
