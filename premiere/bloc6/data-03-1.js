function placeCursor(position){
  document.getElementById("flow-" + position).appendChild(document.getElementById('cursor'));
  //return "Element courant [" + current + "]";
  states.push(divStates.innerHTML);
}

function move(current, after){
  let item = document.getElementById('item-' + current);
  let minimum = document.getElementById('item-' + after);

  let tmp = item.style.order;
  item.style.order = minimum.style.order;
  minimum.style.order = tmp;
  item.innerHTML = minimum.innerHTML;

  highlightAsMinimum(item);
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
    placeCursor(i + 1);
    highlightAsCompared(document.getElementById('item-' + array[j]));
    while (j >= 0 && array[j] > element) {
      // déplacer le nombre
      highlightAsCompared(document.getElementById('item-' + array[j]));
      move(element, array[j]);
      array[j + 1] = array[j];
      j--;
    }
    place(element, j + 1);
    array[j + 1] = element;
  }
}

initTri(shuffle([1, 2, 3, 4, 5, 6]));
steps = tri(array);
divStates.innerHTML = states[0];
