import React, { useState, useEffect } from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import UserForm from "./components/UserForm.jsx";
import Question from "./components/Questions.jsx";
import Results from "./components/Results.jsx";
import { UserProvider } from './components/UserContext';
import './App.css'

function App() {

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Which animal represent you the best?",
      options: ["Snake", "Raven", "Lion", "Badger",],
    },
    {
      question: "How would you describe yourself in one word",
      options: ["Brave", "Loyal", "Ambitious", "Intelligent"],
    },
    {
      question: "Which Hogwarts founder would you want as a mentor?",
      options: ["Helga Hufflepuff", "Salazar Slytherin", "Rowena Ravenclaw", "Godric Gryffindor"],
    },
    {
      question: "When faced with a challenge, how do you approach it?",
      options: ["Confronts it",  "Strategically", "Thoughtfully", "Methodically"],
    },
    {
      question: "If you were part of a group project, what role would you most likely take?",
      options: ["Leader", "Strategist", "Motivator","Reliable"],
    },
    {
      question: "What’s would have been your favorite class at Hogwarts?",
      options: ["Transfiguration", "Potions", "Defense Against the Dark Arts", "Herbology"]
    },
  ];

  const keywords = {
    Gryffindor: "Gryffindor",
    Ravenclaw: "Ravenclaw",
    Hufflepuff: "Hufflepuff",
    Slytherin: "Slytherin",
  };

  const elements = {
    "Red 🔴": "Gryffindor",
    "Blue 🔵": "Ravenclaw",
    "Green 🟢": "Slytherin",
    "Yellow 🟡": "Hufflepuff",

    "Snake":"Slytherin",
    "Raven":"Ravenclaw",
    "Lion":"Gryffindor",
    "Badger":"Hufflepuff",

    "Bravenclawe":"Gryffindor",
    "Loyal":"Hufflepuff",
    "Ambitious":"Slytherin",
    "Intelligent":"Ravenclaw",

    "Helga Hufflepuff":"Hufflepuff",
    "Salazar Slytherin":"Slytherin",
    "Rowena Ravenclaw":"Ravenclaw",
    "Godric Gryffindor":"Gryffindor",

    "Confronts it": "Gryffindor",
    "Strategically": "Slytherin",
    "Thoughtfully": "Ravenclaw",
    "Methodically": "Hufflepuff",

    "Leader": "Slytherin",
    "Strategist": "Ravenclaw",
    "Motivator": "Gryffindor",
    "Reliable": "Hufflepuff",

    "Transfiguration": "Ravenclaw",
    "Potions": "Slytherin",
    "Defense Against the Dark Arts": "Gryffindor",
    "Herbology": "Hufflepuff",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [character, setCharacter] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
    setUserName(name);
  };

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  function fetchCharacter(element) {
      async function fetchCharacter() {
        const res = await fetch("https://potterhead-api.vercel.app/api/characters")
        const data = await res.json();
        // The data of the character is choose to have an image to show in the result
        const CRav = [data[6], data[10]];
        const CSly = [data[3], data[7], data[15], data[16], data[17], data[19], data[20]];
        const CGry = [data[0], data[1], data[2], data[4], data[8], data[9], data[11], data[12], data[13], data[14]];

        if (element === "Hufflepuff") {
          setCharacter(data[5])
        } else if (element === "Ravenclaw") {
          const randomIndex = Math.floor(Math.random() * CRav.length);
          setCharacter(CRav[randomIndex]);
        } else if (element === "Slytherin") {
          const randomIndex = Math.floor(Math.random() * CSly.length);
          setCharacter(CSly[randomIndex]);
        } else if (element === "Gryffindor") {
          const randomIndex = Math.floor(Math.random() * CGry.length);
          setCharacter(CGry[randomIndex]);
        } else {
          "error"
        }
      }
      fetchCharacter();
      []
    }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchCharacter(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div>
      <UserProvider value={{ name: userName, setName: setUserName }}>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} character={character} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App
