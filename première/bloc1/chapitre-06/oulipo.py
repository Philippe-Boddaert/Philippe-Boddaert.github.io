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
    pass

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
    pass

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
    pass

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
    pass

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
    pass

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
    pass

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
    pass

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
    pass

# Partie preuve

# print("La pièce 0 est un tautogramme : ", est_tautogramme(Enquete.obtenir_piece(0)))


if __name__ == '__main__':
    import doctest
    doctest.testmod()