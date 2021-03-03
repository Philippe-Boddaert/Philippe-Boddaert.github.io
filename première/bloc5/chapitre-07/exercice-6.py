import pygame, random
pygame.init()
pygame.font.init()


COLORS = ((255, 0, 0), (0, 255, 0), (0, 0, 255))

screen = pygame.display.set_mode((360, 240))

target = pygame.Rect((180, 120), (64, 64))
right_border = pygame.Rect((344, 0), (16, 240))
left_border = pygame.Rect((0, 0), (16, 240))

color = 0
clock = pygame.time.Clock()
score = 0
velocity = 1

while True:
    clock.tick(30)
    
    screen.fill((255, 255, 255))
    for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    quit()
                elif event.key == pygame.K_KP_PLUS:
                    velocity += 1
                elif event.key == pygame.K_KP_MINUS:
                    velocity -= 1

    if target.colliderect(right_border):
        velocity *= -1
        color = 1
    elif target.colliderect(left_border):
        velocity *= -1
        color = 2
    
    target.move_ip(velocity, 0)
    pygame.draw.rect(screen, COLORS[color], target)
    pygame.draw.rect(screen, COLORS[1], right_border)
    pygame.draw.rect(screen, COLORS[2], left_border)
    
    
    pygame.display.update()
