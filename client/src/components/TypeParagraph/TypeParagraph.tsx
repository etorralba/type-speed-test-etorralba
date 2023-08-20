import React, { useEffect, useState } from 'react'

type TypeParagraphProps = {
  text: string
}

const TypeParagraph = (props: TypeParagraphProps) => {
  const listText = props.text.split('')

  // State for keys pressed and current character
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [currentCharacter, setCurrentCharacter] = useState({
    key: listText[0],
    position: 0,
  })
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
          parseKeys(key) === currentCharacter.key &&
          keysPressed.length === 0
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
      const newPosition = currentCharacter.position + 1
      setCurrentCharacter({
        key: listText[newPosition],
        position: newPosition,
      })

      if (newPosition === listText.length) {
        console.log('Test ended!')
      }
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
      setKeysPressed((prevKeys) => [...prevKeys, parseKeys(key)])
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

  return (
    <span className="">
      {displayText.map((char, index) => {
        const keyPressedLength = keysPressed.length
        let charStyle: string
        if (
          index <= currentCharacter.position + keyPressedLength - 1 &&
          index >= currentCharacter.position
        ) {
          // Wrong
          charStyle = `bg-red-400`
        } else if (index < currentCharacter.position) {
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
