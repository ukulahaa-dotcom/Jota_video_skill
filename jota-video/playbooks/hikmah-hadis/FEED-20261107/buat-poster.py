import json,sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R='/home/claude/jota_content_factory/'
A=R+'gpt/artistly/KANG-OHAN-10-HIKMAH-20261107/gambar/'; B=R+'skills/jota-video/playbooks/hikmah-hadis/KANG-OHAN-10-HIKMAH-REVISI-01/gambar/'
pilih={'01':A+'hal-01-2.png','02':B+'hal-01-2.png','03':A+'hal-03-1.png','04':A+'hal-04-1.png','05':B+'hal-02-2.png','06':B+'hal-03-1.png','07':A+'hal-07-1.png','08':B+'hal-04-1.png','09':B+'hal-05-2.png','10':A+'hal-10-2.png'}
posts={p['id']:p for p in json.load(open(R+'gpt/artistly/KANG-OHAN-10-HIKMAH-20261107/manifest.json'))['posts']}
OUT=sys.argv[1]
HOOK={'01':'Pernah menyesal membalas chat saat sedang emosi?','02':'Pohon yang kamu tanam hari ini bisa jadi pahala yang terus mengalir.','03':'Ilmu yang kamu ajarkan tak pernah berhenti berpahala.','04':'Cuma semangkuk air, tapi nilainya besar di sisi Allah.','05':'Amal kecil, tapi paling dicintai Allah. Kok bisa?','06':'Tamu datang saat hujan. Apa yang kamu lakukan?','07':'Kapan terakhir kamu memberi salam ke orang yang tak kamu kenal?','08':'Kembalian lebih seribu. Dikembalikan atau diam saja?','09':'Anak tidak butuh hadiah mahal. Mereka butuh ini.','10':'Mau ditolong Allah? Tolong dulu saudaramu.'}
W,H=1080,1350
TEAL=(14,52,56); CREAM=(250,243,228); GOLD=(214,175,95)
F='/usr/share/fonts/truetype/dejavu/'
fH=ImageFont.truetype(F+'DejaVuSerif-Bold.ttf',58); fT=ImageFont.truetype(F+'DejaVuSerif.ttf',40); fR=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',30); fB=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',26); fS=ImageFont.truetype(F+'DejaVuSans.ttf',24)
def wrap(d,t,f,w):
  out=[];cur=''
  for x in t.split():
    s=(cur+' '+x).strip()
    if d.textlength(s,font=f)<=w: cur=s
    else: out.append(cur); cur=x
  out.append(cur); return out
def grad(h,top=True,alpha=235):
  g=Image.new('L',(1,h))
  for y in range(h):
    a=int(alpha*min(1,(((1-y/h) if top else (y/h))*1.6))**0.8); g.putpixel((0,y),a)
  return g.resize((W,h))
for k,f in pilih.items():
  p=posts[k]; im=Image.open(f).convert('RGB')
  s=W/im.width; im=im.resize((W,int(im.height*s)),Image.LANCZOS)
  y0=max(0,(im.height-H)//2 - 40); im=im.crop((0,y0,W,y0+H))
  d0=ImageDraw.Draw(im)
  # headline
  hl=wrap(d0,HOOK[k],fH,W-140)
  topH=110+len(hl)*76+40
  im.paste(Image.new('RGB',(W,topH+120),TEAL),(0,0),grad(topH+120,True,240))
  # bottom panel
  tl=wrap(d0,p['hadith'],fT,W-160)
  botH=90+len(tl)*54+150+50
  im.paste(Image.new('RGB',(W,botH+220),TEAL),(0,H-botH-220),grad(botH+220,False,240))
  d=ImageDraw.Draw(im)
  d.text((70,58),'HIKMAH HADIS  •  '+k,font=fB,fill=GOLD)
  y=100
  for l in hl: d.text((70,y),l,font=fH,fill=CREAM); y+=72
  d.line((70,y+14,190,y+14),fill=GOLD,width=4)
  y=H-botH
  d.text((80,y-6),p['title'].upper(),font=fB,fill=GOLD); y+=46
  for l in tl: d.text((80,y),l,font=fT,fill=CREAM); y+=54
  d.text((80,y+18),p['ref'],font=fR,fill=GOLD)
  d.text((80,H-62),'Kang Ohan  —  Kisah Kecil, Hikmah Besar',font=fS,fill=(220,212,195))
  im.save(f'{OUT}/hikmah-{k}.jpg',quality=92)
print('ok')
