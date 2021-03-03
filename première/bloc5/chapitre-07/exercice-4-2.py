import pygame, random
pygame.init()

COLORS = ((255, 0, 0), (0, 255, 0), (0, 0, 255))

screen = pygame.display.set_mode((360, 240))
mouse = (0, 0)

target = pygame.Rect((180, 120), (64, 64))

color = 0

while True:

    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                quit()
        elif event.type == pygame.MOUSEMOTION:
            mouse = event.pos
    
    screen.fill((255, 255, 255))
        
    if target.collidepoint(mouse):
        color = 1
    else:
        color = 2
    
    pygame.draw.rect(screen, COLORS[color], target)
    pygame.draw.circle(screen, COLORS[0], mouse, 8)
    
    pygame.display.update()
