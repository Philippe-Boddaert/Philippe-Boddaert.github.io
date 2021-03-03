import pygame
pygame.init()

COLORS = ((255, 0, 0), (0, 255, 0), (0, 0, 255))

screen = pygame.display.set_mode((720, 480))
mouse = (0, 0)

target = pygame.Rect((360, 240), (32, 32))

color = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                quit()
        elif event.type == pygame.MOUSEMOTION:
            mouse = event.pos
    
    screen.fill((255, 255, 255))
    
    color = 1 if target.collidepoint(mouse) else 2
    
    pygame.draw.rect(screen, COLORS[color], target)
    pygame.draw.circle(screen, COLORS[0], mouse, 8)
    
    pygame.display.update()