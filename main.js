var API = window.webkitSpeechRecognition
var noInput = ""
var objects = []
var modelStatus = false

function setup(){
    canvas = createCanvas(800, 600)
    canvas.parent("canvas")
    video = createCapture(VIDEO)
    video.size(800, 600)
    video.hide()
} 
function draw(){
    image(video, 0, 0, 800, 600)
    if(modelStatus == true){
        objectDetector.detect(video, gotResults)
          //for(inicio; fim; incremento)
        for (i = 0; i < objects.length; i++){
            fill("red")
            console.log(i)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y)
            textSize(30)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            document.getElementById("resultStatus").innerHTML = "Status: " + objects.length

        if(objects[i].label == noInput){
            video.stop()
            objectDetector.detect(gotResults)
            document.getElementById("resultObjMencionado").innerHTML = "Objeto encontrado"
            var API = window.speechSynthesis
            var texto = "Objeto encontrado"
            var falar = new SpeechSynthesisUtterance(texto)
            API.speak(falar)
        }
        else{
            document.getElementById("resultObjMencionado").innerHTML = "Objeto não encontrado"
        }
}
}
}

function Iniciar(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("resultStatus").innerHTML = "Carregando modelo."
    noInput = document.getElementById("sim").value
}
function modelLoaded(){
console.log("Modelo carregado!")
modelStatus == true
}
function gotResults(error, results){
    if(error){
console.log(error)
    }
    else{
console.log(results)
objects = results
     }
}