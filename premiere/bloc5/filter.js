// JavaScript Document
let tabFiltres = document.getElementsByTagName('input');
let tabExercices = document.querySelector('#base tbody').getElementsByTagName('tr');
let nbExercices = tabExercices.length;
let nbFiltres = tabFiltres.length;

//Construction du tableau correspondant aux cases cochées (1) ou non cochées (0)

var tab = [];

for (let i = 0; i < nbExercices; i++) {
	var tabTd = tabExercices[i].getElementsByTagName('td');
	var ligne = [];
	for(let filtre = 0; filtre < nbFiltres; filtre++) {
		if (tabTd[filtre].innerHTML !== '&nbsp;') {
			ligne[filtre] = true;
		} else {
			ligne[filtre] = false;
		}
	}
	tab.push(ligne);
}

//
function actualise() {
	for(let i = 0; i < nbExercices; i++) {
		let test = true;
		for (let filtre = 0; filtre < nbFiltres; filtre++) {
			if (tabFiltres[filtre].checked && tab[i][filtre] == false) {
				test = false;
			}
		}
		if (test) {
			tabExercices[i].style.display='table-row';
		} else {
			tabExercices[i].style.display='none';
		}
	}
}

//Création des événements sur les cases à cocher
for (var k = 0; k < nbFiltres; k++) {
	tabFiltres[k].addEventListener("click", actualise);
}
