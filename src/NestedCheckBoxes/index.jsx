import React, { useState } from "react";
import {produce} from "immer"


const initialData = [
  {
    "id": "683eec913dedc215bc04fcf3",
    "name": "Kannada",
    "checked": false,
    "children": [
      {
        "id": "683eec9168432ea94f8a607d",
        "name": "KGF1",
        "checked": false,
        "parentId": "683eec913dedc215bc04fcf3"
      },
      {
        "id": "683eec911d7c72226d00b395",
        "name": "KGF2",
        "checked": false,
        "parentId": "683eec913dedc215bc04fcf3"
      },
      {
        "id": "683eec915e04bd1009dc21b2",
        "name": "KGF3",
        "checked": false,
        "parentId": "683eec913dedc215bc04fcf3"
      }
    ]
  },
  {
    "id": "683eec91889d8e4d71153660",
    "name": "Hindi",
    "checked": false,
    "children": [
      {
        "id": "683eec913b153e662a320464",
        "name": "Don1",
        "checked": false,
        "parentId": "683eec91889d8e4d71153660"
      },
      {
        "id": "683eec9165f600bd1b6260ae",
        "name": "Don2",
        "checked": false,
        "parentId": "683eec91889d8e4d71153660"
      },
      {
        "id": "683eec9168215bc525fd70e1",
        "name": "Don3",
        "checked": false,
        "parentId": "683eec91889d8e4d71153660"
      }
    ]
  },
  {
    "id": "683eec9138adaba68dd8b054",
    "name": "Tamil",
    "checked": false,
    "children": [
      {
        "id": "683eec91b7ad828a49991921",
        "name": "Vikram1",
        "checked": false,
        "parentId": "683eec9138adaba68dd8b054"
      },
      {
        "id": "683eec91b94455068042b38c",
        "name": "Vikram2",
        "checked": false,
        "parentId": "683eec9138adaba68dd8b054"
      },
      {
        "id": "683eec915e5936cf6ab70043",
        "name": "Vikram3",
        "checked": false,
        "parentId": "683eec9138adaba68dd8b054"
      }
    ]
  },
  {
    "id": "683eec910691813f31082e5a",
    "name": "Telugu",
    "checked": false,
    "children": [
      {
        "id": "683eec91801cbd2d48ec5a98",
        "name": "Kick1",
        "checked": false,
        "parentId": "683eec910691813f31082e5a"
      },
      {
        "id": "683eec91679410ab26c560c0",
        "name": "Kick2",
        "checked": false,
        "parentId": "683eec910691813f31082e5a"
      },
      {
        "id": "683eec915f6dae246453573c",
        "name": "Kick3",
        "checked": false,
        "parentId": "683eec910691813f31082e5a"
      }
    ]
  },
  {
    "id": "683eec91fb327f7ac602dc97",
    "name": "Malayalam",
    "checked": false,
    "children": [
      {
        "id": "683eec918cc55251b0a69627",
        "name": "Drishyam1",
        "checked": false,
        "parentId": "683eec91fb327f7ac602dc97"
      },
      {
        "id": "683eec91249265cb0ca9959a",
        "name": "Drishyam2",
        "checked": false,
        "parentId": "683eec91fb327f7ac602dc97"
      },
      {
        "id": "683eec91db186851b13798dd",
        "name": "Drishyam3",
        "checked": false,
        "parentId": "683eec91fb327f7ac602dc97"
      }
    ]
  }
]
export default function NestedCheckboxes() {
  const [tree, setTree] = useState(initialData);


  const handleSelection = (itemId,parentId,value) =>{
    console.log("value",value)
    let treeCopy = [...tree];
    if(parentId === undefined){
        treeCopy =  produce((treeCopy),draft=>{
             draft.find((ele)=>{
                if(ele.id === itemId){
                    ele.checked = value
                    ele?.children?.forEach((child)=>{
                        child.checked = value
                    })
                }
            }) 
        })
    }
    else {
         treeCopy =  produce((treeCopy),draft=>{
             draft.find((ele)=>{
                if(ele.id === parentId){
                    ele?.children?.find((child)=>{
                        if(child.id === itemId){
                            child.checked = value
                        }
                    })
                    if(ele?.children?.every((child)=> child.checked)){
                        ele.checked = true
                    }
                    else {
                        ele.checked = false
                    }
                }
            }) 
        })
    }
    setTree(treeCopy)
    console.log("parentId",parentId)
  }

  const renderCheckBox = (item,depth=0) =>{
   return <>
          <label key={item.id} style={{ display: "block", marginLeft: depth > 0 ? "50px" : "0px"  }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => handleSelection(item.id, item.parentId,e.target.checked)}
            />
            {item.name}
          </label>
          {item.children?.map((ele)=>{
            return renderCheckBox(ele,depth+1);
          })}
          </>
  }


  return (
    <div style={{ display : "flex", flexDirection : "column" , alignItems: "flex-start" }}>
    {tree.map((item) => (
      renderCheckBox(item)
    ))}
    </div>
  );
}