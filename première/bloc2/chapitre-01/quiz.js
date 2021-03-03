// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Quiz - Tableaux",
        "main":    "<p>Vérifiez vos connaissances sur les tableaux</p>",
        "results": "<h5>Aller plus loin</h5><p>En construction</p>",
        "level1":  "Jeopardy Ready",
        "level2":  "Jeopardy Contender",
        "level3":  "Jeopardy Amateur",
        "level4":  "Jeopardy Newb",
        "level5":  "Stay in school, kid..." // no comma here
    },
    "questions": [{
            "q": "Dans un tableau, on accède à un élément par ?",
            "a": [
                {"option": "son indice",      "correct": true},
                {"option": "sa valeur",     "correct": false},
                {"option": "son numéro",      "correct": false},
                {"option": "sa clé",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        }, {
            "q": "Qu'est-ce qu'un type de données <b>mutable</b> ?",
            "a": [
                {"option": "une structure dont on peut modifier les valeurs",      "correct": true},
                {"option": "une structure dotée de pouvoirs spéciaux",     "correct": false},
                {"option": "une structure sous forme de table",      "correct": false},
                {"option": "une structure dont on ne peut pas modifier les valeurs ",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        }, {
            "q": "Parmi les propositions suivantes, laquelle permet de récupérer le 2ème élément du tableau suivant : $t = [2, 0, 4, 5, 8]$ ?",
            "a": [
                {"option": "$t[0]$",      "correct": false},
                {"option": "$t[1]$",     "correct": true},
                {"option": "$t[2]$",      "correct": false},
                {"option": "$t(1)$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Soit le tableau $t = [2, 0, 4, 5, 8]$, quelle est la valeur renvoyée par l'instruction $t[4]$ ?",
            "a": [
                {"option": "$4$",      "correct": false},
                {"option": "$8$",     "correct": true},
                {"option": "$5$",      "correct": false},
                {"option": "$t[4]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Quelles sont les valeurs du tableau créé par l'instruction suivante : <br /><center>[ $i * i$ for $i$ in range($10$) ]</center>",
            "a": [
                {"option": "$[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]$",      "correct": true},
                {"option": "$[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]$",     "correct": false},
                {"option": "$[0, 1, 2, 4, 8, 16, 32, 64, 128, 256]$",      "correct": false},
                {"option": "$[i, i, i, i, i, i, i, i, i, i]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Quelle instruction permet d'obtenir le tableau avec les valeurs $[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]$ ?",
            "a": [
                {"option": "[ $i$ for $i$ in range($10, 0, -1$) ]",      "correct": true},
                {"option": "[ $10 - i$ for $i$ in range($10$) ]",     "correct": true},
                {"option": "[ $-i$ for $i$ in range($10$) ]",      "correct": false},
                {"option": "[ $j$ for $i$ in range($10$) ]",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Quelle est l'instruction permettant de déclarer la matrice <br/>$A$ suivante <center>$$\\begin{equation*}\\begin{pmatrix} -1 & 4 \\\\ 8 & 3 \\\\ 9 & 6 \\end{pmatrix}\\end{equation*}$$</center> ",
            "a": [
                {"option": "$A = [[-1, 4], [8, 3], [9, 6]]$",      "correct": true},
                {"option": "$A = [[-1, 8, 9], [4, 3, 6]]$",     "correct": false},
                {"option": "$A = [-1, 4, 8, 3, 9, 6]$",      "correct": false},
                {"option": "$A = [-1, 4], [8, 3], [9, 6]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Soit la matrice $A = $  $$\\begin{equation*}\\begin{pmatrix} -1 & 4 \\\\ 8 & 3 \\\\ 9 & 6 \\end{pmatrix}\\end{equation*}$$, quelle valeur renvoie l'instruction $A[1]$ ?",
            "a": [
                {"option": "$[8, 3]$",      "correct": true},
                {"option": "$4$",     "correct": false},
                {"option": "$[-1, 4]$",      "correct": false},
                {"option": "$[8]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Quelle est la valeur renvoyée par l'instruction $[3, 1, 2] + [4, 8, 5]$?",
            "a": [
                {"option": "$[3, 1, 2, 4, 8, 5]$",      "correct": true},
                {"option": "$[7, 9, 7]$",     "correct": false},
                {"option": "$[4, 8, 5, 3, 1, 2]$",      "correct": false},
                {"option": "$[1, 2, 3, 4, 5, 8]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },{
            "q": "Soit le tableau $t = [4, 8, 5, 3, 1, 2]$. Quelles sont les valeurs de $t$ après exécution de l'instruction `del t[4]`?",
            "a": [
                {"option": "$t = [4, 8, 5, 3, 2]$",      "correct": true},
                {"option": "$t = [8, 5, 3, 1, 2]$",     "correct": false},
                {"option": "$t = [1, 2]$",      "correct": false},
                {"option": "$t = [4, 8]$",     "correct": false}
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        } ]
};