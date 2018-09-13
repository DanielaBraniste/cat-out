export default class {
  constructor() {
    this.audioContext = new AudioContext();
  }

  play(type, startFrequency, finalFrequency, duration) {
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(
      startFrequency, this.audioContext.currentTime
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      finalFrequency, this.audioContext.currentTime + duration
    );

    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01, this.audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}
