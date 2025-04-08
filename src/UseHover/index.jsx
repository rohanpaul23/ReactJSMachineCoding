import React from 'react'

import useHover from "./useHover"

const UseRef = () => {
  const [ref,isHovered] = useHover();  
  return (
    <div ref={ref}>
     {isHovered ? "Is hovered": "Not hovered"}
    </div>
  )
}

export default UseRef
