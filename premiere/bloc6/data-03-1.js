var array = [1, 2, 3, 4, 5, 6];
var steps;
var currentStep = 0;
var log = document.getElementById("log");

function tri(array){
  let steps = [];
  for (let i = 1; i < array.length; i++){
    let element = array[i];
    let j = i - 1;
    steps.push({"type" : STEPS.CURSOR, "parameters": [element, array[j], i + 1]});
    while (j >= 0 && array[j] > element) {
      // déplacer le nombre
      steps.push({"type" : STEPS.MOVE, "parameters" : [array[j + 1], array[j], i + 1]});
      array[j + 1] = array[j];
      j--;
    }
    steps.push({"type" : STEPS.PLACEMENT, "parameters" : [element, j + 1]});
    array[j + 1] = element;
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
  log.innerHTML = "";
  currentStep = 0;
  document.getElementById("flow-2").appendChild(document.getElementById('cursor'));
  addClass(document.getElementById("item-" + array[0]), "sorted");
}

function showStep(){
  log.innerHTML = formatStep(array, steps[currentStep]);
  //formatStep(array, steps[currentStep]);
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
