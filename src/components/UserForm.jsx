import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState();
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    // Add the form here
    <div className="container">
      <h2>But first let us know who you are ?</h2>
      <form onSubmit={handleSubmit}  className="form">
        <label htmlFor="name">Enter your name: </label>
        <input
          type="text"
          id="name"
          placeholder="Ex: Alex"
          value={inputName}
          onChange={function(e) {
            setInputName(e.target.value);}
          }/>
        <button id="formbutton" type="submit">Submit</button>
      </form>
    </div>
  );
}
