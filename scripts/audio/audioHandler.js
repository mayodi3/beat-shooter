export default class AudioHandler {
  constructor() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.sounds = {};
    this.laserSoundNode = null;
  }

  loadSound(key, src) {
    fetch(src)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        this.sounds[key] = audioBuffer;
      })
      .catch((e) => console.error(e));
  }

  playSound(key) {
    const sound = this.audioContext.createBufferSource();
    sound.buffer = this.sounds[key];
    sound.connect(this.audioContext.destination);
    sound.start();
    return sound;
  }

  startLaser(key) {
    if (!this.laserSoundNode) {
      this.laserSoundNode = this.audioContext.createBufferSource();
      this.laserSoundNode.buffer = this.sounds[key];
      this.laserSoundNode.loop = true;
      this.laserSoundNode.connect(this.audioContext.destination);
      this.laserSoundNode.start();
    }
  }

  stopLaser() {
    if (this.laserSoundNode) {
      this.laserSoundNode.stop();
      this.laserSoundNode.disconnect();
      this.laserSoundNode = null;
    }
  }

  shoot() {
    this.playSound("shoot");
  }
}
