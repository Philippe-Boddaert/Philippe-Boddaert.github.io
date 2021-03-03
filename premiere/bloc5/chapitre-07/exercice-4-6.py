import pygame, random
pygame.init()
pygame.font.init()

myfont = pygame.font.SysFont('Arial', 20)

COLORS = ((255, 0, 0), (0, 255, 0), (0, 0, 255))

screen = pygame.display.set_mode((360, 240))
mouse = (0, 0)

target = pygame.Rect((180, 120), (64, 64))

color = 0
clock = pygame.time.Clock()
frame = 0
score = 0
countdown = 30
start = pygame.time.get_ticks()
finished = False

virus = pygame.image.load(r'assets/virus.png')
seringue = pygame.image.load(r'assets/seringue.png')
seringue = pygame.transform.scale(pygame.transform.rotate(seringue, -90), (64, 64))

pygame.mouse.set_visible(False)

while True:
    clock.tick(30)

    screen.fill((255, 255, 255))
    for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    quit()
            elif event.type == pygame.MOUSEMOTION:
                mouse = event.pos

    time = countdown - ((pygame.time.get_ticks() - start) // 1000)
    if time <= 0:
        finished = True

    if finished:
        textsurface = myfont.render(f'Perdu !!!! Score : {score}', False, (255, 0, 0))
        screen.blit(textsurface,(10, 10))
    else:
        if target.width > 1:
            target.inflate_ip(-1, -1)
        else:
            finished = True

        if target.collidepoint(mouse):
            target.inflate_ip(64 - target.width, 64 - target.height)
            new_coordonnees = (random.randint(0, 360 - target.width), random.randint(0, 240 - target.height))
            target.move_ip(new_coordonnees[0] - target.left, new_coordonnees[1] - target.top)
            color = 1
            score += 1
        else:
            color = 2

        screen.blit(pygame.transform.scale(virus, target.size), target)
        screen.blit(seringue, mouse)

        textsurface = myfont.render(f'Score : {score} - Temps : {time}', False, (0, 0, 0))
        screen.blit(textsurface,(10, 10))

    pygame.display.update()
