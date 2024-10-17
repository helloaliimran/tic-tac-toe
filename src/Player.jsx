import { useState } from "react";

export default function Player({ initialName, symbol,isActive,onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName ] = useState(initialName);

  function handleEditClick() {
    setIsEditing((isEdit)=>!isEdit);
   
    if(isEditing){
    onChangeName(symbol,playerName)
  }
  }
 function handleOnChange(event){
    setPlayerName(event.target.value);
 }

  let playerNameContent = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    playerNameContent = <input type="text" onChange={handleOnChange} required value={playerName} />;
  }

  return (
    <li  className={isActive===true? " active" : undefined}>
      <span className="player">
        {playerNameContent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
