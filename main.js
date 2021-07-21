img="";
status="";
object=[];

function preload(){
    img=loadImage("dog_cat.jpg")
}

function setup(){
    canvas= createCanvas(650,500);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    
}

function modelLoaded(){
    console.log("Model Loaded !")
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function draw(){
    image(img,0,0,650,500);

    if(status!=""){
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";

            fill("#eb4034");
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#eb4034");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}