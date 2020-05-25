"use strict"; // on utilise le mode strict

class Sorter {
  __array;
  __states = [];
  __currentStep = 0;
  __statesContainer;
  __stepByStep = false;
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
    "classMinimum" : "minimum"
  };
  constructor(array, options){
    this.__original = array;
    this.__array = [...this.__original];
    this.__options = Object.assign(this.__default, options);
    this.__container = document.getElementById(this.__options.container);
    this.constructContent();
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
    if (caller.innerHTML === 'play'){
      caller.innerHTML = 'pause';
      this.__stepByStep = true;
      let me = this;
      this.__interval = setInterval(function(){
        if (me.__stepByStep && (me.__currentStep < me.__states.length - 1)){
          me.__currentStep++;
          me.__statesContainer.innerHTML = me.__states[me.__currentStep];
        } else {
          caller.innerHTML = 'play';
          me.__stepByStep = false;
          clearInterval(me.__interval);
        }
      }, this.__options.interval);
    } else {
      caller.innerHTML = 'play';
      this.__stepByStep = false;
      clearInterval(this.__interval);
    }
  }

  tri(array){}

  setArray(data){
    this.__array = data;

    for (let i = 0; i < this.__array.length; i++){
      let item = this.getItem(this.__array[i]);
      item.style.order = (i + 1);
      removeClass(item, this.__options.classSorted);
    }
    removeClass(this.__container.getElementsByClassName("compared")[0], "compared");
    removeClass(this.__container.getElementsByClassName("minimum")[0], "minimum");
    //log.innerHTML = "";
    this.__currentStep = 0;
    document.getElementById(this.__options.container + '-' + this.__options.templateIdItemCursor + '1').appendChild(document.getElementById(this.__options.container + '-' + this.__options.templateIdCursor));
    this.__states = [this.__statesContainer.innerHTML];
  }

  new(event, caller){
    this.setArray(shuffle([1, 2, 3, 4, 5, 6]));
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
    divCursorContainer.className = this.__options.classContainer;

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
    divControllerContainer.className = this.__options.classContainer + ' ' + this.__options.classController;

    var me = this;
    // button : start
    let buttonStart = document.createElement('button');
    buttonStart.innerHTML = 'go to start';
    buttonStart.addEventListener('click', function(event){
      me.start(event, this);
    });

    // button : backward
    let buttonBack = document.createElement('button');
    buttonBack.innerHTML = 'back';
    buttonBack.addEventListener('click', function(event){
      me.back(event, this);
    });

    // button : forward
    let buttonForward = document.createElement('button');
    buttonForward.innerHTML = 'forward';
    buttonForward.addEventListener('click', function(event){
      me.forward(event, this);
    });

    // button : auto
    let buttonAuto = document.createElement('button');
    buttonAuto.innerHTML = 'play';
    buttonAuto.addEventListener('click', function(event){
      me.auto(event, this);
    });

    // button : new
    let buttonNew = document.createElement('button');
    buttonNew.innerHTML = 'new';
    buttonNew.addEventListener('click', function(event){
      me.new(event, this);
    });

    divControllerContainer.appendChild(buttonStart);
    divControllerContainer.appendChild(buttonBack);
    divControllerContainer.appendChild(buttonForward);
    divControllerContainer.appendChild(buttonAuto);
    divControllerContainer.appendChild(buttonNew);

    divStates.appendChild(divItemContainer);
    divStates.appendChild(divCursorContainer);

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
    removeClass(this.__container.getElementsByClassName(this.__options.classCompared)[0], this.__options.classCompared);
    addClass(this.getItem(position), this.__options.classCompared);
  }

  highlightAsMinimum(position){
    removeClass(this.__container.getElementsByClassName(this.__options.classMinimum)[0], this.__options.classMinimum);
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
}

// BubbleSorter
class BubbleSorter extends Sorter {

  tri(array){
    for (let i = array.length - 1; i >= 0; i--) {
        this.placeCursor(i + 1);
        for (let j = 0; j < i; j++) {
          this.highlightAsCompared(array[j]);
          this.highlightAsMinimum(array[j + 1]);
          this.saveState();
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                this.swapItem(array[j], array[j + 1]);
            }
        }
        this.highlightAsSorted(i + 1);
    }
  }
}

class SelectSorter extends Sorter {

  compareElement(current, min, index){
    this.highlightAsCompared(current);
    this.highlightAsMinimum(min);
    this.placeCursor(index);
  }

  minimum(array, start){
    let min = start;
    for (let i = start + 1; i < array.length; i++){
      this.compareElement(array[i], array[min], start + 1);
      if (array[i] < array[min]){
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
      this.highlightAsCompared(array[j]);
      while (j >= 0 && array[j] > element) {
        // déplacer le nombre
        this.highlightAsCompared(array[j]);
        this.move(element, array[j]);
        array[j + 1] = array[j];
        j--;
      }
      this.place(element);
      array[j + 1] = element;
    }
  }
}
