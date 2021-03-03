import math ,random #line:1
def obtenir_tresor (O00O0O0O0O00O0OOO ):#line:3
    '''
    Obtient un trésor de n pièces
    :param n: (int) le nombre de pièces du trésor
    :CU: n >= 2
    :return: (list) un trésor, sous la forme d'un tableau de n pièces, avec n - 1 bonnes pièces et 1 fausse pièce. Sachant que la fausse pièce est placée aléatoirement dans le tableau.
    '''#line:9
    OO0OOOOOO00O000O0 =[chr (0x26AB )for _OO000000O0O00OOOO in range (O00O0O0O0O00O0OOO )]#line:10
    OO0OOOOOO00O000O0 [random .randint (0 ,O00O0O0O0O00O0OOO -1 )]=chr (0x26AA )#line:11
    return OO0OOOOOO00O000O0 #line:12
def peser_tas (OO0000O00OOOO0OO0 ,O0OOO0O0O0O0OO00O ):#line:14
    '''
    Pèse 2 tas du même nombre de pièces.
    :param tas1: (list) un tas de p pièces 
    :param tas2: (list) un tas de p pièces 
    :return: (int) un entier négatif si tas1 est plus léger que tas2, un entier positif si tas2 est plus léger que tas1, 0 si les 2 tas ont un poids égal
    '''#line:20
    print ('Pesée entre 2 tas de tailles : ',len (OO0000O00OOOO0OO0 ))#line:21
    return sum ([1 if ord (O0O0OOOO0000OO000 )==0x26AB else 0 for O0O0OOOO0000OO000 in OO0000O00OOOO0OO0 ])-sum ([1 if ord (OOOO00OO000OOOO00 )==0x26AB else 0 for OOOO00OO000OOOO00 in O0OOO0O0O0O0OO00O ])#line:22
def decoupe_tas (O00O0000OO0O00O00 ):#line:24
    '''
    Découpe un tas en 3 tas, dont les 2 premiers ont le même nombre de pièces
    :param t: (list) un tas de p pièces
    :return t1, t2, t3 : (tuple) 3 tas de pièces, avec len(t1)==len(t2) et len(t1) + len(t2) + len(t3) = p
    '''#line:29
    if len (O00O0000OO0O00O00 )==2 :#line:30
        return (O00O0000OO0O00O00 [0 :1 ],O00O0000OO0O00O00 [1 :],[])#line:31
    else :#line:32
        OO0O00OO0OO0OO000 =len (O00O0000OO0O00O00 )//3 #line:33
        return (O00O0000OO0O00O00 [0 :OO0O00OO0OO0OO000 ],O00O0000OO0O00O00 [OO0O00OO0OO0OO000 :2 *OO0O00OO0OO0OO000 ],O00O0000OO0O00O00 [2 *OO0O00OO0OO0OO000 :])#line:34