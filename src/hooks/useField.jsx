import { useState } from "react"

const useField = (initialState) => {
  const [value, setValue] = useState(initialState)

  const changeValue = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const clean = () => {
    setValue("")
  }

  return {
    value,
    changeValue,
    clean
  }
}

export default useField