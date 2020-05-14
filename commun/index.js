// JavaScript Document

let url = document.location.href;
let elt = url.split('/');
let current = elt[elt.length - 1];

//========== MENU ==========
//-----Construction du menu
let nav = document.querySelector('nav');
let menu = document.createElement('div');
menu.id = "menu";

let toggle = document.createElement('div');
toggle.id = "toggle";
toggle.innerHTML = "X";
toggle.addEventListener('click', toogleMenu);

nav.appendChild(toggle);
nav.appendChild(menu);

SOMMAIRE.forEach(item => ajouteLienMenu(menu, item, current));
