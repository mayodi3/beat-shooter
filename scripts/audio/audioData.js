export default class BEAT {
  constructor(
    context,
    name,
    filterFrequency = 80, // 100
    peakGain = 10, // 15
    threshold = 0.5, // 0.8
    sampleSkip = 300, // 350
    minAnimationTime = 0.3 // 0.4
  ) {
    this.isPlaying = false;
    this.context = context;
    this.name = name;
    this.filterFrequency = filterFrequency;
    this.peakGain = peakGain;
    this.threshold = threshold;
    this.sampleSkip = sampleSkip;
    this.minAnimationTime = minAnimationTime;
    this.songData = [];
  }

  load() {
    return new Promise((resolve) => {
      fetch(this.name)
        .then((resp) => resp.arrayBuffer())
        .then((file) => {
          this.context.decodeAudioData(file, (buffer) => {
            this.buffer = buffer;
            this.analyze().then(() => resolve());
          });
        });
    });
  }

  play(cb) {
    this.isPlaying = true;
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.context.destination);
    // source.loop = true
    source.start();
    this.animate(cb);
  }

  analyze() {
    return new Promise((resolve) => {
      this.offlineContext = new OfflineAudioContext(
        1,
        this.buffer.length,
        this.buffer.sampleRate
      );
      const source = this.offlineContext.createBufferSource();
      source.buffer = this.buffer;

      const filter = this.offlineContext.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = this.filterFrequency;
      filter.Q.value = 1;

      const filter2 = this.offlineContext.createBiquadFilter();
      filter2.type = "peaking";
      filter2.frequency.value = this.filterFrequency;
      filter2.Q.value = 1;
      filter2.gain.value = this.peakGain;

      source.connect(filter2);
      filter2.connect(filter);
      filter.connect(this.offlineContext.destination);
      source.start();
      this.offlineContext.startRendering().then((buffer) => {
        const data = buffer.getChannelData(0);

        this.songData = [];
        for (let i = 0; i < data.length; i += this.sampleSkip) {
          if (data[i] > this.threshold) {
            const time = i / buffer.sampleRate;
            const previousTime = this.songData.length
              ? this.songData[this.songData.length - 1].time
              : 0;
            if (time - previousTime > this.minAnimationTime) {
              this.songData.push({
                data: data[i],
                time,
              });
            }
          }
        }
        resolve();
      });
    });
  }

  animate(cb) {
    this.songData.forEach((d, i) => {
      const time =
        i === this.songData.length - 1
          ? d.time
          : this.songData[i + 1].time - d.time;
      setTimeout(() => cb(time), d.time * 1000);
    });
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   // let sound;
//   // let audioContext = new AudioContext();
//   const songUrl = "./testMusic/trap1.mp3";
//   // sound = new BEAT(audioContext, songUrl);
//   const sound = new BEAT(songUrl);
//   sound.load().then(() => {
//     sound.play((data) => console.log("Execute : ", data));
//   });
//   // document.getElementById('stopButton').addEventListener('click', () => {
//   //   if (sound) {
//   //     sound.stop();
//   //   }
//   // });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const fileInput = document.getElementById("fileInput");
//   let sound;
//   let audioContext;

//   fileInput.addEventListener("change", async (event) => {
//     if (audioContext) {
//       audioContext.close();
//     }
//     audioContext = new AudioContext();
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);

//     if (sound) {
//       sound.stop();
//     }
//     sound = new BEAT(audioContext, url);
//     await sound.load();
//     sound.play((data) => console.log("Execute : ", data));
//   });
// });
