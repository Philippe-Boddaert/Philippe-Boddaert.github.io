function placeCursor(current, position){
  let cursor = document.getElementById('cursor');
  let item = document.getElementById('item-' + current);
  removeClass(document.getElementsByClassName("compared")[0], "compared");
  addClass(item, "compared");
  document.getElementById("flow-" + position).appendChild(cursor);
  //return "Element courant [" + current + "]";
  states.push(divStates.innerHTML);
}

function move(current, after){
  let item = document.getElementById('item-' + current);
  let minimum = document.getElementById('item-' + after);
  removeClass(document.getElementsByClassName("minimum")[0], "minimum");
  let tmp = item.style.order;
  item.style.order = minimum.style.order;
  minimum.style.order = tmp;
  item.innerHTML = minimum.innerHTML;
  addClass(item, "minimum");
  //return "Echange entre [" + step.parameters[0] + "] <-> [" + step.parameters[1] + "]";
  states.push(divStates.innerHTML);
}

function place(current, position){
  let item = document.getElementById('item-' + current);
  item.innerHTML = current;
  addClass(item, "sorted");
  //return "Placement de [" + current + "] en indice " + position;
  states.push(divStates.innerHTML);
}

function tri(array){
  for (let i = 1; i < array.length; i++){
    let element = array[i];
    let j = i - 1;
    placeCursor(element, i + 1);
    while (j >= 0 && array[j] > element) {
      // déplacer le nombre
      move(element, array[j]);
      array[j + 1] = array[j];
      j--;
    }
    place(element, j + 1);
    array[j + 1] = element;
  }
}

initTri();
steps = tri(array);
divStates.innerHTML = states[0];
