var p1="";
var p2="";
Webcam.set(
    {
        width:350,
        height:300,
        image_format:"png",
        png_quality:90
    }
);
camera=document.getElementById("camera");
Webcam.attach("#camera");

function takephoto()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML="<img id='capured_image' src='"+data_uri+"'>";
    });
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1lUP7v06U/model.json",modelready);
function modelready()
{
    console.log("modelloaded");
}
function check()
{
    img=document.getElementById("capured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        p1=results[0].label;
        p2=results[1].label;
        speak();
    }
}
function speak()
{
    var synth=window.speechSynthesis;
    var speak1="The First Prediction Is "+p1;
    var speak2="The Second Prediction Is "+p2;
    var saythis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(saythis);
}