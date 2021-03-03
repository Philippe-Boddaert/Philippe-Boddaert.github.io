#!/usr/bin/env python3
# Author : Philippe BODDAERT
# Date : 20/12/2020
# License : CC-BY-NC-SA

class Enquete(object):
    
    PIECES = { 0 : 'aide', 1 : 'Chapitre 155', 2 : 'Curieux voyage autour du monde', 3 : 'Horace', 4 : 'La disparition', 5 : 'Les revenentes', 6 : 'Cheval affamé', 7 : 'Mamamia', 8 : 'Tatata', 9 : 'abri', 10 : 'émoi', 11 : 'leçon', 12 : 'clown', 13 : 'renard', 14 : 'autobus', 15 : 'le chat et le rat', 16 : 'la horde', 17 : 'debord'}
    
    def __init__(self):
        pass
    
    @staticmethod
    def obtenir_piece(identifiant):
        '''
        Obtient une pièce à conviction
        :param identifiant: (int) l'identifiant de la pièce
        :return: (str) Une pièce à conviction
        :doctest:
            >>> piece = Enquete.obtenir_piece(1)
            >>> type(piece) is str
            True
            >>> piece = Enquete.obtenir_piece(-1)
            Traceback (most recent call last):
            ...
            Exception: La pièce avec l'identifiant -1 est inconnue.
        '''
        if identifiant not in Enquete.PIECES:
            raise Exception(f'La pièce avec l\'identifiant {str(identifiant)} est inconnue.')
        with open('./textes/' + Enquete.PIECES[identifiant] + '.txt', 'r') as f:
            return f.read()

if __name__ == '__main__':
    import doctest
    doctest.testmod()
         
        