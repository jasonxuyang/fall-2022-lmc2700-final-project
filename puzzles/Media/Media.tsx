/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import styles from "./Media.module.scss";
import { IPuzzleProps } from "../../types";

const notes = [
  "1992 Bourbon Whiskey",
  "1899 Fireball",
  "1922 XO",
  "1999 Red Wine",
  "2001 London Dry Gin",
  "1888 Irish Whiskey",
  "1998 Red Rum",
  "2000 Tequila",
  "1993 Brandy",
  "1882 Bloody Mary",
  "2008 Coconut Rum",
  "2002 Hennessy Cognac",
];

export default function Media({ state, setState, exitPuzzle }: IPuzzleProps) {
  const inputRef = useRef<any>();
  const ANSWER = "1998";
  const validateAnswer = (answer: string) => {
    return answer.toUpperCase() === ANSWER;
  };

  useEffect(() => {
    const input = inputRef.current;
    const submitHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (validateAnswer((e.target as HTMLInputElement).value)) {
          alert("Correct!");
        } else {
          alert("Incorrect!");
        }
      }
    };
    input.addEventListener("keyup", submitHandler);

    return () => {
      input.removeEventListener("keyup", submitHandler);
    };
  }, []);
  return (
    <>
      <div className={styles.gameContainer}>
        <img className={styles.image} src="redrum.jpg" alt="The Shining" />
        <input className={styles.input} type="text" ref={inputRef}></input>
        <h4 className={styles.prompt}>The Alcohol Bar</h4>
        <div className={styles.noteGrid}>
          {notes.map((note, index) => {
            return (
              <button key={index} className={styles.note}>
                {note}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
