import { useState } from "react";

export const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArr = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return {
        key: letter,
        color: "grey",
      };
    });

    // find any green letters
    formattedGuess.forEach((guess, idx) => {
      if (solutionArr[idx] === guess.key) {
        formattedGuess[idx].color = "green";
        solutionArr[idx] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((guess, idx) => {
      if (solution.includes(guess.key) && guess.color !== "green") {
        guess.color = "yellow";
        solutionArr[solutionArr.indexOf(guess.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuess) => {
      let newGuesses = [...prevGuess];
      newGuesses[turn] = formatGuess();
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => prevTurn + 1);
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((letter) => {
        if (letter.color === "green") {
          newKeys[letter.key] = "green";
        } else if (letter.color === "yellow") {
          newKeys[letter.key] = "yellow";
        } else if (
          letter.color === "grey"
        ) {
          newKeys[letter.key] = "grey";
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("Game over");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("tried");
        return;
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((guess) => guess.slice(0, -1));
    }
    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((guess) => guess + key);
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp };
};
