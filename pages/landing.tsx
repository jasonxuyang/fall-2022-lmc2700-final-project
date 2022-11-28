import Link from "next/link";

export default function Landing() {
  //
  // // Render
  //
  return (
    <div>
      <main>
        <h1>Escape Georgia Tech</h1>
        <p>
          An interactive narrative and puzzle game. Designed and built for
          Georgia Tech’s LMC 2700 - Intro to Computational media Class{" "}
        </p>
        <Link href="/game">
          <button>Start Game</button>
        </Link>
      </main>
    </div>
  );
}
