import React, { useEffect, useState } from 'react'

type TypeParagraphProps = {
  text: string
}

const TypeParagraph = (props: TypeParagraphProps) => {
  let listText = props.text.split('')

  // State for keys pressed and current character
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [currentCharacter, setCurrentCharacter] = useState({
    key: listText[0],
    position: 0,
  })
  const [displayText, setDisplayText] = useState<string[]>([...listText])

  useEffect(() => {
    // Event listener to handle key presses
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      const isSpecialKey = [
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
      ].includes(key)

      if (!isSpecialKey) {
        if (
          event.key == currentCharacter.key &&
          keysPressed.length == 0 &&
          currentCharacter.position != listText.length - 1
        ) {
          moveToNextCharacter()
        } else if (key == 'Backspace') {
          handleBackSpace()
        } else if (currentCharacter.position == listText.length - 1) {
          console.log('Test ended!')
          document.removeEventListener('keydown', handleKeyDown)
        } else {
          handleIncorrectKey(key)
        }
      }
    }

    // Moves to the next character and updates state
    const moveToNextCharacter = () => {
      const newPosition = currentCharacter.position + 1
      setCurrentCharacter({
        key: listText[newPosition],
        position: newPosition,
      })
    }

    // Handles the Backspace key press and updates state
    const handleBackSpace = () => {
      if (keysPressed.length > 0) {
        setKeysPressed((prevItems) => prevItems.slice(0, prevItems.length - 1))
      } else {
        const newPosition =
          currentCharacter.position == 0 ? 0 : currentCharacter.position - 1
        setCurrentCharacter({
          key: listText[newPosition],
          position: newPosition,
        })
      }
    }

    // Handles an incorrect key press and updates state
    const handleIncorrectKey = (key: string) => {
      setKeysPressed((prevKeys) => [...prevKeys, key])
    }

    const calculateDisplayText = () => {
      // Calculate the new display text based on the current state
      const newDisplayText = [...listText]

      // Insert the keysPressed characters at the currentCharacter.position
      newDisplayText.splice(currentCharacter.position, 0, ...keysPressed)

      // Update the displayText state using the calculated newDisplayText
      setDisplayText(newDisplayText)
    }

    document.addEventListener('keydown', handleKeyDown)
    calculateDisplayText()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentCharacter, keysPressed])

  useEffect(() => {
    console.log(keysPressed)
    console.log(currentCharacter)
  }, [keysPressed, currentCharacter, displayText])

  return (
    <span className="">
      {displayText.map((char, index) => {
        if (index == currentCharacter.position) {
          keysPressed.length > 0
            ? keysPressed.map((char, index) => {
                return (
                  <span key={char + index} className="">
                    {char}
                  </span>
                )
              })
            : ''
        }
        return (
          <span key={char + index} className="">
            {char}
          </span>
        )
      })}
    </span>
  )
}

export default TypeParagraph
