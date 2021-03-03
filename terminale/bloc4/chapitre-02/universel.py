#! /usr/bin/env python3
# -*- coding : utf-8 -*-
# Author : Philippe BODDAERT
# Date : 09/01/2021
''' Module qui permet d'exécuter toute fonction sous forme d'une chaine de caractères '''

programme = 'def euclide(a,b):\n\tif a < b: a,b=b,a\n\twhile b: a,b=b,a%b\n\treturn a'

def universel(programme, *args):
    '''
    Exécute la fonction avec ses paramètres
    :param programme: (str) corps d'un programme sous la forme d'une chaine de caractère
    :param args: (tuple) un ensemble de paramètres
    :return: (any) résultat de l'exécution du programme avec ses paramètres
    '''
    exec(programme)
    ligne1 = programme.split('\n')[0]
    nom = ligne1.split('(')[0][4:]
    return eval(f"{nom}{args}")