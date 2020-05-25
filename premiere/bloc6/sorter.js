"use strict"; // on utilise le mode strict

class Sorter {
  __array;
  __states = [];
  __currentStep = 0;
  __statesContainer;
  __interval;
  __default = {
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
    "classSorted" : "sorted",
    "classCompared" : "compared",
    "classMinimum" : "minimum",
    "classLegend" : "sort-legend",
    "legend" : {
      "cursor" : "Indice où l'élément $i$ sera placé",
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
    "showCursor" : true
  };
  constructor(array, options){
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

  auto(event, caller){
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
      removeClass(item, this.__options.classSorted);
    }
    removeClass(this.__statesContainer.getElementsByClassName("compared")[0], "compared");
    removeClass(this.__statesContainer.getElementsByClassName("minimum")[0], "minimum");
    //log.innerHTML = "";
    this.__currentStep = 0;
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
    divCursorContainer.className = this.__options.classContainer + (this.__options.showLegend?'':' hidden');;

    // Constructs legend
    let divLegendContainer = document.createElement('div');
    divLegendContainer.className = this.__options.classContainer + ' ' + this.__options.classLegend + (this.__options.showLegend?'':' hidden');

    let cursorLegend = document.createElement('p');
    cursorLegend.innerHTML = '<span class=\'sort-cursor\'>&#8679;</span> ' + this.__options.legend.cursor;

    let comparedLegend = document.createElement('p');
    comparedLegend.innerHTML = '<span class=\'sort-content sort-label compared\'>&nbsp;&nbsp;</span> ' + this.__options.legend.compared;

    let minimumLegend = document.createElement('p');
    minimumLegend.innerHTML = '<span class=\'sort-content sort-label minimum\'>&nbsp;&nbsp;</span> ' + this.__options.legend.minimum;

    let sortedLegend = document.createElement('p');
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

    divControllerContainer.appendChild(buttonStart);
    divControllerContainer.appendChild(buttonBack);
    divControllerContainer.appendChild(buttonForward);
    divControllerContainer.appendChild(buttonAuto);
    divControllerContainer.appendChild(buttonNew);

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
    removeClass(this.__statesContainer.getElementsByClassName(this.__options.classCompared)[0], this.__options.classCompared);
    addClass(this.getItem(position), this.__options.classCompared);
  }

  highlightAsMinimum(position){
    removeClass(this.__statesContainer.getElementsByClassName(this.__options.classMinimum)[0], this.__options.classMinimum);
    addClass(this.getItem(position), this.__options.classMinimum);
  }

  highlightAsSorted(position){
    addClass(this.getItem(position), this.__options.classSorted);
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

  swapItem(current, min){
    let item = this.getItem(current);
    let minimum = this.getItem(min);

    let tmp = item.style.order;
    item.style.order = minimum.style.order;
    minimum.style.order = tmp;
    //return "Echange entre [" + array[i] + "] <-> [" + array[min] + "]";
    this.saveState();
  }

  compare(a, b){
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
      swap(array, i, min);
      this.swapItem(array[i], array[min]);
    }
  }
}

class InsertSorter extends Sorter {

  move(current, after){
    let item = this.getItem(current);
    let minimum = this.getItem(after);

    let tmp = item.style.order;
    item.style.order = minimum.style.order;
    minimum.style.order = tmp;
    item.innerHTML = minimum.innerHTML;

    this.highlightAsMinimum(current);
    //return "Echange entre [" + step.parameters[0] + "] <-> [" + step.parameters[1] + "]";
    this.saveState();
  }

  place(current){
    this.getItem(current).innerHTML = current;
    this.highlightAsSorted(current);
    //return "Placement de [" + current + "] en indice " + position;
    this.saveState();
  }

  tri(array){
    for (let i = 1; i < array.length; i++){
      let element = array[i];
      let j = i - 1;
      this.placeCursor(i + 1);
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

    this.placeCursor(l[pivot]);

    while (fin - debut >= 0){
        if (this.compare(l[pivot], l[debut]) > 0){
            swap(l, debut, pivot);
            this.swapItem(l[debut], l[pivot]);
            pivot = debut;
            this.placeCursor(l[pivot]);
            debut++;
        } else{
            swap(l, debut, fin);
            this.swapItem(l[debut], l[fin]);
            fin--;
        }
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
