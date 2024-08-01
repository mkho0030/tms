import React, { useState } from 'react'

const useField = () => {
  const [isPassswordVisible, setIsPasswordVisible] = useState(false)

  return {isPassswordVisible, setIsPasswordVisible}
}

export default useField