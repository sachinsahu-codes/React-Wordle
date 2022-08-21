import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
      {guesses.map((guess, id) => {
        if (turn === id) {
          return <Row key={id} currentGuess={currentGuess} />;
        }
        return <Row key={id} guess={guess} />;
      })}
    </div>
  );
}
