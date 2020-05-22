// JavaScript Document
let tabFiltres = document.querySelector('#base thead').getElementsByTagName('tr');
let tabExercices = document.querySelector('#base tbody').getElementsByTagName('tr');
let nbExercices = tabExercices.length;
let nbFiltres = tabFiltres[1].getElementsByTagName('td').length;

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
			if (document.getElementsByTagName('input')[filtre].checked && tab[i][filtre] == false) {
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
	document.querySelectorAll('input')[k].addEventListener("click", actualise);
}
