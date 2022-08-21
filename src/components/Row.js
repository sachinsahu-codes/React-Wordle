import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map(({ key, color }, id) => {
          return (
            <div key={id} className={color}>
              {key}
            </div>
          );
        })}
      </div>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter, id) => {
          return (
            <div key={id} className="filled">
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, id) => (
          <div key={id}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
