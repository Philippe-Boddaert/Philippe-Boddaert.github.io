from PIL import Image

LARGEUR = 600
HAUTEUR = 400

img = Image.new('RGB',(LARGEUR, HAUTEUR))

for y in range(HAUTEUR):
    for x in range(LARGEUR):
        if y < HAUTEUR // 2:
            img.putpixel((x, y), (255, 0, 0))
        else:
            img.putpixel((x, y), (255, 255, 255))

img.show()