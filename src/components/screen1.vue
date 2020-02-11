<template>
    <div class="screen">
        <video ref="video" id="video" width="720" height="560" autoplay muted></video>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        Votre nom est : {{name}}
        <input id="name" type="text" v-model="name">
        <button @click="increment">+</button>
    </div>
</template>

<script>
  import * as faceapi from 'face-api.js';
  export default {
    name: 'screen1',
    data: function () {
      return {
        name: null,
      }
    },
    methods: {
      increment() {
        this.$store.dispatch("setName", {
          name: this.name
        });
        console.log(this.$store.state.name);
      },
      startVideo(){
        navigator.getUserMedia(
          {video: {}},
          stream => video.srcObject = stream,
          error => console.log(error)
        )
      }
    },
    mounted(){

      const video = this.$refs.video;
      console.log(video);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
      ]).then(this.startVideo);

      video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        console.log(canvas)
        const displaySize = {width: video.width, height: video.height};
        faceapi.matchDimensions(canvas, displaySize);
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
          console.log(detections);
          if (detections[0].expressions !== undefined) {
            let expressions = detections[0].expressions;
            let getHighScoreExpressionName = Object.keys(expressions).reduce((max,expression) => {
              return( expressions[max] > expressions[expression] ? max : expression)
            },{});
            console.log(getHighScoreExpressionName)
          }
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas,resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);
          // faceapi.draw.drawAgeAndGender(canvas,resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        }, 100)
      });
      // const plugin = document.createElement("script");
      // plugin.setAttribute("src","../assets/js/script.js");
      // plugin.setAttribute("type","javascript");
      // plugin.async=true;
      // document.head.appendChild(plugin);
    }
  }
</script>

