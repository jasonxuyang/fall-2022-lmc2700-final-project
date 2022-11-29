export enum NOTE {
  C4 = 261.6,
  D4 = 293.7,
  E4 = 329.6,
  F4 = 349.2,
  G4 = 392.0,
  A4 = 440.0,
}

export class AudioPlayer {
  audioContext: AudioContext;
  gainNode: any;
  osc: OscillatorNode;
  private smoothingIntervalIn = 0.02;
  private smoothingIntervalOut = 0.06;
  private beepLengthInSeconds = 0.15;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.osc = this.audioContext.createOscillator();
    this.osc.connect(this.gainNode);
    this.start();
  }

  playNote = () => {
    const now = this.audioContext.currentTime;
    this.gainNode.gain.setTargetAtTime(1, now, this.smoothingIntervalIn);
  };

  stopNote = () => {
    const now = this.audioContext.currentTime;
    this.gainNode.gain.setTargetAtTime(
      0,
      now + this.beepLengthInSeconds,
      this.smoothingIntervalOut
    );
  };

  start = () => {
    this.osc.start(0);
  };

  stop = () => {
    this.osc.stop(0);
  };

  resume = () => {
    this.audioContext.resume();
  };

  setNote = (note: number) => {
    this.osc.frequency.value = note;
  };
}
