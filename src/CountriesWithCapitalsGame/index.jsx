/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { allCountries } from './data';



const CountriesWithCapitals = () => {

const [allOptions, setAllOptions] = useState([]);
const [mappedValues,setMappedValues] = useState({});
const [selectedOptions,setSelectedOptions] = useState([]);
const [correctSelections,setCorrectSelections] = useState([]);
const [matched,setMatched] = useState(new Set);

useEffect(()=>{
const countriesList = allCountries.map(country => country.country);
const citiesList = allCountries.map(country => country.city);

const randomizedCountriesList = countriesList.sort(() => Math.random() - 0.5);
const randomizedCitiesList = citiesList.sort(() => Math.random() - 0.5);

const countryCapitalMap = allCountries.reduce((acc, country) => ({ ...acc, [country.country]: country.city }), {});

setMappedValues(countryCapitalMap)
setAllOptions([...randomizedCountriesList, ...randomizedCitiesList]);
},[allCountries])


const handleOptionClick = (value) =>{
  const optionsClicked = [...selectedOptions,value]
  if(optionsClicked.length === 2){
    const [firstOption,secondOption] = optionsClicked
    if(mappedValues[firstOption] === secondOption || mappedValues[secondOption] === firstOption ){
     setCorrectSelections(optionsClicked)
     setMatched(new Set(...matched,optionsClicked));
     setTimeout(()=>{
      setCorrectSelections([]);
      setSelectedOptions([])
     },1000)
    }
    else{
      setSelectedOptions(optionsClicked);
      setTimeout(() => {
        setSelectedOptions([])
      }, 1000);
    }
  }
  else if(optionsClicked.length === 1){
    setSelectedOptions(optionsClicked)
  }
}

if(matched.size === allOptions.length){
  return <h1>Game Over</h1>
}

return (  
     <div css={css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    })}>
      {allOptions.map((option, index) => {
        if(matched.has(option)){
          return null;
        }
        const isSelected = selectedOptions.includes(option) || correctSelections.includes(option);
        const isCorrect = correctSelections.includes(option);
        const isIncorrect = selectedOptions.length == 2 && isSelected;


        const borderColor = isSelected ? (isCorrect ? "green" : "red") : isIncorrect ? "red" : "black";
        return <div key={index} css={css({
          border: `1px solid ${borderColor}`,
          padding: "10px",
          margin: "10px",
          cursor: "pointer",
        })} onClick={() => handleOptionClick(option)}>
          <h3>{option}</h3>
        </div>
      })}
    </div>
  )
}

export default CountriesWithCapitals
