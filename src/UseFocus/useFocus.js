


import React, { useRef, useCallback, useState } from 'react'

function useFocus() {
  const [isFocused,setIsFocused] = useState(false)
  const ref = useRef()


  const handleToggle = ()=>{
    setIsFocused((prevIsFocused)=> !prevIsFocused);
  }

  const callBackRef = useCallback((node)=>{
    console.log("ref",ref)
    console.log("node",node)
    if(ref.current){
      ref.current.removeEventListener('focus',handleToggle)
      ref.current.removeEventListener('blur',handleToggle)
    }
    // To handle second test case to remove event listeners of previous ref
    ref.current = node
    if(node){
     node.addEventListener('focus',handleToggle)
     node.addEventListener('blur',handleToggle)
    }
  },[])

  return [callBackRef,isFocused];
}

export default useFocus