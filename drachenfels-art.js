/* Original hand-coded environment detailing. No assets, licenses, servers or fees. */
(function(){
const F=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const E=(g,x,y,rx,ry,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()};
const P=(g,pts,c)=>{g.fillStyle=c;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fill()};
const R=s=>()=>{s=(Math.imul(s,1664525)+1013904223)|0;return(s>>>0)/4294967296};
function masonry(g,x,y,w,h,r){for(let yy=y+9;yy<y+h;yy+=20){F(g,x,yy,w,2,'#243d4644');for(let xx=x+((yy/20|0)%2)*24;xx<x+w;xx+=47){F(g,xx,yy,2,19,'#293c4855');if(r()<.36)F(g,xx+5,yy-9,24,2,'#e5dfca35')}}}
function paving(g,x,y,w,h,r){for(let yy=y;yy<y+h;yy+=22)for(let xx=x+((yy/22|0)%2)*18;xx<x+w;xx+=39){F(g,xx+2,yy+3,34,16,r()<.45?'#9c99843d':'#f4dfb92c');F(g,xx+3,yy+4,31,1,'#fff1ce23');F(g,xx+3,yy+18,31,2,'#25373d22')}}
function shingles(g,x,y,w,roof,r){for(let row=0;row<6;row++){let yy=y-row*11,edge=row*16;for(let xx=x+edge;xx<x+w-edge;xx+=19){F(g,xx+1,yy,16,9,r()<.5?'#281f2a38':'#d9b9a83d');F(g,xx+1,yy,16,2,'#f8d3b33a')}}}
function banner(g,x,y,color){F(g,x,y,5,90,'#dbc9a5');F(g,x+5,y+8,29,58,color);P(g,[[x+5,y+66],[x+20,y+56],[x+34,y+66]],color);F(g,x+14,y+23,11,11,'#dfca96');F(g,x+17,y+18,5,23,'#dfca96')}
function brazier(g,x,y){E(g,x+5,y+15,21,9,'#15232a99');F(g,x-11,y-8,22,23,'#363943');F(g,x-13,y-13,26,11,'#af9a75');F(g,x-9,y-14,18,5,'#d4aa63');P(g,[[x-9,y-14],[x-2,y-37],[x+2,y-21],[x+10,y-46],[x+10,y-14]],'#d57b48');P(g,[[x-3,y-14],[x+3,y-31],[x+7,y-15]],'#f5c67c')}
function garden(g,x,y,r){E(g,x+4,y+8,64,32,'#152b2b77');E(g,x,y,62,29,'#365a49');for(let i=0;i<22;i++){const a=r()*6.28,rad=Math.sqrt(r())*50,xx=x+Math.cos(a)*rad,yy=y+Math.sin(a)*rad*.5;E(g,xx,yy,5+r()*4,3+r()*3,['#c3a37b','#e7c98b','#c8c7ad','#a8b6c4'][i%4]);F(g,xx-1,yy+3,2,5,'#284d3d')}}
function lamp(g,x,y){E(g,x+12,y+8,26,10,'#142a2c8a');F(g,x-3,y-48,7,57,'#313e42');F(g,x-12,y-54,24,12,'#d8b46e');F(g,x-9,y-52,18,8,'#fff0b5');F(g,x-16,y-58,32,6,'#53615b');F(g,x-5,y-67,10,10,'#6a6d60')}
function stoneRing(g,x,y,r){E(g,x,y,65,35,'#17292eaa');E(g,x-4,y-5,62,32,'#b4ac97');E(g,x-4,y-8,53,24,'#628e91');for(let i=0;i<14;i++){const a=i*Math.PI/7;E(g,x-4+54*Math.cos(a),y-5+25*Math.sin(a),5,4,'#d8cbb0')}}
function ruins(g,x,y,r){F(g,x+12,y+18,142,18,'#1c2c3580');for(let i=0;i<3;i++){const xx=x+i*64;F(g,xx,y-32-r()*18,30,66+r()*22,'#77837c');masonry(g,xx,y-22,30,55,r);F(g,xx-4,y-36,38,7,'#a7aa9c')}F(g,x-12,y+15,180,13,'#89938a')}
function reeds(g,x,y,r){for(let i=0;i<15;i++){const xx=x+r()*100,yy=y+r()*30;F(g,xx,yy-15-r()*13,2,20,'#5d7957');F(g,xx-2,yy-18-r()*10,5,10,'#b0a279')}}
function details(g,zone){const r=R(1222+['green','city','forest','marsh','mountain','crypt'].indexOf(zone)*873);g.save();
if(zone==='city'){
paving(g,877,410,166,780,r);paving(g,0,564,1920,113,r);
for(const [x,y,w,h] of [[200,160,1520,95],[205,155,200,330],[1515,155,200,330],[650,100,620,320],[755,60,130,340],[1035,60,130,340]])masonry(g,x,y,w,h,r);
for(const [x,y,w] of [[320,690,265],[1330,690,265],[295,360,235],[1400,365,235]])shingles(g,x,y-5,w,'#866254',r);
for(const [x,y] of [[610,550],[1280,550],[640,1000],[1270,1010]])garden(g,x,y,r);
for(const [x,y] of [[760,480],[1160,480],[780,920],[1140,920],[460,610],[1460,610]])lamp(g,x,y);
for(const [x,y] of [[690,235],[1200,235],[230,245],[1680,245]])banner(g,x,y,'#9c4d52');
for(const [x,y] of [[670,470],[1250,470],[660,980],[1250,980]])brazier(g,x,y);
for(let i=0;i<18;i++){const x=685+i*30;F(g,x,105,15,10,'#c6bba6');F(g,x,113,12,3,'#4e5c62')}
}else if(zone==='green'){
paving(g,909,520,104,650,r);
for(const [x,y,w] of [[350,310,265],[1320,320,260],[770,180,380]])shingles(g,x,y-4,w,'#ad7663',r);
for(const [x,y] of [[640,380],[1290,400],[580,960],[1320,940],[780,1040]])garden(g,x,y,r);
for(const [x,y] of [[710,630],[1220,630],[770,950]])lamp(g,x,y);
stoneRing(g,1460,1030,r);
for(let i=0;i<30;i++){const x=70+r()*1750,y=260+r()*850;if(Math.abs(x-960)<150)continue;F(g,x,y,3,12,'#315a40');F(g,x-5,y-3,12,6,['#e0c17f','#d8a6a5','#d4d9b8'][i%3])}
}else if(zone==='forest'){
for(const [x,y] of [[220,300],[1600,400],[400,970],[1480,1000],[500,180]])ruins(g,x,y,r);
for(const [x,y] of [[710,720],[1200,720],[800,1020]])garden(g,x,y,r);
for(let i=0;i<25;i++){const x=70+r()*1770,y=200+r()*900;if(Math.abs(x-960)<170)continue;E(g,x,y,18,8,'#1e453d');E(g,x-4,y-5,11,6,'#7c9a78')}
}else if(zone==='marsh'){
for(let i=0;i<30;i++){const x=r()*1800+50,y=r()*900+250;if(Math.abs(x-960)<150)continue;E(g,x,y,55+r()*50,18+r()*22,'#375c64');E(g,x-12,y-3,30,10,'#639191');reeds(g,x-60,y,r)}
for(const [x,y] of [[700,460],[1300,480],[680,950],[1320,970]])brazier(g,x,y);
}else if(zone==='mountain'){
for(let i=0;i<35;i++){const x=r()*1820+50,y=r()*1000+150;if(Math.abs(x-960)<155)continue;P(g,[[x-40,y+25],[x,y-25-r()*40],[x+52,y+25]],r()<.5?'#525c63':'#8c8784');F(g,x-6,y+20,40,4,'#293940')}
for(const [x,y] of [[620,510],[1330,510],[740,920],[1210,920]])brazier(g,x,y);
masonry(g,600,180,720,250,r);
}else{
for(const [x,y,w,h] of [[170,180,1580,110],[175,180,150,820],[1595,180,150,820],[620,160,680,300]])masonry(g,x,y,w,h,r);
paving(g,875,445,175,730,r);
for(const [x,y] of [[570,480],[1350,480],[540,930],[1380,930]])brazier(g,x,y);
for(let i=0;i<24;i++){const x=220+r()*1480,y=470+r()*680;if(Math.abs(x-960)<120)continue;F(g,x,y,36,9,'#2c303d');F(g,x+5,y-15,26,18,'#8a8092');F(g,x+8,y-12,20,2,'#c0a7a0')}
}
g.restore()}
window.DrachenfelsArt={details};
})();