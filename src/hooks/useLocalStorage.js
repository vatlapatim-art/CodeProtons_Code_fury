import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue === null
        ? initialValue
        : JSON.parse(storedValue)
    } catch {
      return initialValue
    }
  })

  const updateValue = (nextValue) => {
    setValue((currentValue) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? nextValue(currentValue)
          : nextValue

      try {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue))
      } catch {
        return resolvedValue
      }

      return resolvedValue
    })
  }

  return [value, updateValue]
}

export default useLocalStorage
