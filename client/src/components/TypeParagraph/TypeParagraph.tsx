import React, { useEffect, useState } from 'react'

type TypeParagraphProps = {
  text: string
}

const TypeParagraph = (props: TypeParagraphProps) => {
  // let listText = props.text.split('')
  let listText = 'props\nHello'.split('')
  console.log(listText)

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
          parseKeys(key) == currentCharacter.key &&
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

    // Parse special keys to string value
    const parseKeys = (key: string) => {
      let parsedKey: string
      if (key == 'Enter') {
        parsedKey = '\n'
      } else {
        parsedKey = key
      }
      return parsedKey
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
      let parsedKey: string
      if (key == 'Enter') {
        parsedKey = '\n'
      } else {
        parsedKey = key
      }
      setKeysPressed((prevKeys) => [...prevKeys, parsedKey])
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
    <span className="bg-slate-400">
      {displayText.map((char, index) => {
        // Correct Typed Words
        return (
          <span className="bg-slate-600" key={char + index}>
            {char}
            {char == '\n' ? <br /> : <></>}
          </span>
        )
      })}
    </span>
  )
}

export default TypeParagraph
