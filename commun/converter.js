class Converter {
  ALPHABET = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  MODE = ['', 'Rang', 'Puissance', 'Valeur du Rang'];
  __options;
  __base;
  __value;
  __heapnumber;
  __default = {
    "container" : "converter",
    "classContainer" : "sort-container",
    "classLegend" : "sort-legend",
    "classController" : "sort-controller",
    "classLogger" : "sort-logger",
    "classTable" : "converter-table",
    "classFill" : "filled",
    "templateIdHeaps" : "heap-",
    "base" : 10,
    "modeLegend" : 0, // 0 = none, 1 = rang, 2 = power, 3 = value
    "showController" : true,
    "showLogger" : true,
    "showCaption" : true,
    "buttons" : {
      "forward" : '<i class="fas fa-plus"></i>',
      "back" : '<i class="fas fa-minus"></i>',
      "mode" : '<i class="fas fa-info-circle"></i>'
    },
  }

  constructor(base, heapnumber, options){
    this.__base = base;
    this.__heapnumber = heapnumber;
    this.__options = _.merge(this.__default, options);
    this.__container = document.getElementById(this.__options.container);
    this.constructContent();
  }

  constructContent() {
    // Constructs Item, Cursor containers'
    let divItemContainer = document.createElement('div');
    divItemContainer.className = this.__options.classContainer;

    let divHeapsContainer = document.createElement('div');
    divHeapsContainer.id = this.__options.container + '-' + this.__options.templateIdHeaps;

    let table = document.createElement('table');
    table.className = this.__options.classTable + ' center';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tfoot = document.createElement('tfoot');
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);
    table.appendChild(document.createElement('caption'));
    let head = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.classList.add('empty');
    head.appendChild(th1);
    let th2 = document.createElement('th');
    th2.setAttribute('colspan', this.__heapnumber);
    head.appendChild(th2);
    thead.appendChild(head);

    let info = document.createElement('tr');
    let tmp = document.createElement('th');
    tmp.className = 'empty';
    info.appendChild(tmp);
    for (let i = this.__heapnumber - 1; i >= 0; i--){
      let td = document.createElement('th');
      switch(this.__options.modeLegend){
        case 0 : td.innerHTML = '&nbsp;';
                info.classList.add('hidden');
                head.classList.add('hidden');
          break;
        case 1 : td.innerHTML = i;
                info.classList.remove('hidden');
                head.classList.remove('hidden');
          break;
        case 2 : td.innerHTML = this.__base+ '<sup>' + i + '</sup>';
                info.classList.remove('hidden');
                head.classList.remove('hidden');
          break;
        case 3 : td.innerHTML = 'x ' + Math.pow(this.__base, i);
                info.classList.remove('hidden');
                head.classList.remove('hidden');
          break;
      }
      th2.innerHTML = this.MODE[this.__options.modeLegend];
      info.appendChild(td);
    }
    thead.appendChild(info);

    for (let i = 0; i < this.__base - 1; i++){
        let tr = document.createElement('tr');
        let sign = document.createElement('th');
        sign.className = 'empty';
        sign.innerHTML = this.__base - i - 1;
        tr.appendChild(sign);
        for (let j = 0; j < this.__heapnumber; j++){
          let td = document.createElement('td');
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    let tr = document.createElement('tr');
    tmp = document.createElement('th');
    tmp.className = 'empty';
    tr.appendChild(tmp);
    for (let j = 0; j < this.__heapnumber; j++){
      let td = document.createElement('th');
      td.innerHTML = j;
      tr.appendChild(td);
    }
    tfoot.appendChild(tr);
    divHeapsContainer.appendChild(table);

    // Constructs legend
    let divLegendContainer = document.createElement('div');
    divLegendContainer.className = this.__options.classContainer + ' ' + this.__options.classLegend;

    // Constructs Flow buttons
    let divControllerContainer = document.createElement('div');
    divControllerContainer.className = this.__options.classContainer + ' ' + this.__options.classController + (this.__options.showController?'':' hidden');

    var me = this;

    // button : backward
    let buttonBack = document.createElement('button');
    buttonBack.innerHTML = this.__options.buttons.back;
    buttonBack.title = 'Retrancher 1';
    buttonBack.addEventListener('click', function(event){
      if (me.__value > 0)
        me.convert(me.__value - 1);
    });

    // button : forward
    let buttonForward = document.createElement('button');
    buttonForward.innerHTML = this.__options.buttons.forward;
    buttonForward.title = 'Ajouter 1';
    buttonForward.addEventListener('click', function(event){
      if (me.__value < Math.pow(me.__base, me.__heapnumber))
        me.convert(me.__value + 1);
    });

    // button : mode
    let buttonMode = document.createElement('button');
    buttonMode.innerHTML = this.__options.buttons.mode;
    buttonMode.title = 'Changer l\'affichage';
    buttonMode.addEventListener('click', function(event){
      let tr = document.querySelectorAll('#' + me.__default.container + ' table thead tr');
      let td = tr[1].children;
      me.__options.modeLegend = (me.__options.modeLegend + 1) % 4;
      tr[0].children[1].innerHTML = me.MODE[me.__options.modeLegend];
      for (let i = td.length - 1; i > 0; i--){
        switch(me.__options.modeLegend){
          case 0 : td[i].innerHTML = '&nbsp;';
                   tr[0].classList.add('hidden');
                   tr[1].classList.add('hidden');
            break;
          case 1 : td[i].innerHTML = me.__heapnumber - i;
                    tr[0].classList.remove('hidden');
                    tr[1].classList.remove('hidden');
            break;
          case 2 : td[i].innerHTML = me.__base+ '<sup>' + (me.__heapnumber - i) + '</sup>';
                    tr[0].classList.remove('hidden');
                    tr[1].classList.remove('hidden');
            break;
          case 3 : td[i].innerHTML = 'x ' + Math.pow(me.__base, (me.__heapnumber - i));
                    tr[0].classList.remove('hidden');
                    tr[1].classList.remove('hidden');
            break;
        }
      }
    });


    // Constructs logger
    let divLoggerContainer = document.createElement('div');
    divLoggerContainer.className = this.__options.classContainer + ' ' + this.__options.classLogger + (this.__options.showLogger?'':' hidden');

    divControllerContainer.appendChild(buttonBack);
    divControllerContainer.appendChild(buttonForward);
    divControllerContainer.appendChild(buttonMode);

    this.__container.appendChild(divLegendContainer);
    this.__container.appendChild(divHeapsContainer);
    this.__container.appendChild(divControllerContainer);
  }

  convert(n){
    this.__value = n;
    this.raz();
    if (this.__options.showCaption)
      document.querySelector('#' + this.__default.container + ' table caption').innerHTML = "Représentation de " + n + " en base " + this.__base + ".";
    let trs = document.querySelectorAll('#' + this.__default.container + ' table tbody tr');
    let footer = document.querySelectorAll('#' + this.__default.container + ' table tfoot th');
    let i = this.__heapnumber - 1;
    if (n == 0)
      footer[i + 1].innerHTML = this.ALPHABET[0];
    while (i >=0 && n > 0){
      let elementToFill = n % this.__base;
      for (let k = this.__base - 2; k >= this.__base - elementToFill - 1; k--){
        trs[k].children[i + 1].classList.add('filled');
      }
      footer[i + 1].innerHTML = this.ALPHABET[elementToFill];
      n = Math.trunc(n / this.__base);
      i --;
    }
  }

  raz(){
    document.querySelectorAll('#' + this.__default.container + ' .filled').forEach((item, i) => {
      item.classList.remove('filled');
    });
    document.querySelectorAll('#' + this.__default.container + ' table tfoot th').forEach((item, i) => {
      item.innerHTML = "&nbsp;";
    });
  }
}
