/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { IPuzzleProps, PUZZLE } from "../../types";
import ScoreBoard from "./components/ScoreBoard";
import styles from "./Film.module.scss";

const width = 8;
const blank = "blank.png";

//will probably not need this
const candyColors = [
  "movie1.jpg",
  "movie2.png",
  "movie3.png",
  "movie4.png",
  "movie5.png",
  "movie6.png",
];

const Film = ({ completePuzzle }: IPuzzleProps) => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<
    string[]
  >([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any | null>(
    null
  );
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any | null>(
    null
  );
  const [scoreDisplay, setScoreDisplay] = useState<number>(0);

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const validateScore = () => {
    if (scoreDisplay > 100) {
      alert("Puzzle Complete!");
      completePuzzle(PUZZLE.FILM);
    }
  };

  // console.log(scoreDisplay);

  const dragStart = (e: any) => {
    //console.log('drag start')
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e: any) => {
    //console.log('drag drop')
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e: any) => {
    //console.log('drag end')
    //logic

    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    const squareBeingReplacedId = parseInt(
      (squareBeingReplaced as any).getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] = (
      squareBeingReplaced as any
    ).getAttribute("src");

    //console.log('squareBeingDraggedId', squareBeingDraggedId)
    //console.log('squareBeingReplacedId', squareBeingReplacedId)

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] = (
        squareBeingReplaced as any
      ).getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  //functional expression
  //will probably not need this
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      //pulling a random number for the color of each candy
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    // console.log(randomColorArrangement)
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
      validateScore();
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColorArrangement,
    moveIntoSquareBelow,
  ]);

  //console.log(currentColorArrangement)

  return (
    <div className={styles.app}>
      <ScoreBoard score={scoreDisplay} />
      <div className={styles.game}>
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};
export default Film;
