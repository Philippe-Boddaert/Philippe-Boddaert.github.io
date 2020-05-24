function swapElement(current, min){
  let item = document.getElementById("item-" + current);
  let minimum = document.getElementById("item-" + min);
  tmp = item.style.order;
  item.style.order = minimum.style.order;
  minimum.style.order = tmp;
  //return "Echange entre [" + array[i] + "] <-> [" + array[min] + "]";
  states.push(divStates.innerHTML);
}

function placeCursor(position){
  document.getElementById("flow-" + position).appendChild(document.getElementById('cursor'));
  //return "Element courant [" + current + "]";
  states.push(divStates.innerHTML);
}

function tri(array){
  for (let i = array.length - 1; i >= 0; i--) {
      placeCursor(i + 1);
      for (let j = 0; j < i; j++) {
        highlightAsCompared(document.getElementById("item-" + array[j]));
        highlightAsMinimum(document.getElementById("item-" + array[j + 1]));
        states.push(divStates.innerHTML);
          if (array[j] > array[j + 1]) {
              swap(array, j, j + 1);
              swapElement(array[j], array[j + 1]);
          }
      }
      addClass(document.getElementById("item-" + (i + 1)), "sorted");
  }
}

initTri(shuffle([1, 2, 3, 4, 5, 6]));
steps = tri(array);
divStates.innerHTML = states[0];
