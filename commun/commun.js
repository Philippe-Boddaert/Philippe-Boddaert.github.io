//-----Fonctions pour la construction du menu
function ajouteLienMenu(menu_ul, item, current = null) {
    let h = document.createElement("h2");
    h.className = ((current == item.url)?"active":"");
    
    let menu_item = document.createElement("a");
    menu_item.className = 'menu-item';
    menu_item.setAttribute("href",  item.url);
    menu_item.innerHTML = item.titre;
    h.appendChild(menu_item);
    menu_ul.appendChild(h);
}
