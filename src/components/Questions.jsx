import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div className="container">
      <h2>{question}</h2>
      <div className="answers">
        {options.map(function (option) {
          return (
            <button
              key={option}
              onClick={function () {
                onAnswer(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
