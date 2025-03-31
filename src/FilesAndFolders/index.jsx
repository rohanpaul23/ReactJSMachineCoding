import React, { useState } from 'react'
import { RiFolderAddFill } from "react-icons/ri";
import { AiOutlineFileAdd } from "react-icons/ai";
import { css } from '@emotion/react'
import { v4  } from 'uuid';


const list = [
  {
   id : v4(),
   name : "Folder1",
   type : "Folder",
   children : [{
    id : v4(),
   name : "File1",
   type : "File",
   },
   {
    id : v4(),
   name : "File2",
   type : "File",
   },
   {
    id : v4(),
   name : "InnerFolder",
   type : "Folder",
   children : [
    {
      id : v4(),
     name : "Inner File1",
     type : "File",
     },
     {
      id : v4(),
     name : "Inner File1",
     type : "File",
     },
   ]
   },
  ] 
  },
  {
    id : v4(),
    name : "Folder2",
    type : "Folder",
    children : [{
     id : v4(),
    name : "File1",
    type : "File",
    },
    {
     id :v4(),
    name : "File2",
    type : "File",
    }] 
   },
   {
    id : v4(),
    name : "Folder3",
    type : "Folder",
    children : [{
     id : v4(),
    name : "File1",
    type : "File",
    },
    {
     id : v4(),
    name : "File2",
    type : "File",
    }] 
   }
]

const List = ({data,level,addFileOrFolder}) =>{ 
  return  <div> 
  {data.map((listItem)=>{
    return <ListItem item={listItem} level={level} addFileOrFolder={addFileOrFolder}/>
  })}
  </div>
}

const ListItem = ({item,level,addFileOrFolder})=>{
  const [isExpanded,setIsExpanded] = useState({})

  const updateIsExpanded = (id) =>{
   setIsExpanded((prev)=>({
    ...prev,
    [id] : !prev[id]
   }))
  }

  const addNewItem = (type,id)=>{
    addFileOrFolder(type,id)
    updateIsExpanded(id)
  }
  return (
    <>
    <div css={css({
      display: "flex",
      justifyContent : "space-between",
      paddingLeft : level * 20
    })} key={item.id}>
      <span>
        {item?.type === 'Folder' && <span onClick={()=>updateIsExpanded(item.id)}>{isExpanded[item.id] ? "-" : "+"}</span>}
        {item.name}
      </span>
      <span css={css({
        margin : "2px 0px"
      })}>
        <RiFolderAddFill onClick={()=>addNewItem("Folder",item.id)}/>
        <AiOutlineFileAdd onClick={()=>addNewItem("File",item.id)}/>
      </span>
    </div>
    {isExpanded[item.id] ? <List data={item.children} level={level+1} addFileOrFolder={addFileOrFolder}/> : <></>}
    </>
  )
}


const FilesAndFolders = () => {
  const [allData,setAllData] = useState(list)

  const addFileOrFolder = (type,parentId) =>{
    let enteredValue = prompt(type)
    let obj = {
      "id" : v4(),
      "type" : type,
      "name" : enteredValue
    }
    if(type === 'Folder'){
      obj = {
        ...obj,
        children : []
      }
    }

   const updateList = (list)=> {
    return list.map((item)=>{
      if(item.id === parentId){
        return {
          ...item,
          children :[
            ...item.children,
            obj
          ]
        }
      }
      if(item.children){
        return {...item, children: updateList(item.children)}
      }
      return item
    })
   }
    setAllData((prevData)=>updateList(prevData))
  }

  return (
    <div>
      <span css={css({
        background : "brown"
      })}>Files and Folders</span>
     <List data={allData} level={0} addFileOrFolder={addFileOrFolder}/>
    </div>
  )
}

export default FilesAndFolders
