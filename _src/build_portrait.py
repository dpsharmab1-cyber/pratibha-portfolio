"""Generate the layered, animated portrait markup from the layer manifest and inject it into index.html."""
import json, re
W, H = 1199, 1600
m = {r[0]: r[1:] for r in json.load(open('_src/layers/manifest.json'))}
m['earring-l'] = [377, 738, 68, 70]
m['earring-r'] = [799, 735, 71, 69]

def box(x, y, w, h):
    return f"left:{x / W * 100:.3f}%;top:{y / H * 100:.3f}%;width:{w / W * 100:.3f}%;aspect-ratio:{w}/{h}"

def layer(name, cls, dep=None, src=None, delay=None):
    x, y, w, h = m[name]
    st = box(x, y, w, h) + (f";--dep:{dep}" if dep is not None else "") + (f";--dl:{delay}s" if delay is not None else "")
    return f'<span class="pz__l {cls}" style="{st}"><img src="assets/portrait/{src or name}.webp" alt="" draggable="false"></span>'

def spot(cls, cx, cy, size, delay=0):
    return f'<span class="pz__fx {cls}" style="left:{(cx - size / 2) / W * 100:.3f}%;top:{(cy - size / 2) / H * 100:.3f}%;width:{size / W * 100:.3f}%;--dl:{delay}s"></span>'

back = [layer('arch', 'pz-arch', .12), layer('aura', 'pz-aura', .08),
        spot('pz-glow', 860, 360, 520), layer('rays', 'pz-rays', .3), layer('orb', 'pz-orb', .36)]
fig = [layer('body', 'pz-body', 0),
       spot('pz-blush', 507, 693, 70, 0), spot('pz-blush', 750, 693, 70, .4),
       spot('pz-glint', 488, 623, 22, 0), spot('pz-glint', 698, 619, 18, 1.3),
       layer('earring-l', 'pz-earring', 0, delay=0), layer('earring-r', 'pz-earring', 0, delay=-.9),
       layer('flower', 'pz-flower', 0), layer('leaf', 'pz-leaf', 0)]
front = [layer('thread', 'pz-thread', .7)]
front += [layer(f'bead{i}', 'pz-bead', .7, delay=-i * 1.7) for i in range(4)]
d = 0
for n in ['crystal0', 'crystal1', 'diamond0', 'diamond1', 'diamond2', 'orb0', 'orb1', 'orb2', 'drop0']:
    front.append(layer(n, 'pz-float', round(.8 + (d % 3) * .15, 2), delay=-d * 1.1)); d += 1
for i, n in enumerate(['sparkle0', 'sparkle1', 'sparkle2']):
    front.append(layer(n, 'pz-sparkle', .9, delay=-i * 1.4))

html = ('<div class="pz" role="img" aria-label="Illustrated portrait of Pratibha Devi — glasses, a red flower in her braided hair, a red sun behind her">'
        + ''.join(back)
        + '<div class="pz__fig" style="--dep:.5"><div class="pz__breath">' + ''.join(fig) + '</div></div>'
        + ''.join(front) + '</div>')

s = open('index.html', encoding='utf8').read()
s = re.sub(r'<!--PZ:hero-->.*?<!--/PZ:hero-->', '<!--PZ:hero-->' + html + '<!--/PZ:hero-->', s, flags=re.S)
s = re.sub(r'<!--PZ:about-->.*?<!--/PZ:about-->', '<!--PZ:about-->' + html.replace('role="img"', 'aria-hidden="true"') + '<!--/PZ:about-->', s, flags=re.S)
open('index.html', 'w', encoding='utf8').write(s)
print('layers:', html.count('pz__l'), 'fx:', html.count('pz__fx'))
