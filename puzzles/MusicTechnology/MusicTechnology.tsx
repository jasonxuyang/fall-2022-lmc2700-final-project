import { useEffect, useState } from "react";
import { AudioPlayer, NOTE } from "./AudioPlayer";
import styles from "./MusicTechnology.module.scss";

export default function MusicTechnology() {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>(
    new AudioPlayer()
  );
  const notes = [
    NOTE.C4,
    NOTE.C4,
    NOTE.G4,
    NOTE.G4,
    NOTE.A4,
    NOTE.A4,
    NOTE.G4,
    NOTE.F4,
    NOTE.F4,
    NOTE.E4,
    NOTE.E4,
    NOTE.D4,
    NOTE.D4,
    NOTE.C4,
    NOTE.G4,
    NOTE.G4,
    NOTE.F4,
    NOTE.F4,
    NOTE.E4,
    NOTE.E4,
    NOTE.D4,
    NOTE.G4,
    NOTE.G4,
    NOTE.F4,
    NOTE.F4,
    NOTE.E4,
    NOTE.E4,
    NOTE.D4,
    NOTE.C4,
    NOTE.C4,
    NOTE.G4,
    NOTE.G4,
    NOTE.A4,
    NOTE.A4,
    NOTE.G4,
    NOTE.F4,
    NOTE.F4,
    NOTE.E4,
    NOTE.E4,
    NOTE.D4,
    NOTE.D4,
    NOTE.C4,
  ];

  const playNote = (note: NOTE) => {
    audioPlayer.resume();
    audioPlayer.setNote(note);
    audioPlayer.playNote();
  };

  const stopNote = () => {
    audioPlayer.stopNote();
  };

  return (
    <div className={styles.gameContainer}>
      <h4 className={styles.prompt}>What is the name of the song?</h4>
      <input className={styles.input} type="text"></input>
      <div className={styles.noteGrid}>
        {notes.map((note, index) => {
          return (
            <button
              key={index}
              onMouseDown={() => {
                playNote(notes[index]);
              }}
              onMouseUp={stopNote}
              className={styles.note}
            >
              {note}
            </button>
          );
        })}
      </div>
    </div>
  );
}
