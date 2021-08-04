Webcam.set({
    height: 300,
    width: 300,
    image_format: 'png',
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('Ml5 version '+ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uZa8xPEbZ/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded")
}

function Check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak()

    }
}