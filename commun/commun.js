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
    element.classList.add(clazz);
  }
}

function removeClass(element, clazz){
  if (typeof element !== 'undefined'){
    element.classList.remove(clazz);
  }
}

function addMenuButton(container){
  let menuButton = document.createElement('div');
  menuButton.className = 'slide-menu-button';
  menuButton.innerHTML = '<a href="#" title="Afficher le menu"><i class="fas fa-bars" aria-hidden="true"></i></a>';
  menuButton.addEventListener('click', function(event){
    document.getElementById('menu').style.flexBasis = '25%';
    document.getElementsByClassName('fe-persistent-header')[0].style.width = '75%';
    addClass(document.getElementsByClassName('slide-menu')[0], 'active');
    document.getElementsByClassName('reveal')[0].style.flexBasis = '75%';
    event.preventDefault();
  });
  document.getElementById('close').addEventListener('click', function(){
    document.getElementById('menu').style.flexBasis = '0%';
    document.getElementsByClassName('fe-persistent-header')[0].style.width = '100%';
    removeClass(document.getElementsByClassName('slide-menu')[0], 'active');
    document.getElementsByClassName('reveal')[0].style.flexBasis = '100%';
  });
  container.appendChild(menuButton);
}


function initMode(options){
  let opt = Object.assign({ 'header' : 'Untitled', 'menu' : [], 'home' : 'index.html'}, options);
  let pStyle = (paramStyle == null)?'full':paramStyle;
  let content = '<ul class="slide-menu-items">';

  opt.menu.forEach((item, i) => {
    content += '<li class="slide-menu-item future"><i class="far fa-circle fa-fw future" aria-hidden="true"></i><span class="slide-menu-item-title"><a href="' + item.src + '?style=' + pStyle + '">' + item.title + '</a></span></li>';
  });
  content += '</ul>';

  if (pStyle == 'reveal'){
    let custom = [];
    if (opt.menu.length > 0)
      custom.push({ title: 'Cours', icon: '<i class="fa fa-images">', content : content});
      custom.push({ title: 'Menu', icon: '<i class="fa fa-home">', fn: function(){
        document.location = opt.home  + "?style=reveal";
      }
    });
    Reveal.initialize({
      width : '100%',
      progress: true,
      slideNumber : true,
      hash: true,
      dependencies: [
        { src: '../../lib/reveal/plugin/menu/menu.js' },
        { src: '../../lib/reveal/plugin/title-footer/title-footer.js',
              async: true,
              callback: function()
              {
                  title_footer.initialize('<a href=\'https://creativecommons.org/licenses/by-nc-sa/3.0/fr/\'><img class=\"license\" src=\'https://upload.wikimedia.org/wikipedia/commons/b/bd/CC-BY-NC-SA.svg\'></a>Un site de : <a href=\"https://philippe-boddaert.github.io\">www.philippe-boddaert.github.io</a>');
              }
          }
      ],
      menu: {
        custom: custom,
        width: 'normal',
        hideMissingTitles:true,
        titleSelector : '',
        themes: true,
        themesPath: '../../lib/reveal/css/theme/',
        openOnInit: false,
        loadIcons : false
      }
    });
  } else {
    // Ajout Menu
    addMenu(content, opt.home, pStyle, opt.menu.length == 0);
    addMenuButton(document.getElementsByClassName('reveal')[0]);
  }
  addHead(pStyle, document.getElementsByClassName('reveal')[0], opt.header, opt.home);
}

function addHead(paramStyle, container, header, homePath){
  let home = create('div', {class : 'slide-home-button'});

  let title = (paramStyle == 'reveal')?'page entière':'présentation';
  let style = (paramStyle == 'reveal')?'full':'reveal';
  let mode = create('a', {"href" : "?style=" + style, "title" : "Mode " + title}, '<i class="fa fa-desktop"></i>');
  mode.style.marginRight = '10px';
  let back = create('a', {"href" : homePath + "?style=" + paramStyle, "title" : "Retour à l'accueil"}, '<i class="fa fa-home"></i>');

  home.appendChild(mode);
  home.appendChild(back);

  container.appendChild(create('div', {class : "fe-persistent-header"}, '<h4>' + header + '</h4>'));
  container.appendChild(home);
}

function addMenu(content, home, paramStyle, useSection = true){
  let menuWrapper = document.createElement('div');
  menuWrapper.id = 'menu';
  menuWrapper.className = 'slide-menu-wrapper';
  let menu = document.createElement('nav');
  menu.className = 'slide-menu slide-menu--left slide-menu--normal active'
  let toolbar = document.createElement('ol');
  toolbar.className = 'slide-menu-toolbar';
  let toolBarPanel = document.createElement('li');
  toolBarPanel.className = "toolbar-panel-button active-toolbar-button";
  toolBarPanel.innerHTML = '<i class="fas fa-images" aria-hidden="true"></i><br><span class="slide-menu-toolbar-label">Cours</span>';
  toolbar.appendChild(toolBarPanel);
  toolBarPanel = document.createElement('li');
  toolBarPanel.className = "toolbar-panel-button";
  toolBarPanel.innerHTML = '<i class="fa fa-home" aria-hidden="true"></i><br><span class="slide-menu-toolbar-label">Menu</span>';
  toolBarPanel.addEventListener('click', function(){
    document.location = home  + "?style=" + paramStyle;
  })
  toolbar.appendChild(toolBarPanel);
  toolBarPanel = document.createElement('li');
  toolBarPanel.className = "toolbar-panel-button";
  toolBarPanel.id = 'close';
  toolBarPanel.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><br><span class="slide-menu-toolbar-label">Fermer</span>';
  toolbar.appendChild(toolBarPanel);
  let panel = document.createElement('div');
  panel.className = "slide-menu-panel slide-menu-custom-panel active-menu-panel";

  if (useSection){
    let items = document.createElement('ul');
    items.className = 'slide-menu-items';
    panel.appendChild(items);
    selectAll('.slides > section').forEach(function(section, h) {
      let subsections = selectAll('section', section);
      if (subsections.length > 0) {
        subsections.forEach(function(subsection, v) {
          var type = (v === 0 ? 'slide-menu-item future' : 'slide-menu-item-vertical future');
          let item = generateItem(type, subsection);
          if (item)
            items.appendChild(item);
        });
      } else {
        let item = generateItem('slide-menu-item future', section);
        if (item)
          items.appendChild(item);
      }
    });
  } else {
    panel.innerHTML = content;
    selectAll('ul.slide-menu-items li.slide-menu-item', panel).forEach(function(item, i) {
      item.setAttribute('data-item', i+1);
      item.onclick = clicked;
      item.addEventListener("mouseenter", handleMouseHighlight);
    });
  }

  menu.appendChild(toolbar);
  menu.appendChild(panel);

  menuWrapper.appendChild(menu);
  document.body.prepend(menuWrapper);
}

function generateItem(type, section) {

  function text(selector, parent) {
    var el = (parent ? select(selector, section) : select(selector));
    if (el) return el.textContent;
    return null;
  }
  var title = section.getAttribute('data-menu-title') ||
    text('.menu-title', section);

  if (!title)
    return '';

  var item = create('li', {
    class: type
  });

  item.appendChild(create('i', {class: 'far fa-circle fa-fw future'}));

  let a = create('a', { "href" : '#' + section.id}, title);
  let span = create('span', {class: 'slide-menu-item-title'});
  span.appendChild(a);
  item.appendChild(span);

  item.addEventListener("mouseenter", handleMouseHighlight);
  item.addEventListener('click', clicked);

  return item;
}

function clicked(event) {
  if (event.target.nodeName !== "A") {
    event.preventDefault();
  }
  select('a', event.currentTarget).click();
}

function create(tagName, attrs, content) {
  var el = document.createElement(tagName);
  if (attrs) {
    Object.getOwnPropertyNames(attrs).forEach(function(n) {
      el.setAttribute(n, attrs[n]);
    });
  }
  if (content) el.innerHTML = content;
  return el;
}

function select(selector, el) {
  if (!el) {
    el = document;
  }
  if (selector)
    return el.querySelector(selector);
  return null;
}

function selectAll(selector, el) {
  if (!el) {
    el = document;
  }
  return Array.prototype.slice.call(el.querySelectorAll(selector));
}

function handleMouseHighlight(event) {
  selectAll('.active-menu-panel .slide-menu-items li.selected').forEach(function(i) {
    i.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

document.querySelectorAll('.boiteReponses').forEach(function(boiteReponse) {
  boiteReponse.addEventListener('click', toogleReponse);
});

/* */
const urlParams = new URLSearchParams(window.location.search);
const paramStyle = urlParams.get('style');
if (paramStyle == 'reveal'){
  document.write('<link rel="stylesheet" href="../../lib/reveal/css/reset.css">');
  document.write('<link rel="stylesheet" href="../../lib/reveal/css/reveal.css">');
  document.write('<link rel="stylesheet" href="../../lib/reveal/css/theme/white.css">');
  document.write('<link rel="stylesheet" href="../../lib/reveal/plugin/title-footer/title-footer.css">');
  document.write('<link rel="stylesheet" href="../../lib/reveal/lib/css/monokai.css">');
  document.write('<link rel="stylesheet" href="../../commun/styles-reveal.css">');
  let link = document.createElement( 'link' );
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = window.location.search.match( /print-pdf/gi ) ? '../../lib/reveal/css/print/pdf.css' : '../../lib/reveal/css/print/paper.css';
  document.getElementsByTagName( 'head' )[0].appendChild( link );
} else {
  document.write('<link rel="stylesheet" href="../../lib/reveal/lib/css/monokai.css">');
  document.write('<link rel="stylesheet" href="../../lib/reveal/plugin/menu/menu.css">');
  document.write('<link rel="stylesheet" href="../../commun/styles-full.css">');
}
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};
