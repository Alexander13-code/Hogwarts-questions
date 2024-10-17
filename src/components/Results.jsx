import React, {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

/* function selection ({character: character, element}){
  if (element === "Hufflepuff") {
    character = character[5]
  } else {
    character = character[0]
  }

  return (character)
} */

export default function Results({ character: character}) {
  // reference the context for the "name".
  const {name} = useContext(UserContext);
  return (
    <div className="character">
      <h1>
        Congratulations ! <strong>{name}</strong>  {/* {element} Sorry no use of it, It doesn't match with the API*/}
      </h1>
      {character ? (
        <div className="character">
          <h2>You have a strong bound with the house : <strong>{character.house}</strong> </h2>
          <h3>And in particular with the character <strong>{character.name}</strong></h3>
          <img src={character.image} alt={character.name} />
        </div>
      ) : (
        <p>No character found sorry.</p>
      )}
    </div>
  );
}
