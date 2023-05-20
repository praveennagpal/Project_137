objects = [];
status = "";
object_name = "";

function preload() {  
}

function setup() {
    canvas = createCanvas(360, 270)
    canvas.position(465, 150);

    video = createCapture(VIDEO);
    video.size(360, 270);
    video.hide();
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0, 0, 360, 270);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
    
    for (i  = 0; i < objects.length; i++) {
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Is Found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(object_name + " Is Found");
            synth.speak(utterThis);
        } 
    }
}
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("Input_Box").value;

}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}