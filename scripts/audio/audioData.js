export default class AudioData {
  constructor() {
    this.audio1 = document.getElementById("audio1");
    this.audio1.volume = 0.9;
    this.audioContext = null;
    this.analyzer = null;
    this.bufferLength = 0;
    this.dataArray = null;

    const file = document.getElementById("fileUpload");
    file.addEventListener("change", () => {
      const files = file.files;
      this.audio1.src = URL.createObjectURL(files[0]);
      this.audio1.load();
      this.audio1.play();
      this.initAudioContext();
    });
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.analyzer = this.audioContext.createAnalyser();
      this.audioSource = this.audioContext.createMediaElementSource(
        this.audio1
      );
      this.audioSource.connect(this.analyzer);
      this.analyzer.connect(this.audioContext.destination);
      this.analyzer.fftSize = 1024;
      this.bufferLength = this.analyzer.frequencyBinCount;

      this.dataArray = new Float32Array(this.bufferLength);
    } catch (error) {
      console.error("Failed to initialize AudioContext:", error);
    }
  }

  getData() {
    if (!this.analyzer) {
      return null;
    }
    this.analyzer.getFloatFrequencyData(this.dataArray);
    for (let i = 0; i < this.bufferLength; i++) {
      return Math.abs(this.dataArray[i]);
    }
  }
}

// Reference purposes
// function animate() {
//   let data = Math.abs(audio.getData());

//   if (data) {
//     if (data < 25) context.style = "red";
//     else if (data < 30) context.style = "magenta";
//     else if (data < 35) context.style = "green";
//     else if (data < 40) context.style = "blue";
//     else if (data < 45) context.style = "yellow";
//     else if (data < 50) context.style = "greenYellow";
//     else if (data < 55) context.style = "purple";
//     else if (data < 60) context.style = "gold";
//     else if (data < 65) context.style = "gray";
//     else if (data < 70) context.style = "dodgeBlue";
//     else context.style = "white";
//   }

//   requestAnimationFrame(animate);
// }
