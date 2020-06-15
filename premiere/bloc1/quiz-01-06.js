// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Quiz !!",
        "main":    "",
        "results": "<h5>Learn More</h5><p>Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus.</p>",
        "level1":  "Jeopardy Ready",
        "level2":  "Jeopardy Contender",
        "level3":  "Jeopardy Amateur",
        "level4":  "Jeopardy Newb",
        "level5":  "Stay in school, kid..." // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "Le code ASCII permet de représenter en binaire les caractères alphanumériques. Quel est son principal inconvénient ?",
            "a": [
                {"option": "Il utilise beaucoup de bits.",      "correct": false},
                {"option": "Il ne différencie pas les majuscules des minuscules.",     "correct": false},
                {"option": "Il ne représente pas les caractères accentués.",      "correct": true},
                {"option": "Il n'est pas compatible avec la plupart des systèmes informatiques.",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> L'encodage ASCII a été créé pour la langue anglaise, exempt de caractères accentués.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.1'>Encodage ASCII</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "Quel est un avantage du codage UTF-8 par rapport au codage ASCII ?",
            "a": [
                {"option": "il permet de coder un caractère sur un octet au lieu de deux",               "correct": false},
                {"option": "il permet de coder les majuscules",   "correct": false},
                {"option": "il permet de coder tous les caractères",               "correct": true},
                {"option": "il permet de coder différentes polices de caractères", "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> L'encodage Unicode permet de représenter près de 2097152 caractères différents.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.3'>Encodage Unicode</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 3 - Multiple Choice, Multiple True Answers, Select All
            "q": "On considère les codes ASCII en écriture hexadécimale (en base 16). Le code ASCII de la lettre A est 0x41, celui de la lettre B est 0x42, celui de la lettre C est 0x43, etc. Quel est le code ASCII, en hexadécimal, de la lettre X (c'est la 24e lettre de l'alphabet usuel) ?",
            "a": [
                {"option": "0x58",           "correct": false},
                {"option": "0x64",                  "correct": true},
                {"option": "0x7A",  "correct": false},
                {"option": "0x88",          "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> Vous savez représenter un nombre entier dans différentes bases.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.1'>Encodage ASCII</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 4
            "q": "Laquelle de ces affirmations concernant le codage UTF-8 des caractères est vraie ?",
            "a": [
                {"option": "le codage UTF-8 est sur 7 bits",    "correct": false},
                {"option": "le codage UTF-8 est sur 8 bits",     "correct": false},
                {"option": "le codage UTF-8 est sur 1 à 4 octets",      "correct": true},
                {"option": "le codage UTF-8 est sur 8 octets",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> Le codage UTF-8 utilise un nombre variable d'octets pour représenter les caractères.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.3'>Encodage Unicode</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 5
            "q": "Parmi les noms suivants, lequel n'est pas celui d'une méthode d'encodage des caractères ?",
            "a": [
                {"option": "UTF-16",    "correct": false},
                {"option": "ASCII",     "correct": false},
                {"option": "Arial",     "correct": true},
                {"option": "Unicode",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> Arial est une police d'écriture et non un système d'encodage.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.1'>Contexte</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 6
            "q": "Parmi les caractères ci-dessous, lequel ne fait pas partie du code ASCII ?",
            "a": [
                {"option": "a",    "correct": false},
                {"option": "B",     "correct": false},
                {"option": "@",     "correct": false},
                {"option": "é",   "correct": true} // no comma here
            ],
            "correct": "<p><span>Correct !</span> l'encodage ASCII ne permet pas de représenter les caractères accentués.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.2'>Encodage ASCII</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 7
            "q": "Sur une page web qui s’affiche sur notre navigateur on peut lire : « En consÃ©quence, l'AssemblÃ©e Nationale reconnaÃ®t et dÃ©clare, en prÃ©sence [...] » Quelle peut être la cause des affichages étranges de cette page ?",
            "a": [
                {"option": "l'encodage des caractères n'est pas celui attendu par le navigateur",    "correct": true},
                {"option": "le texte original est en japonais",     "correct": false},
                {"option": "la taille des caractères n'est pas celui attendu par le navigateur",     "correct": false},
                {"option": "la connexion à Internet présente des coupures",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> L'encodage d'origine de la page est celle configurée par le navigateur sont différents.</p>",
            "incorrect": "<p>Consultez la partie <a href='#1.6.3'>Encodage ISO-8859-1</a> pour plus d'informations.</p>" // no comma here
        },
        { // Question 9
            "q": "Quel est le nombre minimum de bits qui permet de représenter les 26 lettres majuscules de l'alphabet ?",
            "a": [
                {"option": "4",    "correct": false},
                {"option": "5",     "correct": true},
                {"option": "25",     "correct": false},
                {"option": "26",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct !</span> L'encodage d'origine de la page est celle configurée par le navigateur sont différents.</p>",
            "incorrect": "<p>Consultez la partie <a href='02.html'>Représentation d'un entier relatif</a> pour plus d'informations.</p>" // no comma here
        } // no comma here
    ]
};
