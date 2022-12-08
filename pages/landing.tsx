import Link from "next/link";
import styles from "./landing.module.scss";

export default function Landing() {
  //
  // // Render
  //
  return (
    <div>
      <main className={styles.main}>
        <h1>Escape Georgia Tech</h1>
        <p>
          An interactive narrative and puzzle game. Designed and built for
          Georgia Tech’s LMC 2700 - Intro to Computational Media Class.
        </p>
        <p>
          Complete the 4 puzzles in order to graduate! You have a total of 6
          years (15 minutes, 2.5 minutes for each year) to complete all the
          puzzles.
        </p>
        <p>
          If you don&apos;t complete all the puzzles, you will automatically
          drop out. Good luck.
        </p>
        <Link href="/game">
          <button>Start Game</button>
        </Link>
      </main>
    </div>
  );
}
