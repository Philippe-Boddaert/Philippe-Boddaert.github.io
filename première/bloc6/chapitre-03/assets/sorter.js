"use strict"; // on utilise le mode strict

function shuffle(array){
  let len = array.length - 1;
  for(let i = len; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

function swap(array, i, j){
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

class Sorter {

  constructor(array, options){
    this.__states = [];
    this.__currentStep = 0;
    this.__statesContainer;
    this.__interval;
    this.__logger;
    this.__default = {
      "interval" : 300,
      "container" : "sorter",
      "templateIdStates" : "sort-states",
      "classContainer" : "sort-container",
      "classItem" : "sort-item",
      "classContent" : "sort-content",
      "classCursor" : "sort-cursor",
      "classController" : "sort-controller",
      "templateIdItem" : "item-",
      "templateIdItemCursor" : "flow-",
      "templateIdCursor" : "cursor",
      "templateIdLoggerCompare" : "logger-compare",
      "templateIdLoggerSwap" : "logger-swap",
      "classSorted" : "sorted",
      "classCompared" : "compared",
      "classMinimum" : "minimum",
      "classLegend" : "sort-legend",
      "classLogger" : "sort-logger",
      "legend" : {
        "cursor" : "Indice où l'élément <i>i</i> sera placé",
        "compared" : "Element à comparer",
        "minimum" : "Element à comparer",
        "sorted" : "Elements triés"
      },
      "buttons" : {
        "play" : '<i class="fas fa-play"></i>',
        "pause" : '<i class="fas fa-pause"></i>',
        "forward" : '<i class="fas fa-step-forward"></i>',
        "back" : '<i class="fas fa-step-backward"></i>',
        "start" : '<i class="fas fa-fast-backward"></i>',
        "new" : '<i class="fas fa-random"></i>'
      },
      "showLegend" : true,
      "showController" : true,
      "showCursor" : true,
      "showLogger" : false
    };
    this.__original = array;
    this.__array = [...this.__original];
    this.__options = _.merge(this.__default, options);
    this.__container = document.getElementById(this.__options.container);
    this.constructContent();
    this.new(array);
  }

  start(event, caller){
    this.__currentStep = 0;
    if (this.__states.length > 0){
      this.__statesContainer.innerHTML = this.__states[this.__currentStep];
    }
  }

  back(event, caller){
    if (this.__currentStep > 0){
      this.__currentStep--;
      this.__statesContainer.innerHTML = this.__states[this.__currentStep];
    }
  }

  forward(event, caller){
    if (this.__currentStep < this.__states.length - 1){
      this.__currentStep++;
      this.__statesContainer.innerHTML = this.__states[this.__currentStep];
    }
  }

  auto(event, caller, next = function(){}){
    if (caller.dataset.launch === 'false'){
      caller.innerHTML = this.__options.buttons.pause;
      caller.dataset.launch = 'true';
      let me = this;
      this.__interval = setInterval(function(){
        if (caller.dataset.launch === 'true' && (me.__currentStep < me.__states.length - 1)){
          me.__currentStep++;
          me.__statesContainer.innerHTML = me.__states[me.__currentStep];
        } else {
          caller.innerHTML = me.__options.buttons.play;
          caller.dataset.launch = 'false';
          clearInterval(me.__interval);
        }
        next(event, caller, me);
      }, this.__options.interval);
    } else {
      caller.innerHTML = this.__options.buttons.play;
      caller.dataset.launch = 'false';
      clearInterval(this.__interval);
    }
  }

  tri(array){}

  setArray(array){
    this.__array = array;

    for (let i = 0; i < this.__array.length; i++){
      let item = this.getItem(this.__array[i]);
      item.style.order = (i + 1);
      item.classList.remove(this.__options.classSorted);
    }
    if (this.__statesContainer.getElementsByClassName("compared").length > 0)
      this.__statesContainer.getElementsByClassName("compared")[0].classList.remove("compared");

    if (this.__statesContainer.getElementsByClassName("minimum").length > 0)
      this.__statesContainer.getElementsByClassName("minimum")[0].classList.remove("minimum");

    //log.innerHTML = "";
    this.__currentStep = 0;
    this.logCompare(true);
    this.logSwap(true);
    document.getElementById(this.__options.container + '-' + this.__options.templateIdItemCursor + '1').appendChild(document.getElementById(this.__options.container + '-' + this.__options.templateIdCursor));
    this.__states = [this.__statesContainer.innerHTML];
  }

  new(newArray, event, caller){
    this.setArray(newArray);
    //this.setArray([2, 3, 5, 6, 4, 1]);
    this.tri(this.__array);
    if (this.__states.length > 0){
      this.__statesContainer.innerHTML = this.__states[0];
    }
  }

  constructContent() {
    // Constructs Item, Cursor containers'
    let divStates = document.createElement('div');
    divStates.id = this.__options.container + '-' + this.__options.templateIdStates;
    let divItemContainer = document.createElement('div');
    divItemContainer.className = this.__options.classContainer;
    let divCursorContainer = document.createElement('div');
    divCursorContainer.className = this.__options.classContainer + (this.__options.showCursor?'':' hidden');;

    // Constructs legend
    let divLegendContainer = document.createElement('div');
    divLegendContainer.className = this.__options.classContainer + ' ' + this.__options.classLegend + (this.__options.showLegend?'':' hidden');

    let cursorLegend = document.createElement('div');
    cursorLegend.innerHTML = '<span class=\'sort-cursor sort-label\'>&#8679;</span> ' + this.__options.legend.cursor;

    let comparedLegend = document.createElement('div');
    comparedLegend.innerHTML = '<span class=\'sort-content sort-label compared\'>&nbsp;&nbsp;</span> ' + this.__options.legend.compared;

    let minimumLegend = document.createElement('div');
    minimumLegend.innerHTML = '<span class=\'sort-content sort-label minimum\'>&nbsp;&nbsp;</span> ' + this.__options.legend.minimum;

    let sortedLegend = document.createElement('div');
    sortedLegend.innerHTML = '<span class=\'sort-content sort-label sorted\'>&nbsp;&nbsp;</span> ' + this.__options.legend.sorted;

    divLegendContainer.appendChild(cursorLegend);
    divLegendContainer.appendChild(comparedLegend);
    divLegendContainer.appendChild(minimumLegend);
    divLegendContainer.appendChild(sortedLegend);

    // Constructs item
    this.__array.forEach((item, i) => {
      let divItem = document.createElement('div');
      divItem.className = this.__options.classItem + ' ' + this.__options.classContent;
      divItem.id = this.__options.container + '-' + this.__options.templateIdItem + (i + 1);
      divItem.style.order = (i + 1);
      divItem.innerHTML = (i + 1);
      divItemContainer.appendChild(divItem);

      let divCursor = document.createElement('div');
      divCursor.className = this.__options.classItem + ' ' + this.__options.classCursor;
      divCursor.id = this.__options.container + '-' + this.__options.templateIdItemCursor + (i + 1);
      divCursorContainer.appendChild(divCursor);
    });

    // Constructs Flow buttons
    let divControllerContainer = document.createElement('div');
    divControllerContainer.className = this.__options.classContainer + ' ' + this.__options.classController + (this.__options.showController?'':' hidden');

    var me = this;
    // button : start
    let buttonStart = document.createElement('button');
    buttonStart.innerHTML = this.__options.buttons.start;
    buttonStart.title = 'Revenir au départ';
    buttonStart.addEventListener('click', function(event){
      me.start();
    });

    // button : backward
    let buttonBack = document.createElement('button');
    buttonBack.innerHTML = this.__options.buttons.back;
    buttonBack.title = 'Revenir à l\'instruction précédente';
    buttonBack.addEventListener('click', function(event){
      me.back(event, this);
    });

    // button : forward
    let buttonForward = document.createElement('button');
    buttonForward.innerHTML = this.__options.buttons.forward;
    buttonForward.title = 'Aller à l\'instruction suivante';
    buttonForward.addEventListener('click', function(event){
      me.forward(event, this);
    });

    // button : auto
    let buttonAuto = document.createElement('button');
    buttonAuto.innerHTML = this.__options.buttons.play;
    buttonAuto.title = 'Exécuter les instructions automatiquement';
    buttonAuto.dataset.launch = false;
    buttonAuto.addEventListener('click', function(event){
      me.auto(event, this);
    });

    // button : new
    let buttonNew = document.createElement('button');
    buttonNew.innerHTML = this.__options.buttons.new;
    buttonNew.title = 'Générer un nouveau tableau';
    buttonNew.addEventListener('click', function(event){
      me.new(shuffle([...me.__original]), event, this);
    });

    // Constructs logger
    let divLoggerContainer = document.createElement('div');
    divLoggerContainer.className = this.__options.classContainer + ' ' + this.__options.classLogger + (this.__options.showLogger?'':' hidden');

    let pLoggerCompare = document.createElement('div');
    let pLoggerSwap = document.createElement('div');
    let loggerCompare = document.createElement('span');
    let loggerSwap = document.createElement('span');

    pLoggerCompare.innerHTML = 'Nombre de comparaisons : ';
    pLoggerSwap.innerHTML = 'Nombre d\'échanges : ';
    loggerCompare.id = this.__options.container + '-' + this.__options.templateIdLoggerCompare;
    loggerCompare.innerHTML = 0;
    loggerSwap.id = this.__options.container + '-' + this.__options.templateIdLoggerSwap;
    loggerSwap.innerHTML = 0;

    pLoggerCompare.appendChild(loggerCompare);
    pLoggerSwap.appendChild(loggerSwap);
    divLoggerContainer.appendChild(pLoggerCompare);
    divLoggerContainer.appendChild(pLoggerSwap);

    divControllerContainer.appendChild(buttonStart);
    divControllerContainer.appendChild(buttonBack);
    divControllerContainer.appendChild(buttonForward);
    divControllerContainer.appendChild(buttonAuto);
    divControllerContainer.appendChild(buttonNew);

    divStates.appendChild(divLoggerContainer);
    divStates.appendChild(divItemContainer);
    divStates.appendChild(divCursorContainer);

    this.__container.appendChild(divLegendContainer);
    this.__container.appendChild(divStates);
    this.__container.appendChild(divControllerContainer);

    this.__statesContainer = divStates;

    // Constructs the cursor
    let divCursor = document.createElement('div');
    divCursor.id = this.__options.container + '-' + this.__options.templateIdCursor;
    divCursor.innerHTML = '&#8679;';
    document.getElementById(this.__options.container + '-' + this.__options.templateIdItemCursor + '1').appendChild(divCursor);
  }

  highlightAsCompared(position){
    if (this.__statesContainer.getElementsByClassName(this.__options.classCompared).length > 0)
      this.__statesContainer.getElementsByClassName(this.__options.classCompared)[0].classList.remove(this.__options.classCompared);
    this.getItem(position).classList.add(this.__options.classCompared);
  }

  highlightAsMinimum(position){
    if (this.__statesContainer.getElementsByClassName(this.__options.classMinimum).length > 0)
      this.__statesContainer.getElementsByClassName(this.__options.classMinimum)[0].classList.remove(this.__options.classMinimum);
    this.getItem(position).classList.add(this.__options.classMinimum);
  }

  highlightAsSorted(position){
    this.getItem(position).classList.add(this.__options.classSorted);
  }

  saveState(){
    this.__states.push(this.__statesContainer.innerHTML);
  }

  placeCursor(position){
    let cursor = document.getElementById(this.__options.container + '-' + this.__options.templateIdCursor);
    document.getElementById(this.__options.container + '-' + this.__options.templateIdItemCursor + position).appendChild(cursor);
    this.saveState();
  }

  getItem(position){
    return document.getElementById(this.__options.container + '-' + this.__options.templateIdItem + position);
  }

  logCompare(init = false){
    let logger = document.getElementById(this.__options.container + '-' + this.__options.templateIdLoggerCompare);
    logger.innerHTML = (init)?0:(parseInt(logger.innerHTML) + 1);
  }

  logSwap(init = false){
    let logger = document.getElementById(this.__options.container + '-' + this.__options.templateIdLoggerSwap);
    logger.innerHTML = (init)?0:(parseInt(logger.innerHTML) + 1);
  }

  swapItem(current, min, saveState = true){
    this.logSwap();

    let item = this.getItem(current);
    let minimum = this.getItem(min);

    let tmp = item.style.order;
    item.style.order = minimum.style.order;
    minimum.style.order = tmp;
    //return "Echange entre [" + array[i] + "] <-> [" + array[min] + "]";
    if (saveState)
      this.saveState();
  }

  compare(a, b){
    this.logCompare();
    this.highlightAsCompared(a);
    this.highlightAsMinimum(b);
    this.saveState();
    return a - b;
  }
}

// BubbleSorter
class BubbleSorter extends Sorter {

  tri(array){
    for (let i = array.length - 1; i >= 0; i--) {
        this.placeCursor(i + 1);
        for (let j = 0; j < i; j++) {
            if (this.compare(array[j], array[j + 1]) > 0) {
                swap(array, j, j + 1);
                this.swapItem(array[j], array[j + 1]);
            }
        }
        this.highlightAsSorted(i + 1);
    }
    this.saveState();
  }
}

class SelectSorter extends Sorter {

  constructor(array, options){
    let opt = _.merge({ "legend" : { "cursor" : "Indice de l'élément $i$ à placer"}}, options);
    super(array, opt);
  }

  minimum(array, start){
    let min = start;
    for (let i = start + 1; i < array.length; i++){
      if (this.compare(array[min], array[i]) > 0){
        min = i;
      }
    }
    return min;
  }

  swapItem(current, min){
    this.logSwap();
    let item = this.getItem(current);
    let minimum = this.getItem(min);

    let tmp = item.style.order;
    item.style.order = minimum.style.order;
    minimum.style.order = tmp;
    this.highlightAsSorted(current);
    //return "Echange entre [" + array[i] + "] <-> [" + array[min] + "]";
    this.saveState();
  }

  tri(array){
    for (let i = 0; i < array.length; i++){
      this.placeCursor(i + 1);
      let min = this.minimum(array, i);
      // swap
      if (min != i){
        swap(array, i, min);
        this.swapItem(array[i], array[min]);
      } else {
        this.highlightAsSorted(array[min]);
        this.saveState();
      }
    }
  }
}

class InsertSorter extends Sorter {

  move(current, after){
    this.logSwap();
    let item = this.getItem(current);
    let minimum = this.getItem(after);

    let tmp = item.style.order;
    item.style.order = minimum.style.order;
    minimum.style.order = tmp;

    this.highlightAsMinimum(current);

    this.saveState();
  }

  place(current){
    this.highlightAsSorted(current);
    this.saveState();
  }

  tri(array){
    this.highlightAsSorted(array[0]);
    for (let i = 1; i < array.length; i++){
      this.placeCursor(i + 1);
      let element = array[i];
      let j = i - 1;
      while (j >= 0 && this.compare(array[j], element) > 0) {
        // déplacer le nombre
        this.move(element, array[j]);
        array[j + 1] = array[j];
        j--;
      }
      this.place(element);
      array[j + 1] = element;
    }
  }
}

class QuickSorter extends Sorter {

  partitionner(l, a, b) {
    let fin = b - 1;
    let pivot = a;
    let debut = a + 1;

    this.placeCursor(debut);

    while (fin - debut >= 0){
        if (this.compare(l[pivot], l[debut]) > 0){
            swap(l, debut, pivot);
            this.swapItem(l[debut], l[pivot], false);
            pivot = debut;
            debut++;
        } else{
            swap(l, debut, fin);
            this.swapItem(l[debut], l[fin], false);
            fin--;
        }
        this.placeCursor(debut);
    }

    return pivot;
}

  tri(array, start, end){
    if (typeof start === 'undefined'){
      start = 0;
    }
    if (typeof end === 'undefined'){
      end = array.length;
    }

    if (start < end){
      let pivot = this.partitionner(array, start, end);
      this.highlightAsSorted(array[pivot]);
      this.saveState();
      this.tri(array, start, pivot);
      this.tri(array, pivot + 1, end);
    }
  }
}
