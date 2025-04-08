import React,{useState,useEffect} from 'react'

import useFocus from "./useFocus"

const UseFocus = () => {
  const [ref, isFocused] = useFocus(null);
  const [refTarget, setRefTarget] = useState(0);

  useEffect(()=>{
    console.log(refTarget)
  },[refTarget])
  return (
    <div>
      <p>{isFocused ? 'focused' : 'not focused'}</p>
      <button
        data-testid="change-ref-target-button"
        onClick={() => {
          setRefTarget((target) => (target + 1) % 2)
        }}
      >
        toggle ref target
      </button>
      <input ref={refTarget === 0 ? ref : null} data-testid="focus-target0" />
      <input ref={refTarget === 1 ? ref : null} data-testid="focus-target1"/>
    </div>
  )
}

export default UseFocus
