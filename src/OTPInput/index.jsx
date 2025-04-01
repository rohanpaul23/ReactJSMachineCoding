/* eslint-disable no-unused-vars */
// @ts-ignore
import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'

const OTPInput = ({noOfInputs}) => {

  const [inputArr,setInputArr] = useState(Array(noOfInputs).fill(""))  

  const refArr = useRef([])


  const handleChange = (value,index)=>{
    let arrToCopy = [...inputArr]
    arrToCopy[index] = value.slice(-1)
    setInputArr(arrToCopy)
    value != "" && refArr?.current[index+1]?.focus()
  }

  const handleOnKeyDown = (e,index)=>{
    if(!e.target.value && e.key === "Backspace"){
        refArr?.current[index-1]?.focus()
    }
  }

  return (
    <div>
      {inputArr?.map((input,index)=>{
        return <input
            css={css({
                border: "1px solid black",
                height: 30,
                width: 30,
                margin: 10,
            })} 
            type='number'
            key={index}
            value={inputArr[index]}
            ref={input=> (refArr.current[index] = input)}
            onChange={(e)=>handleChange(e.target.value,index)}
            onKeyDown={(e)=>handleOnKeyDown(e,index)}
        />
      })}
    </div>
  ) 
}

export default OTPInput
