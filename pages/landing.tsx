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
        <Link href="/game">
          <button>Start Game</button>
        </Link>
      </main>
    </div>
  );
}
