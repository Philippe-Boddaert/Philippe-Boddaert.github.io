SOMMAIRE = [
              { "url" : "index.html", "titre" : "Sommaire"},
              { "url" : "03-1.html", "titre" : "6.3.1 - Tri par insertion" },
              { "url" : "03-2.html", "titre" : "6.3.2 - Tri par sélection" },
            ];

var array = [1, 2, 3, 4, 5, 6];
var states;
var currentStep = 0;
//var log = document.getElementById("log");
var divStates = document.getElementById('sort-states');
var log = document.getElementById("log");

function initTri(){
  //shuffle(array);
  array = [4, 3, 5, 6, 1, 2];
  for (let i = 0; i < array.length; i++){
    let item = document.getElementById("item-" + array[i]);
    item.style.order = (i + 1);
    removeClass(item, "sorted");
  }
  removeClass(document.getElementsByClassName("compared")[0], "compared");
  removeClass(document.getElementsByClassName("minimum")[0], "minimum");
  //log.innerHTML = "";
  currentStep = 0;
  document.getElementById("flow-1").appendChild(document.getElementById('cursor'));
  states = [divStates.innerHTML];
}

document.getElementById("sort-new").addEventListener('click', function(){
  initTri();
  tri(array);
  divStates.innerHTML = states[0];
});

document.getElementById("sort-forward").addEventListener('click', function(){
  if (currentStep < states.length - 1){
    currentStep++;
    divStates.innerHTML = states[currentStep];
  }
});

document.getElementById("sort-backward").addEventListener('click', function(){
  if (currentStep > 0){
    currentStep--;
    divStates.innerHTML = states[currentStep];
  }
});

document.getElementById("sort-start").addEventListener('click', function(){
    currentStep = 0;
    divStates.innerHTML = states[currentStep];
});
