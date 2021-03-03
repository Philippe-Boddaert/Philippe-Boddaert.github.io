#! /usr/bin/env python3
# -*- coding : utf-8 -*-
# Author : Philippe BODDAERT
# Date : 19/12/2020
# License : CC-BY-NC-SA
''' TP sur les tableaux '''

from random import randint

def indice(tableau, element):
    '''
    Indique l'indice où se situe l'élément dans le tableau
    :param tableau: (list) un tableau
    :param element: (any) un élément
    :return: (int) le premier indice de l'élément dans le tableau, None sinon
    :doctest:
        >>> indice([0, 1, 2, 3], 1)
        1
        >>> indice([], 1) is None
        True
        >>> indice([3, 2, 0, 1], 1)
        3
        >>> indice([3, 2, 1, 1], 1)
        2
    '''
    i = 0
    while i < len(tableau) and tableau[i] != element:
        i += 1
    if i == len(tableau):
        return None
    return i

def indices(tableau, element):
    '''
    Indique les indices où se situent l'élément dans le tableau
    :param tableau: (list) un tableau
    :param element: (any) un élément
    :return: (list) les indices de l'élément dans le tableau
    :doctest:
        >>> indices([0, 1, 2, 3], 1)
        [1]
        >>> indices([], 1)
        []
        >>> indices([3, 2, 0, 1], 1)
        [3]
        >>> indices([3, 1, 2, 1], 1)
        [1, 3]
    '''
    i = []
    for j in range(len(tableau)):
        if tableau[j] == element:
            i.append(j)
    return i

def est_present(tableau, element):
    '''
    Indique si l'élément est dans la liste
    :param tableau: (list) un tableau
    :param element: (any) un élément
    :return: (bool) True si l'élément est dans la liste, False sinon
    :doctest;
        >>> est_present([0, 1, 2, 3], 1)
        True
        >>> est_present([], 1)
        False
        >>> est_present(['Belgique', 'Pays-Bas', 'Luxembourg'], 'France')
        False
        >>> est_present([3, 2, 1, 1], 1)
        True
    '''
    return indice(tableau, element) is not None

def compte(tableau, element):
    '''
    Compte le nombre d'occurrences de l'élément dans le tableau
    :param tableau: (list) Un tableau
    :param element: (any) un élément
    ;return: (int) le nombre d'occurrences de l'élément dans le tableau
    :doctest:
        >>> compte([], 1)
        0
        >>> compte([1], 1)
        1
        >>> compte([0], 1)
        0
        >>> compte([1, 0, 1, 0], 1)
        2
    '''
    occurrences = 0
    for x in tableau:
        if x == element:
            occurrences += 1
    return occurrences

def inverser(tableau):
    '''
    Inverse les éléments du tableau
    :param tableau: (list) un tableau
    :doctest:
        >>> t = [1, 2, 3]
        >>> inverser(t)
        >>> t
        [3, 2, 1]
        >>> t = ['b', 'o', 'n', 'j', 'o', 'u', 'r']
        >>> inverser(t)
        >>> t
        ['r', 'u', 'o', 'j', 'n', 'o', 'b']
    '''
    debut = 0
    fin = len(tableau) - 1
    
    while debut < fin:
        tableau[debut], tableau[fin] = tableau[fin], tableau[debut]
        debut += 1
        fin -= 1

def dedoublonner(tableau):
    '''
    Renvoie un tableau sans doublant
    :param tableau: (list) un tableau
    :return: (list) le tableau sans doublon
    :doctest:
        >>> dedoublonner([1, 1, 1, 1])
        [1]
        >>> dedoublonner([1, 2, 3, 4])
        [1, 2, 3, 4]
        >>> dedoublonner([1, 2, 1, 4])
        [1, 2, 4]
    '''
    resultat = []
    for element in tableau:
        if not est_present(resultat, element):
            resultat.append(element)
    return resultat

def somme(tableau):
    '''
    Calcule la somme des éléments du tableau
    :param tableau: (list) une tableau
    :return: (int) la somme
    :doctest:
        >>> somme([1, 2, 3])
        6
        >>> somme([1, -2, 3])
        2
        >>> somme([])
        0
    '''
    _somme = 0
    for element in tableau:
        _somme += element
    return _somme

def moyenne(tableau):
    '''
    Calcule la moyenne des éléments du tableau
    :param tableau: (list) un tableau
    :return: (float) la moyenne des éléments du tableau
    :doctest:
        >>> moyenne([1, 1, 1])
        1.0
        >>> moyenne([1, 2, 3])
        2.0
        >>> moyenne([])
        Traceback (most recent call last):
        ...
        ZeroDivisionError: division by zero
    '''
    return somme(tableau) / len(tableau)

def maximum(tableau):
    '''
    Trouve l'élément avec la valeur maximale du tableau
    :param tableau: (list) un tableau
    :return: (int) l'élément de valeur maximale
    :doctest:
        >>> maximum([1, 2, 3])
        3
        >>> maximum([-1, -2, -3])
        -1
        >>> maximum([]) is None
        True
    '''
    if len(tableau) == 0:
        return None
    max = tableau[0]
    for element in tableau:
        if element > max:
            max = element
    return max

def taille(tableau):
    '''
    Indique la taille d'un tableau
    :param tableau: (list) un tableau
    :return: (int) le nombre d'éléments du tableau
    :doctest:
        >>> taille([])
        0
        >>> taille([1])
        1
        >>> taille([1 for _ in range(10)])
        10
    '''
    n = 0
    while tableau != []:
        del tableau[0]
        n += 1
    return n

def tranche(tableau, debut, fin):
    '''
    Obtient une tranche du tableau
    :param tableau: (list) un tableau
    :param debut: (int) l'indice du début de la tranche
    :param fin: (int) l'indice de fin de la tranche
    :return: (list) un tableau contenant les éléments entre début et fin non inclus
    :doctest:
        >>> tranche([ i for i in range(10)], 0, 10)
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        >>> tranche([ i for i in range(10)], 0, 5)
        [0, 1, 2, 3, 4]
        >>> tranche([ i for i in range(10)], 5, 10)
        [5, 6, 7, 8, 9]
    '''
    sous_tableau = []
    for i in range(debut, fin):
        sous_tableau.append(tableau[i])
    return sous_tableau

def aleatoire(n, min, max):
    '''
    Obtient un tableau de n éléments aléatoire dont les valeurs sont comprises entre min et max
    :param n: (int) le nombre d'éléments du tableau
    :param min: (int) la valeur minimale
    :param max: (int) la valeur maximale
    :return: (list) un tableau de n éléments de valeurs aléatoires
    '''
    return [ randint(min, max) for _ in range(n)]

def ligne(matrice, indice):
    '''
    Obtient un tableau comportant l'ensemble des valeurs de la ligne indice de la matrice
    :param matrice: (list) une matrice
    :param indice: (int) un entier
    :return: (list) un tableau de valeurs de la ligne indice
    :doctest:
        >>> ligne([[1, 2],[3, 4]], 0)
        [1, 2]
        >>> ligne([[1, 2],[3, 4]], 1)
        [3, 4]
    '''
    return matrice[indice]

def colonne(matrice, indice):
    '''
    Obtient un tableau comportant l'ensemble des valeurs de la colonne indice de la matrice
    :param matrice: (list) une matrice
    :param indice: (int) un entier
    :return: (list) un tableau de valeurs de la colonne indice
    :doctest:
        >>> colonne([[1, 2],[3, 4]], 0)
        [1, 3]
        >>> colonne([[1, 2],[3, 4]], 1)
        [2, 4]
    '''
    return [ matrice[i][indice] for i in range(len(matrice[0]))]

def afficher(matrice):
    '''
    Affiche les éléments d'une matrice
    :param matrice: (list) une matrice
    '''
    for tableau in matrice:
        for element in tableau:
            print(element, end='')
        print('')

def diagonale_nord_ouest(matrice):
    '''
    Obtient les valeurs de la diagonale de la matrice, dont l'origine est la valeur correspondant à l'indice [0][0]
    :param matrice: (list) une matrice
    :return: (list) un tableau de valeurs de la diagonale
    :doctest:
        >>> diagonale_nord_ouest([[1, 2], [3, 4]])
        [1, 4]
        >>> diagonale_nord_ouest([['A', 'D', 'C'], ['B', 'F', 'E'], ['H', 'I', 'G']])
        ['A', 'F', 'G']
    '''
    return [matrice[i][i] for i in range(0, len(matrice))]

def diagonale_nord_est(matrice):
    '''
    Obtient les valeurs de la diagonale de la matrice, dont l'origine est la valeur correspondant à l'indice [0][len(matrice) - 1]
    :param matrice: (list) une matrice
    :return: (list) un tableau de valeurs de la diagonale
    :doctest:
        >>> diagonale_nord_est([[1, 2], [3, 4]])
        [2, 3]
        >>> diagonale_nord_est([['A', 'D', 'C'], ['B', 'F', 'E'], ['H', 'I', 'G']])
        ['C', 'F', 'H']
    '''
    return [matrice[i][len(matrice[0]) - 1 - i] for i in range(0, len(matrice))]

def est_magique(matrice):
    '''
    Indique si le carré est magique ou non
    :param matrice: (list) un carré d'entiers
    :return: (bool) True si les sommes de chaque ligne, colonne et diagonale sont égales.
    :doctest:
        >>> est_magique([[2, 7, 6], [9, 5, 1], [4, 3, 8]])
        True
        >>> est_magique([[2, 7, 6], [9, 1, 5], [4, 3, 8]])
        False
        >>> est_magique([[16, 3, 2, 13], [5, 10, 11, 8], [9, 6, 7, 12], [4, 15, 14, 1]])
        True
    '''
    constante = somme(matrice[0])
    return (
        all([somme(ligne(matrice, i)) == constante for i in range(1, len(matrice))]) and
        all([somme(colonne(matrice, i)) == constante for i in range(0, len(matrice[0]))]) and
        somme(diagonale_nord_ouest(matrice)) == constante and
        somme(diagonale_nord_est(matrice)) == constante
    )

def est_magique_lettres(matrice):
    '''
    Indique si une matrice de caractères est un carré magique ou non
    :param matrice: (list) une matrice de caractères
    :return: (bool) True si la matrice est un carré magique de lettres, False sinon
    :doctest:
        >>> est_magique_lettres([['T', 'E', 'L'], ['E', 'T', 'E'], ['L', 'E', 'S']])
        True
        >>> est_magique_lettres([['T', 'E', 'L'], ['E', 'R', 'E'], ['L', 'A', 'S']])
        False
        >>> est_magique_lettres([['S', 'A', 'T', 'O', 'R'], ['A', 'R', 'E', 'P', 'O'], ['T', 'E', 'N', 'E', 'T'], ['O', 'P', 'E', 'R', 'A'], ['R', 'O', 'T', 'A', 'S']])
        True
    '''
    return all([ ligne(matrice, i) == colonne(matrice, i) for i in range(len(matrice))])

def miroir_vertical(matrice):
    '''
    Applique l'effet miroir par rapport à l'axe vertical sur une matrice
    :param matrice: (list) une matrice
    :doctest:
        >>> matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        >>> miroir_vertical(matrice)
        >>> matrice
        [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
        >>> matrice = [['⚫', '⚪', '⚫'], ['⚪', '⚪', '⚫'], ['⚪', '⚫', '⚪']]
        >>> miroir_vertical(matrice)
        >>> matrice
        [['⚫', '⚪', '⚫'], ['⚫', '⚪', '⚪'], ['⚪', '⚫', '⚪']]
    '''
    for tableau in matrice:
        inverser(tableau)

def miroir_horizontal(matrice):
    '''
    Applique l'effet miroir par rapport à l'axe horizontal sur une matrice
    :param matrice: (list) une matrice
    :doctest:
        >>> matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        >>> miroir_horizontal(matrice)
        >>> matrice
        [[7, 8, 9], [4, 5, 6], [1, 2, 3]]
        >>> matrice = [['⚫', '⚪', '⚫'], ['⚪', '⚪', '⚫'], ['⚪', '⚫', '⚪']]
        >>> miroir_horizontal(matrice)
        >>> matrice
        [['⚪', '⚫', '⚪'], ['⚪', '⚪', '⚫'], ['⚫', '⚪', '⚫']]
    '''
    inverser(matrice)

def rotation_horaire(matrice):
    '''
    :param matrice: (list) une matrice
    :doctest:
        >>> matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        >>> rotation_horaire(matrice)
        [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
        >>> matrice = [['⚫', '⚪', '⚫'], ['⚪', '⚪', '⚫'], ['⚪', '⚫', '⚪']]
        >>> rotation_horaire(matrice)
        [['⚪', '⚪', '⚫'], ['⚫', '⚪', '⚪'], ['⚪', '⚫', '⚫']]
    '''
    resultat = []
    for i in range(len(matrice[0])):
        resultat.append(colonne(matrice, i))
    miroir_vertical(resultat)
    return resultat

def rotation_anti_horaire(matrice):
    '''
    :param matrice: (list) une matrice
    :doctest:
        >>> matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        >>> rotation_anti_horaire(matrice)
        [[3, 6, 9], [2, 5, 8], [1, 4, 7]]
        >>> matrice = [['⚫', '⚪', '⚫'], ['⚪', '⚪', '⚫'], ['⚪', '⚫', '⚪']]
        >>> rotation_anti_horaire(matrice)
        [['⚫', '⚫', '⚪'], ['⚪', '⚪', '⚫'], ['⚫', '⚪', '⚪']]
    '''
    resultat = []
    for i in range(len(matrice[0]) - 1, -1, -1):
        resultat.append(colonne(matrice, i))
    return resultat

if __name__ == '__main__':
    import doctest
    doctest.testmod()