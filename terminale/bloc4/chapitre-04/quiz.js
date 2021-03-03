// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Quiz - Programmation orientée objet",
        "main":    "<p>Vérifiez vos connaissances sur la programmation orientée objet</p>",
        "results": "<h5>Aller plus loin</h5><p>En construction</p>",
        "level1":  "Jeopardy Ready",
        "level2":  "Jeopardy Contender",
        "level3":  "Jeopardy Amateur",
        "level4":  "Jeopardy Newb",
        "level5":  "Stay in school, kid..." // no comma here
    },
    "questions": [
        {
            "q": "Comment appelle t-on le fait d'utiliser une \"classe\" pour créer un \"objet\" ?",
            "a": [
                {"option": "Surchage",      "correct": false},
                {"option": "Implémentation",     "correct": false},
                {"option": "Instanciation",      "correct": true},
                {"option": "Construction",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> L'instanciation est l'opération qui consiste à créer un exemplaire d'une classe.</p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
            "q": "Un attribut est...",
            "a": [
                {"option": "une caractéristique d'un objet, par exemple la taille d'un bateau",               "correct": true},
                {"option": "une fonctionnalité de mon programme",   "correct": false},
                {"option": "un paramètre d'une fonction",               "correct": false},
                {"option": "une variable globale à un programme", "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> Un attribut est une caractéristique d'un objet.</p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
            "q": "Une méthode est...",
            "a": [
                {"option": "un guide commun à toutes les actions réalisées par mon programme et qui les aide à se coordonner.",               "correct": false},
                {"option": "une action réalisée par un objet",   "correct": true},
                {"option": "une fonction qui renvoie toujours un résultat",               "correct": false},
                {"option": "une fonction qui renvoie aucun résultat", "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> Une méthode est une procédure ou fonction qui s'applique sur un objet.</p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "En programmation orientée objet, un objet est...",
          "a": [
              {"option": "un ensemble d'atomes que je peux, moi, humain, déplacer de mes propres mains.",               "correct": false},
              {"option": "un concept qui représente un ensemble de données et qui en contrôle l'accès.",   "correct": true}
          ],
          "correct": "<p><span>Correct !</span> Un objet est un conteneur logiciel qui contient les informations et les mécanismes en rapport avec un objet concret ou abstrait.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "Une classe a des attributs et des méthodes",
          "a": [
              {"option": "Vrai",               "correct": true},
              {"option": "Faux",   "correct": false}
          ],
          "correct": "<p><span>Correct !</span> Une classe définit l'ensemble des attributs et méthodes d'un objet.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "Une classe est :",
          "a": [
              {"option": "une salle dans laquelle se réunissent les élèves apprenant à coder.",               "correct": false},
              {"option": "la représentation d'un objet en programmation",   "correct": true}
          ],
          "correct": "<p><span>Correct !</span> Une classe est l'implantation d'un objet réel ou abstrait.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "Pour créer la classe Fruit, vous écrivez :",
          "a": [
              {"option": "class Fruit:",               "correct": true},
              {"option": "class Fruit()",   "correct": false},
              {"option": "class Fruit():",               "correct": false},
              {"option": "class Fruit",   "correct": false}
          ],
          "correct": "<p><span>Correct !</span> On utilise le mot clé `class` suivi du nom de la classe.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "La méthode __init__ d'une classe est : ",
          "a": [
              {"option": "le constructeur de la classe",               "correct": true},
              {"option": "l'initiateur de la classe",   "correct": false},
              {"option": "l'instance de la classe",               "correct": false},
              {"option": "une fonction de la classe",   "correct": false}
          ],
          "correct": "<p><span>Correct !</span> la méthode __init__ est le constructeur de la classe.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "Créer l'instance d'une classe s'écrit ainsi :",
          "a": [
              {"option": "banane = fruit",               "correct": false},
              {"option": "banane = Fruit",   "correct": false},
              {"option": "banane = Fruit()",               "correct": true},
              {"option": "banane = fruit()",   "correct": false}
          ],
          "correct": "<p><span>Correct !</span> Pour instancier un objet, on appelle le constructeur de la classe.</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
        {
          "q": "Vous pouvez créer autant d'instances que vous le souhaitez.",
          "a": [
              {"option": "Vrai",               "correct": true},
              {"option": "Faux",   "correct": false}
          ],
          "correct": "<p><span>Correct !</span> Il est possible de créer autant d'instance d'une classe que l'on souhaite (dans la limite de la capacité de mémoire disponible).</p>",
          "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        }
    ]
};
