
video = ""

function preload() {
    
    video = createVideo('video.mp4')
    video.hide()
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults)
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded");
    video.loop();
    video.speed(0.5);
    //speed can be given from minimum 0.5 to 2.5, you can even go above 2.5, not an issue
    video.volume(0);
    //volume is from 0 to 2, o being least, 2 being most
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results)
    }

}