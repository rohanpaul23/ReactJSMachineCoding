// /** @jsx jsx */
// /** @jsxImportSource @emotion/react */
/* eslint-disable */
import {useState} from "react"
import { jsx, css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StarWidget = ({numberOfStars}) => {
  const [selectedIndex,setSelectedIndex] = useState(-1)
  const handleClick = (val)=>{
    setSelectedIndex(val)
  }

  const renderStars = () => {
    let spans = []
    for(let i=0;i<numberOfStars; i++){
      spans.push(<span css={css({
                    fontSize: 50,
                    color : i<= selectedIndex ? "gold" : "" 
                })} data-index={i+1} onClick={(e)=>handleClick(i)}>&#9733;</span>)
    }
    return spans
  }

  return (
    <div css={css({
                    border: "1px solid black",
                    height: 100,
                    width: 500,
                    margin: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap : 10
                })} >
      {renderStars()}
    </div>
  )
}

export default StarWidget
