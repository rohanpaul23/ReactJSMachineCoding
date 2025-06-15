/* eslint-disable */
import React from 'react'
import {useState,useEffect,useReducer,useCallback} from 'react'
import { jsx, css } from '@emotion/react'
import commentsReducer from './CommentsReducer';

const Comment = ({comment,dispatch,depth}) => {
  const [isEdit, setIsEdit] = useState(false)  
  const [isReply, setIsReply] = useState(false)  
  const [currentComment, setCurrentComment] = useState(comment.comment)  
  const [repliedComment, setRepliedComment] = useState("")  
  const handleChange = (e)=>{
    setCurrentComment(e.target.value)
  }

  const handleUpdatedComment = () => {
    setIsEdit(false)
    dispatch({
        type : "update",
        payload : {
            id : comment.commentId,
            currentComment
        }
    })
  }

  const handleReplySave = (parentId) =>{
    setIsReply(false)
    dispatch({
          type : "replysave",
          payload : {
              parentId,
              comment: repliedComment
          }
      })
    setRepliedComment("")
  }

  const renderReplyDelete = () => {
    return <div>
        {currentComment}
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>setIsEdit(true)}>Edit</button>
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>setIsReply(true)}>Reply</button>
       <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=> dispatch({type: "delete", payload : comment.commentId})}>Delete</button>
    </div>
  }

  const renderSaveCancel = () => {
    return <div>
     <input type="textbox" value={currentComment} onChange={(e)=>handleChange(e)}/>
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>setIsEdit(false)}>Cancel</button>
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>handleUpdatedComment()}>Save</button>
      </div>
  }

  const handleRepliedComment = (e) =>{
    setRepliedComment(e.target.value)
  }

  const renderReplyBox = (depth,parentId) => {
    return <div css={css({
      marginLeft : `${depth}px`
    })}>
     <input type="textbox" value={repliedComment} onChange={(e)=>handleRepliedComment(e)}/>
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>setIsReply(false)}>Cancel</button>
      <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>handleReplySave(parentId)}>Save</button>
      </div>
  }
  
  return (
    <div key={comment.id} css={css({
      display: "flex",
      alignItems: "flex-start",
      flexDirection : "column",
      marginTop: 10,
      marginLeft : `${depth * 25}px` 
    })}>
     { isEdit ? renderSaveCancel() : renderReplyDelete() }
     {isReply && renderReplyBox(depth*25*2,comment.commentId)}
     {comment?.replies?.map((reply)=>{
        return <Comment comment={reply} dispatch={dispatch} depth={depth+1}/>
     })}
    </div>
  )
}

export default Comment
