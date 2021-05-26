
video = ""
objects = [];

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
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objectsdetect").innerHTML = "Number of Objects: " + objects.length;

            percentage = floor(objects[i].confidence*100)
            fill("#d6a606")
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("#d6a606")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded");
    video.loop();
    video.speed(1);
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

        objects = results;


    }

}