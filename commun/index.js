// JavaScript Document

let url = document.location.href;
let elt = url.split('/');
let current = elt[elt.length - 1];

//========== MENU ==========
//-----Construction du menu
let menu = document.querySelector('nav');

SOMMAIRE.forEach(item => ajouteLienMenu(menu, item, current));
