import React from 'react'

export default function CharacterPicker({onPick, top, left, visibility, setVisibility, foundCharacters}) {
  let visibilityValue;
  let characters = ["Waldo", "Wenda", "Wizard Whitebeard", "Odlaw"];
  visibility ? visibilityValue = "visible" : visibilityValue = "hidden";

  let optionButtons = characters.map(character =>{
    let flag = true;
    for (let i = 0; i < foundCharacters.length; i++){
      if (foundCharacters[i].name === character) flag = false;
    }
    if (flag === true) return <button key={character} onClick={() => onPick(character)} className='picker-button'>{character}</button>
    
  })

  const style = {
    position: "absolute",
    top: top + 20,
    left: left + 20,
    display: "flex",
    flexDirection: "column",
    visibility: visibilityValue,
    borderRadius: "4px",
    border: '1px solid red',
    cursor: "pointer",
    zIndex: 2,
  }

  function handleCloseMenu(e) {
    setVisibility(false);
  }

  return (
    <div style={style}>
      {optionButtons}
      <button className='picker-button close' onClick={(e) => handleCloseMenu(e)}>close</button>
    </div>
  )
}
