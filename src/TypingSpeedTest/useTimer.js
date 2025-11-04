import {useState, useRef} from "react"
export const useTimer = ({initialTime, onFinish}) => {
 const [timeLeft, setTimeLeft] = useState(initialTime);
 
 const timerId = useRef();

 const startTimer = () => {
  timerId.current = setInterval(() => {
     setTimeLeft((t)=>{
        if(t<=1){
          clearInterval(timerId)
          timerId.current = null;
          onFinish()
          return 0
        }
        return t-1
     });    
   }, 1000);
 }
 
 const resetTimer = () =>{
    setTimeLeft(initialTime)
    timerId.current = null
 }
 return {
    timeLeft,
    startTimer,
    resetTimer
 }
}