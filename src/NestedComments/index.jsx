/* eslint-disable */
import React,{useState,useEffect,useReducer} from 'react'
import Comment from './Comment';
import {jsx, css } from '@emotion/react'
import { v4  } from 'uuid';
import AllComments from './AllComments';
import commentsReducer from './CommentsReducer';


// const commentsData = [
//   {
//     "commentId": "6845abfb3eb7dabb4043332f",
//     "comment": "Anderson",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfb3eb7dabb4043332f",
//         "comment": "Beulah Jacobs",
//         "commentId": "6845c9e7ac415066937d2b83",
//         "replies" : [],
//         "isLeaf" : true
        
//       },
//       {
//         "parentId": "6845abfb3eb7dabb4043332f",
//         "comment": "Duran Bartlett",
//         "commentId": "6845c9e7ac415066937d2b84",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb3eb7dabb4043332f",
//         "comment": "Pamela Trujillo",
//         "commentId": "6845c9e7ac415066937d2b85",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   },
//   {
//     "commentId": "6845abfb91e454650ad616ff",
//     "comment": "Lola",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfb91e454650ad616ff",
//         "comment": "Odom Richards",
//         "commentId": "6845c9e7d7b55dbcf54fa81e",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb91e454650ad616ff",
//         "comment": "Soto Waters",
//         "commentId": "6845c9e7d7b55dbcf54fa82e",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb91e454650ad616ff",
//         "comment": "Greer Mccarthy",
//         "commentId": "6845c9e7d7b55dbcf54fa83e",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   },
//   {
//     "commentId": "6845abfba424c4a28301ffdf",
//     "comment": "Aida",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfba424c4a28301ffdf",
//         "comment": "Lucia Vance",
//         "commentId": "6845c9e7bc06d829d0173ece",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfba424c4a28301ffdf",
//         "comment": "Simpson Vargas",
//         "commentId": "6845c9e7bc06d829d0173ede",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfba424c4a28301ffdf",
//         "comment": "Amy Giles",
//         "commentId": "6845c9e7bc06d829d0173ewe",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   },
//   {
//     "commentId": "6845abfb604cd1bb70a4005d",
//     "comment": "Drake",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfb604cd1bb70a4005d",
//         "comment": "Mcdonald Bradshaw",
//         "commentId": "6845c9e712d6258976f499b8",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb604cd1bb70a4005d",
//         "comment": "Dixon Dunn",
//         "commentId": "6845c9e712d6258976f499b9",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb604cd1bb70a4005d",
//         "comment": "Cassie Sawyer",
//         "commentId": "6845c9e712d6258976f4s9b9",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   },
//   {
//     "commentId": "6845abfb6ac2dc6e6a5117e7",
//     "comment": "Trevino",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfb6ac2dc6e6a5117e7",
//         "comment": "Allison Park",
//         "commentId": "6845c9e7b81cf0ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb6ac2dc6e6a5117e7",
//         "comment": "Amber Herman",
//         "commentId": "6845c9e7b84cf0ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb6ac2dc6e6a5117e7",
//         "comment": "Molina Mccarty",
//         "commentId": "6845c9e7b84cf7ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   },
//   {
//     "commentId": "6845abfb112fa8f03d10995a",
//     "comment": "Reyna",
//     "isLeaf" : false,
//     "replies": [
//       {
//         "parentId": "6845abfb062180abd01febc8",
//         "comment": "Myers Cole",
//         "commentId": "6845c7e7b84cf7ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true

//       },
//       {
//         "parentId": "6845abfbe81cf71eec305a6f",
//         "comment": "Elsie Shannon",
//         "commentId": "6845c7e6b84cf7ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true
//       },
//       {
//         "parentId": "6845abfb19ca77bb4032f5cf",
//         "comment": "Carr Reyes",
//         "commentId": "6835c7e6b84cf7ff1b128fbc",
//         "replies" : [],
//         "isLeaf" : true
//       }
//     ]
//   }
// ]

const NestedComments = () => {
  const [newComment,setNewComment] = useState("")
  const [allComments,dispatch] = useReducer(commentsReducer, []); 

  const addNewComment = () => {
    let addedComment = {
      "commentId" : v4(),
      "comment": newComment,
      "replies": []
    }
    dispatch({
      type : 'add',
      payload : addedComment
    })
    setNewComment("")
  }

  return (
    <>
    <input type="text" value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
    <button css={css({
        fontWeight : 400,
        fontSize: "small",
        padding: "5px !important"
      })} onClick={()=>addNewComment()}>Add New Comment</button>
    <div>
      <AllComments allComments={allComments} dispatch={dispatch}/>
    </div>
    </>
  )
}

export default NestedComments
