import React, {useState,useRef,useCallback} from 'react'

const useHover = () => {
  const ref = useRef()
  const [isHovered,setIsHovered] = useState(false)  


  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

   const callBackRef = useCallback((node)=>{
      console.log("ref",ref)
      console.log("node",node)
      if(node){
        node.addEventListener('mouseenter', onMouseEnter);
        node.addEventListener('mouseleave', onMouseLeave);
      }
      return()=>{
        node.removeEventListener('mouseenter', onMouseEnter);
        node.removeEventListener('mouseleave', onMouseLeave);
    }
    },[])

  return [callBackRef, isHovered];
}

export default useHover
