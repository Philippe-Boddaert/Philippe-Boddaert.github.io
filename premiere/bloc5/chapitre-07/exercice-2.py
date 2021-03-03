import pygame
pygame.init()

screen = pygame.display.set_mode((720, 480))
rectangle = pygame.Rect((360, 240), (32, 32))

while True:
    screen.fill((255, 255, 255))
    pygame.draw.rect(screen, (0, 0, 255), rectangle)
    pygame.draw.line(screen, (0, 255, 0), (0, 0), (360, 240), 5)
    pygame.draw.circle(screen, (255, 0, 0), (360, 240), 32)
    pygame.display.update()