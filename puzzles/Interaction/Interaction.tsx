/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { IPuzzleProps, PUZZLE } from "../../types";
import styles from "./Interaction.module.scss";

export default function Interaction({ completePuzzle }: IPuzzleProps) {
  const inputRef = useRef<any>();
  const ANSWER = "DACB";
  const validateAnswer = (answer: string) => {
    return answer.toUpperCase() === ANSWER;
  };

  useEffect(() => {
    const input = inputRef.current;
    const submitHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (validateAnswer((e.target as HTMLInputElement).value)) {
          alert("Correct!");
          completePuzzle(PUZZLE.INTERACTION);
        } else {
          alert("Incorrect!");
        }
      }
    };
    input.addEventListener("keyup", submitHandler);

    return () => {
      input.removeEventListener("keyup", submitHandler);
    };
  }, [completePuzzle]);

  return (
    <div className={styles.gameContainer}>
      <img className={styles.image} src="puzzleTotal.png" alt="hi" />
      <h4 className={styles.prompt}>Fill in the Design of the Game</h4>
      <input className={styles.input} type="text" ref={inputRef}></input>
      <div className={styles.answerTotalRow}>
        <div className={styles.answerBox}>
          <h1 className={styles.answerChoice}>A</h1>
          <img className={styles.answerImage} src="puzzlePiece2.png" />
        </div>
        <div className={styles.answerBox}>
          <h1 className={styles.answerChoice}>B</h1>
          <img className={styles.answerImage2} src="puzzlePiece4.png" />
        </div>
        <div className={styles.answerBox}>
          <h1 className={styles.answerChoice}>C</h1>
          <img className={styles.answerImage3} src="puzzlePiece3.png" />
        </div>
        <div className={styles.answerBox}>
          <h1 className={styles.answerChoice}>D</h1>
          <img className={styles.answerImage4} src="puzzlePiece1.png" />
        </div>
      </div>
    </div>
  );
}
