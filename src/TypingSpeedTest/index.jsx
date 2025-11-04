import React from 'react'
import { PARAGRAPH, CHAR_STATUS } from './Utils'
import "./styles.css"
import {useState,useRef,useMemo} from "react"
import { useTimer } from './useTimer'
/*
Algorithm

We have an initial paragraph and a user has to type the same paragraph.
The user has to type the paragraph in a certain time limit.
As user types we have to check if current keystroke matches with the current paragraph character

1. On the first keystroke if matches, then set color to green
2. Else mark red and all subsequent characters to red.
3. On start set a timer from 30s to 0s
4. Finish criteria
  - If all the characters are typed
  - If time runs out
5. Stats
  - Words per minute
  - Accuracy (Out of total typed characters how many were correctly typed)
6. Button to retry/reset
*/

const intialCharacters = PARAGRAPH.split("").map((char) => {
  return {
    char,
    status : CHAR_STATUS.UNTYPED
  }
})

const INITIAL_TIME = 30

const TypingSpeedTest = () => {
  const [characters, setCharacters] = useState(intialCharacters)
  const [inputCharacters, setInputCharacters] = useState("")
  const [appState, setAppState] = useState("idle")
  const [correctlyTypedCharacters, setCorrectlyTypedCharacters] = useState(0)
  const [totalTypedCharacters, setTotalTypedCharacters] = useState(0)
  const inputRef = useRef(null)
  const {timeLeft,startTimer,resetTimer } = useTimer({
    initialTime : INITIAL_TIME,
    onFinish : () => setAppState("finished")
  });

  const handleOnInputChange = (e) => {
    const value = e.target.value;
    if(appState === "finished") return

    if(appState === 'idle')  {
      startTimer()
      setAppState("typing")
    }
    
    if(value.length === characters.length){
      setAppState("finished")
    }
    
    const delta = value.length - inputCharacters.length

    if(delta > 0){
      setTotalTypedCharacters(p => p+delta)
    }
    let correctChars = 0
    let isMistakeFound = false;
    
    const updateCharactersStatus = characters.map((ch,i)=>{
      let status = CHAR_STATUS.UNTYPED
      if(i<value.length){
        if(isMistakeFound){
          status = CHAR_STATUS.INCORRECT
        }
        if(value[i] === ch.char){
          status = CHAR_STATUS.CORRECT
          correctChars++
        }
        else {
          status = CHAR_STATUS.INCORRECT
          isMistakeFound = true
        }
      }
     

      return {
        char : ch.char,
        status
      }
    })

    setInputCharacters(e.target.value)
    setCharacters(updateCharactersStatus)
    setCorrectlyTypedCharacters(correctChars)
  }

  const setInputRefFocus = () =>{
    inputRef?.current?.focus();
  }

 
  const reset = () => {
    setAppState('idle');
    totalTypedCharacters(0);
    setCorrectlyTypedCharacters(0);
    setCharacters(intialCharacters);
    setInputCharacters('');
    resetTimer();
  }

   const stats = useMemo(() => {
    if (appState === 'finished') {
      // do calculation
      const accuracy = totalTypedCharacters > 0
        ? ((correctlyTypedCharacters / totalTypedCharacters) * 100).toFixed(1)
        : '0.0';

      // 30 - 20 => 10
      // 30 - 0 => 30
      const elpasedSeconds = INITIAL_TIME - timeLeft;
      const minutes = elpasedSeconds > 0 ? elpasedSeconds / 60 : 0;

      // a word would 5 chars
      const words = correctlyTypedCharacters / 5;
      const wpm = Math.floor(words / minutes);

      return {
        accuracy,
        wpm
      }
    }

    return {
      wpm: 0,
      accuracy: 0
    }
  }, [appState])

  return (
    <div className="container" onClick={setInputRefFocus}>
        <div className="timer">
        {timeLeft}
        </div>
        <div className="paragraph">
        {characters.map((ch,index)=>{
           const isCaret = inputCharacters.length === index;
          return  <span className={[ "char", ch.status, isCaret && "caret"].join(" ")} key={`${index}-${ch.char}`}>
                {ch.char === ' ' ? <>&nbsp;</> : ch.char}
            </span>
        })}
        <input ref={inputRef} className="hiddenInput" value={inputCharacters} onChange={(e)=>handleOnInputChange(e)}/>
        </div>
        <div className="results">
            <div>Words Per Minute:{stats.wpm}</div>
            <div>Accuracy:{stats.accuracy}</div>
            <button onClick={()=> reset()}>Retry</button>
        </div>
      
    </div>
  )
}

export default TypingSpeedTest
