//-----Fonctions pour la construction du menu
function ajouteLienMenu(menu_ul, item, current = null, level = 1) {
    let h = document.createElement("h" + (level + 1));
    h.className = ((current == item.url)?"active":"");

    let menu_item = document.createElement("a");
    menu_item.className = 'menu-item';
    menu_item.setAttribute("href",  item.url);
    menu_item.innerHTML = item.titre;

    h.appendChild(menu_item);
    menu_ul.appendChild(h);

    if (typeof item.menu !== 'undefined'){
      for (let s_item of item.menu) {
        ajouteLienMenu(menu_ul, s_item, current, level + 1);
      }
    }
}

function toogleMenu() {
  let nav = document.querySelector('nav');
  let menu = document.querySelector('#menu');

  if (menu.className.includes('hidden')){
    menu.className = menu.className.replace('hidden', '').trim();
    nav.className = nav.className.replace('hidden', '').trim();
  } else {
    menu.className += ' hidden';
    nav.className += ' hidden';
  }

}

function toogleReponse(event){
  let reponse = this.querySelector('.reponse');
  if (reponse.style.display === '' || reponse.style.display === 'none'){
    reponse.style.display = 'flex';
    this.style.paddingBottom = '20px';
  } else {
    reponse.style.display = 'none';
    this.style.paddingBottom = '0px';
  }
}

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

function clearChildren(element){
  // Supprime tous les enfant d'un élément
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function swap(array, i, j){
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function addClass(element, clazz){
  if (typeof element !== 'undefined' && element.className.indexOf(clazz) == -1){
    element.className += ' ' + clazz;
  }
}

function removeClass(element, clazz){
  if (typeof element !== 'undefined'){
    element.className = element.className.replace(new RegExp(clazz, 'gi'), '');
  }
}
