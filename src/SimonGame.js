import React, { useState, useEffect } from "react";
import "./SimonGame.css";

const colors = ["red", "yellow", "green", "purple"];

export default function SimonGame() {
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(null);

  useEffect(() => {
    const handleKeyPress = () => {
      if (!started) {
        nextSequence();
        setStarted(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [started]);

  const nextSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    const newSeq = [...gameSeq, randomColor];
    setGameSeq(newSeq);
    setUserSeq([]);
    setLevel(prev => prev + 1);
    flashButton(randomColor);
  };

  const flashButton = (color) => {
    setIsFlashing(color);
    setTimeout(() => setIsFlashing(null), 300);
  };

  const handleUserClick = (color) => {
    const newUserSeq = [...userSeq, color];
    setUserSeq(newUserSeq);
    flashButton(color);

    if (newUserSeq[newUserSeq.length - 1] !== gameSeq[newUserSeq.length - 1]) {
      alert("Game Over! Press any key to restart.");
      resetGame();
      return;
    }

    if (newUserSeq.length === gameSeq.length) {
      setTimeout(() => nextSequence(), 800);
    }
  };

  const resetGame = () => {
    setStarted(false);
    setGameSeq([]);
    setUserSeq([]);
    setLevel(0);
  };

  return (
    <div className="game-container">
      <h1 className="title">Simon Says</h1>
      <h3 className="subtitle">{started ? `Level ${level}` : "Press any key to start"}</h3>
      <div className="btn-container">
        <div className="line-one">
          {colors.slice(0, 2).map((color) => (
            <div
              key={color}
              className={`btn ${color} ${isFlashing === color ? "flash" : ""}`}
              onClick={() => handleUserClick(color)}
            ></div>
          ))}
        </div>
        <div className="line-two">
          {colors.slice(2, 4).map((color) => (
            <div
              key={color}
              className={`btn ${color} ${isFlashing === color ? "flash" : ""}`}
              onClick={() => handleUserClick(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
