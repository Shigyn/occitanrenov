# Prepare les photos du site a partir des originaux recuperes sur
# l'ancien site (wp-content/uploads). Toutes sont des photos de ses
# propres chantiers, sauf « panneaux-solaires-toiture » qui etait deja
# une image libre de droits sur son site.
#
# Usage : python _source/photos.py <dossier des originaux>
#
# Chaque photo sort en deux largeurs WebP (1600 et 800), noms de
# fichiers descriptifs : c'est aussi un signal pour Google Images.
import os, sys
from PIL import Image, ImageOps

SRC = sys.argv[1]
DST = os.path.join(os.path.dirname(__file__), '..', 'photos')
os.makedirs(DST, exist_ok=True)

PHOTOS = {
    '046ECB32': 'couvreur-nimes-occitan-renov',
    '553430782': 'reparation-tuiles-toiture-nimes',
    '553655436': 'remplacement-tuiles-couvreur-gard',
    'FC7C7F00': 'artisan-etancheite-toiture',
    '547498118': 'occitan-renov-chantier-termine',
    'IMG_2580': 'revetement-anti-chaleur-cool-roof',
    'IMG_2579': 'etancheite-toit-terrasse',
    '538606314': 'nettoyage-toiture-haute-pression',
    '555575393': 'gouttiere-aluminium-noire',
    '553070239': 'bandeau-gouttiere-aluminium',
    '554188600': 'gouttiere-aluminium-cuivre',
    '541608107': 'faitage-reparation-mortier',
    '541322519': 'faitage-avant-apres',
    '553582682': 'faitage-avant-apres-2',
    '553582684': 'rives-toiture-avant-apres',
    '9FA0FD99': 'nettoyage-tuiles-avant-apres',
    '541163774': 'demoussage-tuiles-avant-apres',
    '551723721': 'peinture-facade-avant-apres',
    '556944884': 'renovation-facade-avant-apres',
    '538640775': 'facade-maison-avant-apres',
    '563806508': 'artisan-peinture-facade',
    '551997707': 'chantier-facade-echafaudage',
    '554074991': 'facade-maison-gard',
    'solar-system': 'panneaux-solaires-toiture',
}

def trouver(cle):
    for f in os.listdir(SRC):
        if cle in f:
            return os.path.join(SRC, f)
    raise SystemExit('introuvable : ' + cle)

for cle, nom in PHOTOS.items():
    im = ImageOps.exif_transpose(Image.open(trouver(cle))).convert('RGB')
    for larg in (1600, 800):
        c = im.copy()
        if c.width > larg:
            c = c.resize((larg, round(c.height * larg / c.width)), Image.LANCZOS)
        c.save(os.path.join(DST, f'{nom}-{larg}.webp'), 'WEBP', quality=78, method=6)
    print(f'{nom:38s} {im.width}x{im.height}')

# Le pictogramme du logo : le toit et la gouttiere, sans le texte (le
# nom est ecrit en HTML a cote, net a toutes les tailles). Le fond
# blanc devient transparent pour poser l'icone sur le bleu du pied.
logo = Image.open(trouver('cropped-B166C457-34BC-4252-B741-14D1CA2B962B.png')).convert('RGBA')
toit = logo.crop((40, 20, 930, 400))
px = toit.load()
for y in range(toit.height):
    for x in range(toit.width):
        r, g, b, a = px[x, y]
        if r > 225 and g > 225 and b > 225:
            px[x, y] = (255, 255, 255, 0)
toit = toit.crop(toit.getbbox())
toit.thumbnail((240, 240))
toit.save(os.path.join(DST, 'logo-toit.png'), optimize=True)
logo.convert('RGB').resize((512, 512), Image.LANCZOS).save(os.path.join(DST, 'logo-occitan-renov.png'), optimize=True)
print('logo', toit.size)
