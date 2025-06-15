/* eslint-disable */
import React,{useState,useEffect,useReducer} from 'react'
import Comment from './Comment';
import {jsx, css } from '@emotion/react'
import { v4  } from 'uuid';

const AllComments = ({allComments,dispatch}) => {
  return (
    <div>
      {allComments?.map((comment)=>{
        // eslint-disable-next-line react/jsx-key
        return <Comment comment={comment} dispatch={dispatch} depth={0}/>
      })}
    </div>
  )
}

export default React.memo(AllComments)
