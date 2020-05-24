SOMMAIRE = [
              { "url" : "index.html", "titre" : "Sommaire"},
              { "url" : "03-1.html", "titre" : "6.3.1 - Tri par insertion" },
              { "url" : "03-2.html", "titre" : "6.3.2 - Tri par sélection" },
            ];

var array = [1, 2, 3, 4, 5, 6];
var steps;
var currentStep = 0;
//var log = document.getElementById("log");

function minimum(array, start){
  let steps = [];
  let min = start;
  for (let i = start + 1; i < array.length; i++){
    steps.push({ "type" : STEPS.COMPARAISON, "parameters" : [array[i], array[min], start + 1]});
    if (array[i] < array[min]){
      min = i;
    }
  }
  return [min, steps];
}

function tri(array){
  let steps = [];
  for (let i = 0; i < array.length; i++){
    let result = minimum(array, i);
    let min = result[0];
    steps = steps.concat(result[1]);
    steps.push({ "type" : STEPS.SWAP, "parameters" : [array[i], array[min]]});
    swap(array, i, min);
  }
  return steps;
}

function initTri(){
  shuffle(array);

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
}

function showStep(){
  //log.innerHTML = formatStep(array, steps[currentStep]);
  formatStep(array, steps[currentStep]);
}

initTri();
steps = tri(array);

document.getElementById("sort-new").addEventListener('click', function(){
  initTri();
  steps = tri(array);
});

document.getElementById("sort-play").addEventListener('click', function(){
  if (currentStep < steps.length){
    showStep();
    currentStep++;
  }
});
