// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Quiz - Écrire de nombres",
        "main":    "<p>Vérifiez vos connaissances sur l'écriture des nombres</p>",
        "results": "<h5>Aller plus loin</h5><p>En construction</p>",
        "level1":  "Jeopardy Ready",
        "level2":  "Jeopardy Contender",
        "level3":  "Jeopardy Amateur",
        "level4":  "Jeopardy Newb",
        "level5":  "Stay in school, kid..." // no comma here
    },
    "questions": [
        {
            "q": "Parmi les propositions suivantes, laquelle est la représentation binaire de 761 ?",
            "a": [
                {"option": "11 1100 1101",      "correct": false},
                {"option": "11 1110 0101",     "correct": false},
                {"option": "10 0111 1001",      "correct": false},
                {"option": "10 1111 1001",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        },
     {
            "q": "En hexadécimal (base 16), quelle est la valeur de la différence CBD - BAC ?",
            "a": [
                {"option": "AB",      "correct": false},
                {"option": "TB",     "correct": false},
                {"option": "FF",      "correct": false},
                {"option": "111",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Correct !</span></p>",
            "incorrect": "<p><span>Incorrect !</span></p>" // no comma here
        }
    ]
};