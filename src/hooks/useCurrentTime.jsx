import { useState } from "react"

const useCurrentTime = () => {
  const [value, setValue] = useState("")

  const getCurrentTime = () => {
    const newDate = new Date
    const formattedDate = `${newDate.getDate().toString().padStart(2, '0')}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getFullYear()}`;
    const formattedTime = `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}:${newDate.getSeconds().toString().padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    setValue(formattedDateTime)
  }

  return {
    value,
    getCurrentTime
  }
}

export default useCurrentTime