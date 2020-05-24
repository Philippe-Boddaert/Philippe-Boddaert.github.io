function compareElement(current, min, index){
  highlightAsCompared(document.getElementById("item-" + current));
  highlightAsMinimum(document.getElementById("item-" + min));

  document.getElementById("flow-" + index).appendChild(document.getElementById('cursor'));
  //return "Comparaison entre [" + minimum + "] et [" + current + "]";
  states.push(divStates.innerHTML);
}

function minimum(array, start){
  let min = start;
  for (let i = start + 1; i < array.length; i++){
    compareElement(array[i], array[min], start + 1);
    if (array[i] < array[min]){
      min = i;
    }
  }
  return min;
}

function swapElement(current, min){
  let item = document.getElementById("item-" + current);
  let minimum = document.getElementById("item-" + min);
  tmp = item.style.order;
  item.style.order = minimum.style.order;
  minimum.style.order = tmp;
  addClass(item, "sorted");
  //return "Echange entre [" + array[i] + "] <-> [" + array[min] + "]";
  states.push(divStates.innerHTML);
}

function tri(array){
  for (let i = 0; i < array.length; i++){
    let min = minimum(array, i);
    // swap
    swap(array, i, min);
    swapElement(array[i], array[min]);
  }
}

initTri();
steps = tri(array);
divStates.innerHTML = states[0];
