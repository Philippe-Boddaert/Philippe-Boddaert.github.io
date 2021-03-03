#!/usr/bin/env python3
# Author : Philippe BODDAERT
# Date : 19/12/2020
# License : CC-BY-NC-SA

from enquete import Enquete

def est_anagramme(mot1, mot2):
    '''
    Indique si 2 mots sont anagrammes l'un de l'autre
    ;param mot1: (str) un mot
    :param mot2: (str) un mot
    ;return: (bool) True si les 2 mots sont anagrammes, False sinon
    :doctest:
        >>> est_anagramme('set', 'tes')
        True
        >>> est_anagramme('se', 'te')
        False
    '''
    return sorted(mot1) == sorted(mot2)

def est_anaphrase(phrase):
    '''
    Indique si une phrase est une anaphrase, i.e contenant des anagrammes
    :param phrase: (str) une phrase
    :return: (bool) True si la phrase contient au moins un anagramme, False sinon
    :doctest:
        >>> est_anaphrase('le catcheur charcute son adversaire')
        True
        >>> est_anaphrase('les problèmes de gnosie ça se soigne')
        True
        >>> est_anaphrase('Claudel, voilà une chose qui me fait bien prier')
        False
    '''
    resultat = False
    mots = phrase.split(' ')
    for i in range(len(mots) - 1):
        for j in range(i + 1, len(mots)):
            if est_anagramme(mots[i], mots[j]):
                resultat = True
    return resultat

def est_lipogramme(phrase, lettre):
    '''
    Indique si le mot est un lipogramme,i.e la lettre est exclue du mot
    :param phrase: (str) un mot
    :param lettre: (str) une lettre
    :doctest:
        >>> est_lipogramme('Là où nous vivions jadis', 'e')
        True
        >>> est_lipogramme('Là où nous vivions jadis', 'a')
        False
        >>> est_lipogramme('Son cœur est encore exempt de trouble et nul homme ne lui semble mériter ni distinction ni préférence', 'a')
        True
    '''
    return lettre not in phrase

def est_pangramme(phrase):
    '''
    Indique si la chaine est un pangramme,i.e contient toutes les letres de l'alphabet
    :param phrase: (str) une phrase
    :return: (bool) True si la phrase est un pangramme, False sinon
    :doctest:
        >>> est_pangramme("Portez ce vieux whisky au juge blond qui fume")
        True
        >>> est_pangramme("Voyez le brick géant que j'examine près du wharf")
        True
        >>> est_pangramme("cette phrase est-elle un pangramme ?")
        False
    '''
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    lettres = set()
    for lettre in phrase:
        lettres.add(lettre.lower())
    nombre = 0
    for lettre in lettres:
        if lettre in alphabet:
            nombre += 1
    return nombre == len(alphabet)

def est_palindrome(phrase):
    '''
    Indique si le mot est un palindrome, i.e peut se lire dans les 2 sens
    :param phrase: (str) une phrase
    :return: (bool) True si la phrase est un palindrome, False sinon
    ;doctest:
        >>> est_palindrome('lol')
        True
        >>> est_palindrome('kayak')
        True
        >>> est_palindrome('été')
        True
        >>> est_palindrome('Caserne, genre sac')
        True
        >>> est_palindrome('palindrome')
        False
    '''
    minuscule = phrase.replace(' ', '').replace("'",'').replace(',','').lower()
    debut = 0
    fin = len(minuscule) - 1
    while debut < fin and minuscule[debut] == minuscule[fin]:
        debut += 1
        fin -= 1
    return debut >= fin

def est_tautogramme(phrase):
    '''
    Indique si la phrase est un tautogramme, i.e dont tous les mots commencent par la même lettre
    :param phrase: (str) une phrase
    :return: (bool) True si tous les mots de la phrase commencent par la même lettre, False sinon
    :doctest:
        >>> est_tautogramme('Veni vidi Vici')
        True
        >>> est_tautogramme('Bonjour ami lycéen')
        False
    '''
    mots = phrase.lower().split(' ')
    premier_mot = mots[0]
    premiere_lettre = premier_mot[0]
    i = 1
    while i < len(mots) and mots[i][0] == premiere_lettre:
        i += 1
    return i == len(mots)

def est_monoconsonnantisme(phrase, consonne):
    '''
    Indique si la phrase est un monoconsonnantisme, i.e qu'elle utilise une seule consonne
    :param phrase: (str) une phrase
    :param consonne: (str) la consonne
    :return: (bool) True si une seule consonne est utilisée, False sinon
    :doctest:
        >>> est_monoconsonnantisme('Nian-nian', 'n')
        True
        >>> est_monoconsonnantisme('gnangnan', 'n')
        False
        >>> est_monoconsonnantisme('Gag gogo', 'g')
        True
    '''
    consonnes = 'bcdfghjklmnpqrstvwxz'
    for lettre in phrase:
        minuscule = lettre.lower()
        if minuscule in consonnes and consonne != minuscule:
            return False
    return True

def est_surdefinition(phrase, mot):
    '''
    Indique si la phrase est une surdéfinition, i.e que la phrase contient le mot qu'elle définit
    :param phrase: (str) une phrase
    :param mot: (str) le mot défini
    :return: (bool) True si la phrase est une surdéfinition, False sinon
    :doctest:
        >>> est_surdefinition("un proche qui fait partie de la famille", 'ami')
        True
        >>> est_surdefinition("limite de l'infini", 'Fini')
        True
        >>> est_surdefinition("définition qui ne contient pas le mot", 'eRReur')
        False
    '''
    return mot.lower() in phrase.lower()

# Partie preuve

print("La pièce 0 est un tautogramme : ", est_tautogramme(Enquete.obtenir_piece(0)))
print("La pièce 1 est un tautogramme : ", est_tautogramme(Enquete.obtenir_piece(1)))
print("La pièce 2 est un lipogramme en 'a' : ", est_lipogramme(Enquete.obtenir_piece(2), 'a'))
print("La pièce 4 est un lipogramme en 'e' : ", est_lipogramme(Enquete.obtenir_piece(4), 'e'))
print("La pièce 5 est un lipogramme en 'a' : ", est_lipogramme(Enquete.obtenir_piece(5), 'a'))
print("La pièce 6 est un lipogramme en 'u' : ", est_lipogramme(Enquete.obtenir_piece(6), 'u'))
print("La pièce 7 est un monoconsonnantisme en 'm' : ", est_monoconsonnantisme(Enquete.obtenir_piece(7), 'm'))
print("La pièce 8 est un monoconsonnantisme en 't' : ", est_monoconsonnantisme(Enquete.obtenir_piece(8), 't'))
print("La pièce 9 est une surdéfinition d'abri : ", est_surdefinition(Enquete.obtenir_piece(9), 'abri'))
print("La pièce 10 est une surdéfinition d'émoi : ", est_surdefinition(Enquete.obtenir_piece(10), 'émoi'))
print("La pièce 11 est une surdéfinition de leçon : ", est_surdefinition(Enquete.obtenir_piece(11), 'leçon'))
print("La pièce 12 est un pangramme : ", est_pangramme(Enquete.obtenir_piece(12)))
print("La pièce 13 est un pangramme : ", est_pangramme(Enquete.obtenir_piece(13)))
print("La pièce 14 est un lipogramme en 'e' : ", est_lipogramme(Enquete.obtenir_piece(14), 'e'))
print("La pièce 15 est un lipogramme en 'i' : ", est_lipogramme(Enquete.obtenir_piece(15), 'i'))
print("La pièce 16 est un palindrome : ", est_palindrome(Enquete.obtenir_piece(16)))
print("La pièce 17 est un palindrome : ", est_palindrome(Enquete.obtenir_piece(17)))


if __name__ == '__main__':
    import doctest
    doctest.testmod()