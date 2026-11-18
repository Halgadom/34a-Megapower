import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const $=id=>document.getElementById(id),scene=new THREE.Scene();scene.background=new THREE.Color(0x667f91);scene.fog=new THREE.FogExp2(0x6b8490,.0045);
const camera=new THREE.PerspectiveCamera(66,innerWidth/innerHeight,.1,350),renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.42;renderer.outputColorSpace=THREE.SRGBColorSpace;document.body.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xc8e3ff,0x40552e,2.2));const sun=new THREE.DirectionalLight(0xffc58d,2.2);sun.position.set(-35,55,-35);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-65;sun.shadow.camera.right=65;sun.shadow.camera.top=65;sun.shadow.camera.bottom=-65;scene.add(sun);
let profile={};try{profile=JSON.parse(sessionStorage.getItem('megapower_schattenreiche_hero')||'{}')}catch{}$('hero').textContent=profile.name||'Abenteurer';$('lvl').textContent=profile.level||1;
const mat=(c,em=0)=>new THREE.MeshStandardMaterial({color:c,roughness:.55,metalness:.22,emissive:c,emissiveIntensity:em}),geo=(r=1)=>new THREE.SphereGeometry(r,12,8);
// Hand-painted procedural ground texture (no paid assets, no network requests).
function terrainTexture(){const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.fillStyle='#385d42';ctx.fillRect(0,0,512,512);let seed=817;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};for(let i=0;i<14000;i++){const x=random()*512,y=random()*512,r=1+random()*8;ctx.fillStyle=random()>.5?'rgba(17,36,24,.10)':'rgba(150,170,107,.09)';ctx.beginPath();ctx.ellipse(x,y,r,r*.4,random()*6.28,0,6.28);ctx.fill()}for(let i=0;i<700;i++){const x=random()*512,y=random()*512;ctx.strokeStyle='rgba(135,182,112,.20)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+random()*4-2,y-4-random()*5);ctx.stroke()}const tex=new THREE.CanvasTexture(canvas);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(26,26);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return tex}
const groundMaterial=new THREE.MeshStandardMaterial({map:terrainTexture(),roughness:1,color:0xc3d3a2});
const ground=new THREE.Mesh(new THREE.PlaneGeometry(400,400),groundMaterial);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const rng=(a,b)=>a+Math.random()*(b-a),props=new THREE.Group();scene.add(props);const bark=mat(0x493527),leafDark=mat(0x194d38),leafLight=mat(0x327957),stone=mat(0x596878);
function box(w,h,d,c,x,y,z,parent=props){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
// Layered stylized forest: branching trees, boulders, grass, glowing flora and a stone path.
const forestColors=[mat(0x194f3c),mat(0x286b4a),mat(0x397d58),mat(0x244d45)];
function addTree(x,z,scale){const group=new THREE.Group();group.position.set(x,0,z);group.scale.setScalar(scale);props.add(group);const h=rng(6.2,10.5),trunk=new THREE.Mesh(new THREE.CylinderGeometry(.24,.55,h,9),bark);trunk.position.y=h/2;trunk.castShadow=true;group.add(trunk);for(let j=0;j<11;j++){const angle=j*2.4,dist=j===0?0:1.2;const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(rng(1.45,2.25),2),forestColors[j%4]);leaf.position.set(Math.cos(angle)*dist,h+Math.sin(j*2)*.65,Math.sin(angle)*dist);leaf.scale.set(1.15,.9,1.1);leaf.castShadow=true;group.add(leaf)}}
for(let i=0;i<165;i++){const x=rng(-120,120),z=rng(-120,120);if(Math.hypot(x,z)<14||Math.abs(x)<7&&z>-34&&z<10)continue;addTree(x,z,rng(.65,1.4))}
for(let i=0;i<100;i++){const x=rng(-100,100),z=rng(-100,100);if(Math.hypot(x,z)<10)continue;const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(rng(.4,1.65),1),stone);rock.position.set(x,.2,z);rock.scale.set(1,.5,rng(.7,1.5));rock.castShadow=true;props.add(rock)}
const grassGeometry=new THREE.ConeGeometry(.12,.7,3),grassMaterials=[mat(0x397f4d),mat(0x52935a),mat(0x245c3d)];for(let c=0;c<3;c++){const inst=new THREE.InstancedMesh(grassGeometry,grassMaterials[c],1800),dummy=new THREE.Object3D();for(let i=0;i<1800;i++){dummy.position.set(rng(-100,100),.25,rng(-100,100));dummy.rotation.set(0,rng(0,6.28),rng(-.25,.25));dummy.scale.setScalar(rng(.5,1.3));dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix)}inst.instanceMatrix.needsUpdate=true;props.add(inst)}
const crystalMaterial=new THREE.MeshStandardMaterial({color:0x9d63ed,emissive:0x6424b5,emissiveIntensity:.9,metalness:.2,roughness:.17});for(let i=0;i<22;i++){const x=rng(-80,80),z=rng(-80,80);if(Math.hypot(x,z)<13)continue;for(let j=0;j<4;j++){const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(rng(.35,.85)),crystalMaterial);crystal.scale.y=rng(1.3,2.6);crystal.position.set(x+rng(-.9,.9),.8,z+rng(-.9,.9));crystal.rotation.z=rng(-.4,.4);props.add(crystal)}}
for(let i=0;i<12;i++){const x=(i%2?1:-1)*rng(12,38),z=-22-rng(0,35),h=rng(2,5);box(1.3,h,1.3,0x62667a,x,h/2,z);box(2.3,.45,2.3,0x85899b,x,h+.1,z)}
for(let z=-19;z<12;z+=1.7){const slab=new THREE.Mesh(new THREE.BoxGeometry(rng(1.5,2.6),.12,rng(1.2,1.6)),stone);slab.position.set(rng(-.2,.2),.08,z);slab.rotation.y=rng(-.1,.1);props.add(slab)}
// Ferns and meadow flowers break up the flat terrain without paid textures.
const fernMat=new THREE.MeshStandardMaterial({color:0x2b6745,roughness:1,side:THREE.DoubleSide});
const fernGeometry=new THREE.ConeGeometry(.27,.9,5);
const fernInst=new THREE.InstancedMesh(fernGeometry,fernMat,850),fernDummy=new THREE.Object3D();
for(let i=0;i<850;i++){const x=rng(-100,100),z=rng(-100,100);fernDummy.position.set(x,.4,z);fernDummy.rotation.set(rng(-.2,.2),rng(0,6.28),rng(-.3,.3));fernDummy.scale.set(rng(.7,1.6),rng(.6,1.5),rng(.7,1.4));fernDummy.updateMatrix();fernInst.setMatrixAt(i,fernDummy.matrix)}
fernInst.instanceMatrix.needsUpdate=true;props.add(fernInst);
// Ancient fortress on the distant horizon.
const fortress=new THREE.Group();fortress.position.set(-65,0,-82);scene.add(fortress);
const fortStone=new THREE.MeshStandardMaterial({color:0x737c8c,roughness:.9});
const fortRoof=new THREE.MeshStandardMaterial({color:0x313b54,roughness:.8});
function fortBlock(w,h,d,x,y,z,material=fortStone){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;fortress.add(m);return m}
fortBlock(19,13,14,0,6.5,0);fortBlock(11,9,11,0,17,0);fortBlock(6,6,7,0,24,0,fortRoof);
for(const sx of [-1,1])for(const sz of [-1,1]){fortBlock(5,20,5,sx*10,10,sz*7);const roof=new THREE.Mesh(new THREE.ConeGeometry(4,7,4),fortRoof);roof.position.set(sx*10,23.5,sz*7);roof.rotation.y=Math.PI/4;fortress.add(roof)}
for(let i=-3;i<=3;i++)fortBlock(1.4,1.6,1.4,i*2.5,13.5,-7);
const gate=new THREE.Mesh(new THREE.BoxGeometry(4,6,.2),mat(0x161c2a));gate.position.set(0,3,7.1);fortress.add(gate);
// Reflective pond and colorful meadow flowers.
const pond=new THREE.Mesh(new THREE.CircleGeometry(10,48),new THREE.MeshPhysicalMaterial({color:0x377e93,metalness:.25,roughness:.19,transparent:true,opacity:.82,clearcoat:1,side:THREE.DoubleSide}));pond.rotation.x=-Math.PI/2;pond.position.set(28,.075,-31);scene.add(pond);
const pondRim=new THREE.Mesh(new THREE.RingGeometry(9.9,11.5,48),new THREE.MeshStandardMaterial({color:0x728b75,roughness:1,side:THREE.DoubleSide}));pondRim.rotation.x=-Math.PI/2;pondRim.position.set(28,.085,-31);scene.add(pondRim);
const flowerMesh=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.11,0),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9}),650),flowerDummy=new THREE.Object3D(),flowerColors=[0xf6c965,0xc98aff,0xe8f3ff,0xff8ba4];
for(let i=0;i<650;i++){let x=rng(-90,90),z=rng(-90,90);if(Math.hypot(x-28,z+31)<12){x+=16;z+=16}flowerDummy.position.set(x,.32,z);flowerDummy.scale.setScalar(rng(.5,1.4));flowerDummy.updateMatrix();flowerMesh.setMatrixAt(i,flowerDummy.matrix);flowerMesh.setColorAt(i,new THREE.Color(flowerColors[i%4]))}
flowerMesh.instanceMatrix.needsUpdate=true;flowerMesh.instanceColor.needsUpdate=true;props.add(flowerMesh);
const fireflies=[];for(let i=0;i<55;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.04,6,5),new THREE.MeshBasicMaterial({color:i%3?0x9deed0:0xffc873}));f.userData={x:rng(-50,50),y:rng(.5,3),z:rng(-50,50),phase:rng(0,6.28)};f.position.set(f.userData.x,f.userData.y,f.userData.z);scene.add(f);fireflies.push(f)}
// Distant mountains, ruins and ambient world geometry.
const mountainMat=new THREE.MeshStandardMaterial({color:0x34465c,roughness:1,flatShading:true}),mountainSnow=new THREE.MeshStandardMaterial({color:0x8293a3,roughness:.92});
for(let i=0;i<34;i++){const angle=i*Math.PI*2/34,dist=112+rng(0,28),height=rng(22,53);const peak=new THREE.Mesh(new THREE.ConeGeometry(rng(10,23),height,5),mountainMat);peak.position.set(Math.cos(angle)*dist,height*.36,Math.sin(angle)*dist);peak.rotation.y=rng(0,6.28);scene.add(peak);if(i%3===0){const snow=new THREE.Mesh(new THREE.ConeGeometry(4.3,7,5),mountainSnow);snow.position.set(peak.position.x,peak.position.y+height*.5,peak.position.z);scene.add(snow)}}
const ruinStone=new THREE.MeshStandardMaterial({color:0x586073,roughness:.93,metalness:.08}),ruinEdge=new THREE.MeshStandardMaterial({color:0x998c83,roughness:.86});
for(let i=0;i<18;i++){const x=(i%2?-1:1)*rng(18,65),z=rng(-65,35),height=rng(3,9);const pillar=new THREE.Group();pillar.position.set(x,0,z);scene.add(pillar);for(let j=0;j<Math.ceil(height/1.2);j++){const seg=new THREE.Mesh(new THREE.CylinderGeometry(.55,.62,1.15,9),j%3?ruinStone:ruinEdge);seg.position.y=.6+j*1.18;seg.rotation.y=rng(-.08,.08);seg.castShadow=true;pillar.add(seg)}const cap=new THREE.Mesh(new THREE.BoxGeometry(1.7,.4,1.7),ruinEdge);cap.position.y=height+.1;cap.castShadow=true;pillar.add(cap)}
const mistLayers=[];for(let i=0;i<12;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(rng(25,50),rng(6,12)),new THREE.MeshBasicMaterial({color:0x9bb9cb,transparent:true,opacity:.045,depthWrite:false,side:THREE.DoubleSide}));m.position.set(rng(-70,70),rng(1.2,4),rng(-70,70));m.rotation.x=-Math.PI/2;scene.add(m);mistLayers.push(m)}
const portal=new THREE.Group();portal.position.set(0,0,-22);scene.add(portal);box(1,8,1,0x626183,-3,4,-22,scene);box(1,8,1,0x626183,3,4,-22,scene);box(7,1,1,0x626183,0,8,-22,scene);const glow=new THREE.Mesh(new THREE.PlaneGeometry(5,7),new THREE.MeshBasicMaterial({color:0x8e54ff,transparent:true,opacity:.55,side:THREE.DoubleSide}));glow.position.y=4;portal.add(glow);// Ornate runic arch and magical torches.
const runeMat=new THREE.MeshStandardMaterial({color:0xa57aff,emissive:0x7544f4,emissiveIntensity:1.1,metalness:.65,roughness:.22});
for(const sign of [-1,1]){for(let i=0;i<7;i++){const rune=new THREE.Mesh(new THREE.OctahedronGeometry(.18,0),runeMat);rune.position.set(sign*3,1.1+i*.85,-22.62);rune.rotation.z=i*.4;scene.add(rune)}const brazier=new THREE.Mesh(new THREE.CylinderGeometry(.5,.25,.55,10),ruinEdge);brazier.position.set(sign*4.3,1.25,-20);scene.add(brazier);const fire=new THREE.Mesh(new THREE.ConeGeometry(.26,.85,8),new THREE.MeshBasicMaterial({color:0xffb65b}));fire.position.set(sign*4.3,1.95,-20);scene.add(fire)}
for(let i=0;i<9;i++){const rune=new THREE.Mesh(new THREE.OctahedronGeometry(.17,0),runeMat);rune.position.set(-2.5+i*.62,8,-22.62);scene.add(rune)}
const pl=new THREE.PointLight(0x9556ff,12,18);pl.position.set(0,4,-22);scene.add(pl);const torchL=new THREE.PointLight(0xffa650,5,12);torchL.position.set(-3,4,-20);scene.add(torchL);const torchR=new THREE.PointLight(0xffa650,5,12);torchR.position.set(3,4,-20);scene.add(torchR);
const hero=new THREE.Group();scene.add(hero);
const skinPalette=['#f5d4bc','#e6ad85','#b87958','#85563c','#dcae91','#f0c7ac','#a7755d'],hairPalette=['#2b1c20','#513424','#9b5d2e','#e0ba68','#a22d32','#e4e7f2','#49335c'],raceSkin={orc:'#7ca653',goblin:'#79b56c',dragon:'#50ad9e',darkelf:'#8872ad',demon:'#b95e79',vampire:'#e4d7d5',merfolk:'#76c9c9',fairy:'#f5d4ef'};
const outfit=profile.color||'#6e5d9d',skinColor=raceSkin[profile.race]||skinPalette[(Number(profile.skin)||0)%skinPalette.length],hairColor=hairPalette[(Number(profile.hair)||0)%hairPalette.length];
const armor=mat(outfit,.07),skin=mat(skinColor),hairMat=mat(hairColor),gold=mat(0xd6b76c,.16),dark=mat(0x17192c),cloth=mat(0x2b253a),eyeWhite=mat(0xf6e9e1),eyeDark=mat(0x182a35);
function part(shape,material,x,y,z,parent=hero){const m=new THREE.Mesh(shape,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function limb(a,b,r1,r2,material,parent=hero){const len=a.distanceTo(b),m=part(new THREE.CylinderGeometry(r1,r2,len,10),material,(a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2,parent);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());return m}
const torso=part(new THREE.CylinderGeometry(.49,.4,1.1,12),armor,0,1.75,0);part(new THREE.BoxGeometry(.72,.1,.12),gold,0,2.12,.41);part(new THREE.BoxGeometry(.64,.13,.14),gold,0,1.42,.38);
const neck=part(new THREE.CylinderGeometry(.17,.19,.28,12),skin,0,2.47,0);
const head=part(new THREE.SphereGeometry(.36,20,16),skin,0,2.85,0);head.scale.set(.94,1.12,.9);
for(const side of [-1,1]){part(new THREE.SphereGeometry(.065,10,8),eyeWhite,side*.15,2.88,-.322);part(new THREE.SphereGeometry(.033,10,8),eyeDark,side*.15,2.88,-.38);part(new THREE.SphereGeometry(.095,12,10),skin,side*.345,2.78,0)}
const hairTop=part(new THREE.SphereGeometry(.37,16,12),hairMat,0,3.13,.045);hairTop.scale.set(1,.45,.98);
for(let i=0;i<6;i++){const ang=(i/5)*Math.PI;const tuft=part(new THREE.ConeGeometry(.115,.35,6),hairMat,Math.cos(ang)*.29,3.14,-Math.sin(ang)*.25);tuft.rotation.z=Math.cos(ang)*.45}
if(profile.race==='orc'||profile.race==='goblin'||profile.race==='darkelf'){for(const side of [-1,1]){const ear=part(new THREE.ConeGeometry(.13,.38,6),skin,side*.44,2.96,0);ear.rotation.z=side*-.8}}
if(profile.race==='demon'||profile.race==='dragon'){for(const side of [-1,1]){const horn=part(new THREE.ConeGeometry(.12,.55,8),gold,side*.25,3.44,0);horn.rotation.z=side*-.25}}
const leftArm=new THREE.Group(),rightArm=new THREE.Group();leftArm.position.set(-.59,2.17,0);rightArm.position.set(.59,2.17,0);hero.add(leftArm,rightArm);
for(const [group,sign] of [[leftArm,-1],[rightArm,1]]){part(new THREE.SphereGeometry(.26,12,10),gold,sign*.08,-.05,0,group);limb(new THREE.Vector3(sign*.09,-.16,0),new THREE.Vector3(sign*.17,-.83,-.02),.19,.15,armor,group);part(new THREE.SphereGeometry(.15,10,8),skin,sign*.17,-.89,-.02,group)}
const legL=new THREE.Group(),legR=new THREE.Group();legL.position.set(-.24,1.22,0);legR.position.set(.24,1.22,0);hero.add(legL,legR);
for(const group of [legL,legR]){part(new THREE.CylinderGeometry(.19,.16,.76,10),cloth,0,-.4,0,group);part(new THREE.CylinderGeometry(.2,.21,.52,10),armor,0,-.92,-.02,group);part(new THREE.BoxGeometry(.39,.2,.65),dark,0,-1.18,-.16,group)}
const chestGem=part(new THREE.OctahedronGeometry(.17),mat(0x7cdcf8,.5),0,1.83,-.47);
const weapon=new THREE.Group();rightArm.add(weapon);weapon.position.set(.22,-.9,-.08);part(new THREE.CylinderGeometry(.065,.065,.6,8),dark,0,-.12,0,weapon);part(new THREE.BoxGeometry(.52,.1,.16),gold,0,.2,0,weapon);part(new THREE.ConeGeometry(.14,1.35,4),mat(0xbcd5e8,.16),0,.95,0,weapon).rotation.y=Math.PI/4;
const cape=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.7,5,7),new THREE.MeshStandardMaterial({color:outfit,side:THREE.DoubleSide,roughness:.9}));cape.position.set(0,1.58,.48);cape.rotation.x=-.14;hero.add(cape);
// Exact 2D MEGAPOWER avatar, transferred from the editor, shown as a character portrait in 3D.
// Fully three-dimensional dark royal armor. Distinctive silhouette is visible from behind.
const obsidian=new THREE.MeshStandardMaterial({color:0x160e27,metalness:.82,roughness:.23}),royalGold=new THREE.MeshStandardMaterial({color:0xe5a955,metalness:.92,roughness:.2}),magenta=new THREE.MeshStandardMaterial({color:0x9b237d,metalness:.56,roughness:.28,emissive:0xe124c6,emissiveIntensity:.65}),crystal=new THREE.MeshStandardMaterial({color:0x6be9ff,metalness:.4,roughness:.12,emissive:0x2edcff,emissiveIntensity:1.6}),blackFabric=new THREE.MeshStandardMaterial({color:0x21112f,roughness:.85,side:THREE.DoubleSide});
const armorParts=new THREE.Group();hero.add(armorParts);
function armorPiece(g,m,x,y,z,rx=0,ry=0,rz=0,parent=armorParts){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function crestLine(x,y,z,w=.12,h=.35){return armorPiece(new THREE.BoxGeometry(w,h,.07),royalGold,x,y,z)}
// Replace the generic pastel torso, shoulders, face and clothing with black/gold fantasy equipment.
torso.material=obsidian;head.material=skin;hairTop.material=obsidian;cape.material=blackFabric;chestGem.material=crystal;
for(const arm of [leftArm,rightArm]){for(const mesh of arm.children){if(mesh.isMesh)mesh.material=obsidian}}
for(const leg of [legL,legR]){for(const mesh of leg.children){if(mesh.isMesh)mesh.material=obsidian}}
armorPiece(new THREE.CylinderGeometry(.52,.43,1.15,10),obsidian,0,1.76,0);
armorPiece(new THREE.BoxGeometry(.86,.08,.09),royalGold,0,2.1,-.47);
armorPiece(new THREE.BoxGeometry(.9,.1,.1),royalGold,0,1.47,-.42);
armorPiece(new THREE.OctahedronGeometry(.24),crystal,0,1.81,-.53);
for(const sign of [-1,1]){
 const shoulder=armorPiece(new THREE.SphereGeometry(.41,12,10),obsidian,sign*.73,2.24,0);shoulder.scale.set(1.2,.55,1.15);
 const blade=armorPiece(new THREE.ConeGeometry(.24,1.08,7),obsidian,sign*.79,2.71,0,0,0,-sign*.3);
 armorPiece(new THREE.ConeGeometry(.09,.93,7),royalGold,sign*.79,2.74,-.09,0,0,-sign*.3);
 armorPiece(new THREE.ConeGeometry(.25,.85,5),magenta,sign*.57,2.8,.1,0,0,sign*.35);
 armorPiece(new THREE.BoxGeometry(.28,.5,.48),obsidian,sign*.77,1.8,-.02);
 armorPiece(new THREE.OctahedronGeometry(.16),crystal,sign*.7,1.92,-.3);
 armorPiece(new THREE.BoxGeometry(.28,.12,.5),royalGold,sign*.23,.64,-.07);
}
// Crown with black prongs and a golden rim, not a cone hat.
armorPiece(new THREE.CylinderGeometry(.36,.37,.15,10),royalGold,0,3.2,0);
for(let i=0;i<7;i++){const a=i*Math.PI*2/7;armorPiece(new THREE.ConeGeometry(.105,i%2?.38:.55,5),obsidian,Math.cos(a)*.3,3.5,Math.sin(a)*.3)}
armorPiece(new THREE.OctahedronGeometry(.11),crystal,0,3.29,-.36);
const mask=armorPiece(new THREE.BoxGeometry(.57,.3,.14),obsidian,0,2.7,-.33);
for(const sign of [-1,1]){const lens=armorPiece(new THREE.TorusGeometry(.14,.035,8,16),royalGold,sign*.16,2.9,-.37);armorPiece(new THREE.SphereGeometry(.07,8,8),crystal,sign*.16,2.9,-.4)}
const skirt=armorPiece(new THREE.CylinderGeometry(.43,.68,.7,8,1,true),obsidian,0,1.04,0);skirt.material.side=THREE.DoubleSide;
for(const sign of [-1,1]){armorPiece(new THREE.BoxGeometry(.32,.55,.1),obsidian,sign*.32,1.05,-.52);armorPiece(new THREE.OctahedronGeometry(.14),crystal,sign*.32,.98,-.6)}
const auraGroup=new THREE.Group();hero.add(auraGroup);const auraLight=new THREE.PointLight(0xed36db,2.5,6);auraLight.position.y=1.6;hero.add(auraLight);
const auraFlames=[];for(let i=0;i<18;i++){const a=i*Math.PI*2/18,flame=armorPiece(new THREE.ConeGeometry(.085,.45+Math.random()*.4,5),i%4===0?crystal:magenta,Math.cos(a)*1.05,.3+Math.random()*2.4,Math.sin(a)*.7,0,0,0,auraGroup);auraFlames.push({flame,a,phase:Math.random()*6.28})}
// Additional rear silhouette: angular mantle, engraved pauldrons and flowing robe.
for(const side of [-1,1]){const backWing=armorPiece(new THREE.ConeGeometry(.24,1.22,6),obsidian,side*.72,2.52,.34,0,0,-side*.38);backWing.scale.z=.7;const trim=armorPiece(new THREE.ConeGeometry(.07,1.05,6),royalGold,side*.73,2.57,.11,0,0,-side*.38);trim.scale.z=.65}
const backCrest=armorPiece(new THREE.OctahedronGeometry(.29),crystal,0,1.91,.55);backCrest.scale.z=.55;
const capeTail=armorPiece(new THREE.ConeGeometry(.7,1.7,5),blackFabric,0,.82,.42,Math.PI,0,0);capeTail.scale.z=.36;
const sigil=armorPiece(new THREE.TorusGeometry(.48,.035,8,40),magenta,0,1.82,.62);sigil.rotation.x=.06;
// Layered armor, detailed gauntlets and a more natural fantasy-warrior silhouette.
const steel=new THREE.MeshStandardMaterial({color:0x344052,metalness:.84,roughness:.3});
for(const side of [-1,1]){
 armorPiece(new THREE.BoxGeometry(.33,.53,.4),steel,side*.72,1.7,0);
 armorPiece(new THREE.BoxGeometry(.37,.12,.43),royalGold,side*.72,1.93,0);
 armorPiece(new THREE.BoxGeometry(.3,.55,.42),steel,side*.24,.72,-.07);
 armorPiece(new THREE.BoxGeometry(.32,.08,.45),royalGold,side*.24,.47,-.07);
 for(let i=0;i<3;i++)armorPiece(new THREE.BoxGeometry(.13,.045,.06),royalGold,side*.25,.82+i*.16,-.31);
}
for(let i=0;i<5;i++)armorPiece(new THREE.BoxGeometry(.1,.09,.07),royalGold,(i-2)*.15,1.96,-.5);
const blade=weapon.children.find(m=>m.geometry?.type==='ConeGeometry');
if(blade){blade.geometry.dispose();blade.geometry=new THREE.BoxGeometry(.19,1.42,.075);blade.position.y=1.04;blade.material=new THREE.MeshStandardMaterial({color:0xb7d9ef,metalness:.93,roughness:.13});}
// Animated cape fabric and extra articulated pauldrons.
const shoulderGuards=[];
for(const [arm,sign] of [[leftArm,-1],[rightArm,1]]){const guard=new THREE.Group();guard.position.set(sign*.12,-.02,0);arm.add(guard);const plate=new THREE.Mesh(new THREE.SphereGeometry(.33,16,12),obsidian);plate.scale.set(1.16,.62,1.15);plate.castShadow=true;guard.add(plate);shoulderGuards.push(guard)}
const capeGeometry=cape.geometry,capeRest=Float32Array.from(capeGeometry.attributes.position.array);
// Additional detailed black-and-gold battle armor.
const helmetShell=armorPiece(new THREE.SphereGeometry(.38,20,14),obsidian,0,3.05,0);helmetShell.scale.set(1,.72,1.03);
armorPiece(new THREE.BoxGeometry(.67,.1,.12),royalGold,0,2.91,-.35);
for(const side of [-1,1]){
 armorPiece(new THREE.BoxGeometry(.38,.55,.12),steel,side*.22,1.87,-.47,0,0,side*.12);
 armorPiece(new THREE.BoxGeometry(.31,.06,.14),royalGold,side*.22,1.61,-.5);
 for(let j=0;j<3;j++)armorPiece(new THREE.BoxGeometry(.23,.075,.12),steel,side*.33,1.18-j*.17,-.48);
}
const cloakPanels=[];
for(let i=-3;i<=3;i++){const panel=new THREE.Mesh(new THREE.PlaneGeometry(.27,1.65,1,7),blackFabric);panel.position.set(i*.17,1.35,.59);panel.rotation.x=-.18;hero.add(panel);cloakPanels.push(panel)}
const originalAvatar=null;
const companion=new THREE.Group();scene.add(companion);const petHue=[0x5531a8,0x6131a8,0x442080,0x6631af,0x37145b,0x4e2093];const petColor=petHue[Math.abs(Number(profile.equippedPet)||0)%petHue.length],petMat=mat(petColor,.26);
part(new THREE.SphereGeometry(.3,14,12),petMat,0,.49,0,companion);part(new THREE.SphereGeometry(.22,12,10),petMat,0,.85,-.08,companion);
for(const side of [-1,1]){part(new THREE.ConeGeometry(.16,.5,6),petMat,side*.19,1.12,-.06,companion).rotation.z=side*-.3;part(new THREE.SphereGeometry(.06,8,8),eyeWhite,side*.12,.89,-.28,companion)}
const wingL=part(new THREE.ConeGeometry(.26,.7,3),petMat,-.39,.58,.16,companion),wingR=part(new THREE.ConeGeometry(.26,.7,3),petMat,.39,.58,.16,companion);wingL.rotation.z=-.7;wingR.rotation.z=.7;
const magicDots=[];for(let i=0;i<20;i++){const m=part(new THREE.SphereGeometry(.025+Math.random()*.035,6,5),new THREE.MeshBasicMaterial({color:i%3===0?0xffd36a:0x75d6fc,transparent:true,opacity:.7}),0,0,0,hero);magicDots.push({m,phase:Math.random()*Math.PI*2,r:1.0+Math.random()*.3})}
const enemies=[];function spawn(){let angle=rng(0,Math.PI*2),dist=rng(16,37),e=new THREE.Group();e.position.set(hero.position.x+Math.cos(angle)*dist,0,hero.position.z+Math.sin(angle)*dist);const body=part(new THREE.DodecahedronGeometry(.75),mat(0x45294f,.1),0,.85,0,e);body.scale.set(1,.7,1.5);part(new THREE.ConeGeometry(.27,.7,5),mat(0x21162c),-.42,1.5,-.35,e);part(new THREE.ConeGeometry(.27,.7,5),mat(0x21162c),.42,1.5,-.35,e);part(geo(.11),mat(0xff3c75,.8),-.23,1.05,.56,e);part(geo(.11),mat(0xff3c75,.8),.23,1.05,.56,e);e.userData={hp:3,lastHit:0};scene.add(e);enemies.push(e)}for(let i=0;i<7;i++)spawn();
let hp=100,kills=0,invuln=0,attacking=0,spellTime=0,jump=0,vertical=0,yaw=0,camPitch=.22,drag=false,lastMouse=0,done=false;const keys=new Set(),particles=[];const clock=new THREE.Clock();
function message(t){$('message').textContent=t;clearTimeout(message.timer);message.timer=setTimeout(()=>$('message').textContent='',2200)}
function hurtEnemy(e,d){e.userData.hp-=d;for(let i=0;i<9;i++){const p=new THREE.Mesh(geo(.06),new THREE.MeshBasicMaterial({color:i%2?0xffb446:0xbb65ff}));p.position.copy(e.position).add(new THREE.Vector3(rng(-.5,.5),rng(.5,1.7),rng(-.5,.5)));p.userData={life:.55,v:new THREE.Vector3(rng(-3,3),rng(1,5),rng(-3,3))};scene.add(p);particles.push(p)}if(e.userData.hp<=0){scene.remove(e);enemies.splice(enemies.indexOf(e),1);kills++;progress.gold+=4;addXP(15);questProgress('wolves');$('kills').textContent=kills;$('objective').textContent='Besiege 5 Schattenwölfe ('+Math.min(kills,5)+'/5)';if(kills===5){done=true;message('🏆 Quest geschafft! Schattenreiche gesichert.')}else message('⚔️ Schattenwolf besiegt!');setTimeout(spawn,2500)}}
function attack(){if(hp<=0||attacking>0)return;attacking=.45;let target=null,dist=4;for(const e of enemies){const dx=e.position.x-hero.position.x,dz=e.position.z-hero.position.z,d=Math.hypot(dx,dz);if(d<dist){target=e;dist=d}}if(target)hurtEnemy(target,1+progress.power);else message('Schwertangriff!')}
function spell(){if(hp<=0||spellTime>0)return;spellTime=2;const dir=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));let target=null,dist=17;for(const e of enemies){const delta=e.position.clone().sub(hero.position);if(delta.length()<dist&&delta.normalize().dot(dir)>.65){target=e;dist=e.position.distanceTo(hero.position)}}if(target){hurtEnemy(target,3+progress.power);message('🔥 Feuerball trifft!')}else message('🔥 Feuerball verfehlt!')}
$('attack').onclick=attack;$('spell').onclick=spell;document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys.add(k);if(k==='j')attack();if(k==='e')spell();if(e.code==='Space'){if(jump===0)vertical=6;e.preventDefault()}});document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));for(const btn of document.querySelectorAll('[data-key]')){const k=btn.dataset.key;btn.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(k)});for(const ev of ['pointerup','pointerleave','pointercancel'])btn.addEventListener(ev,()=>keys.delete(k))}
renderer.domElement.addEventListener('pointerdown',()=>{renderer.domElement.requestPointerLock?.();drag=true});document.addEventListener('pointerlockchange',()=>drag=document.pointerLockElement===renderer.domElement);document.addEventListener('mousemove',e=>{if(drag){yaw-=e.movementX*.003;camPitch=THREE.MathUtils.clamp(camPitch+e.movementY*.002,-.25,.7)}});renderer.domElement.addEventListener('click',attack);
function tick(){requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.045),t=clock.elapsedTime;attacking=Math.max(0,attacking-dt);spellTime=Math.max(0,spellTime-dt);invuln=Math.max(0,invuln-dt);const f=Number(keys.has('w')||keys.has('arrowup'))-Number(keys.has('s')||keys.has('arrowdown')),side=Number(keys.has('d')||keys.has('arrowright'))-Number(keys.has('a')||keys.has('arrowleft'));const speed=keys.has('shift')?10:6;if(f||side){const v=new THREE.Vector3(-Math.sin(yaw)*f+Math.cos(yaw)*side,0,-Math.cos(yaw)*f-Math.sin(yaw)*side).normalize().multiplyScalar(speed*dt);hero.position.add(v);hero.position.x=THREE.MathUtils.clamp(hero.position.x,-140,140);hero.position.z=THREE.MathUtils.clamp(hero.position.z,-140,140);legL.rotation.x=Math.sin(t*11)*.55;legR.rotation.x=-legL.rotation.x;leftArm.rotation.x=-legL.rotation.x*.6;rightArm.rotation.x=-legR.rotation.x*.6}else{legL.rotation.x*=.8;legR.rotation.x*=.8;leftArm.rotation.x*=.8;rightArm.rotation.x*=.8}vertical-=15*dt;jump=Math.max(0,jump+vertical*dt);if(jump===0)vertical=0;hero.position.y=jump+Math.sin(t*3)*.035;hero.rotation.y=yaw;rightArm.rotation.x+=attacking>0?Math.sin((.45-attacking)/.45*Math.PI)*1.1:0;cape.rotation.x=-.14+Math.sin(t*3)*.06;const cp=capeGeometry.attributes.position;for(let i=0;i<cp.count;i++){const k=i*3,px=capeRest[k],py=capeRest[k+1];cp.setXYZ(i,px+Math.sin(t*2.8+py*2)*.055,py,capeRest[k+2]+Math.sin(t*2.3+px*2+py)*.09)}cp.needsUpdate=true;capeGeometry.computeVertexNormals();shoulderGuards.forEach((g,i)=>g.rotation.z=Math.sin(t*6+i*Math.PI)*.045);cloakPanels.forEach((p,i)=>{p.rotation.x=-.18+Math.sin(t*3+i*.55)*.08;p.rotation.z=Math.sin(t*2.2+i*.7)*.055});wingL.rotation.z=-.7+Math.sin(t*9)*.35;wingR.rotation.z=.7-Math.sin(t*9)*.35;sigil.rotation.z=t*.25;capeTail.rotation.z=Math.sin(t*3)*.045;mistLayers.forEach((m,i)=>m.position.x+=Math.sin(t*.12+i)*dt*.09);auraFlames.forEach(({flame,a,phase},i)=>{flame.position.y=.35+(i%6)*.42+Math.sin(t*3+phase)*.2;flame.position.x=Math.cos(a+t*.4)*(1.02+Math.sin(t*2+phase)*.12);flame.position.z=Math.sin(a+t*.4)*.72;flame.scale.y=.8+Math.sin(t*4+phase)*.25});magicDots.forEach((v,i)=>{v.m.position.set(Math.cos(t*.8+v.phase)*v.r,1.1+Math.sin(t*1.4+v.phase)*.65,Math.sin(t*.8+v.phase)*v.r)});companion.position.lerp(hero.position.clone().add(new THREE.Vector3(1.35,.1,.55)),Math.min(1,dt*4));companion.position.y=.2+Math.sin(t*3)*.2;companion.rotation.y=t*.7;
for(const e of enemies){const delta=hero.position.clone().sub(e.position);delta.y=0;const d=delta.length();if(d<28&&d>1.5)e.position.add(delta.normalize().multiplyScalar(dt*(done?1.1:2)));e.rotation.y=Math.atan2(delta.x,delta.z);e.position.y=Math.sin(t*3+e.id)*.07;if(d<1.9&&invuln===0){hp=Math.max(0,hp-8);invuln=1.5;$('hpfill').style.width=hp+'%';$('hptext').textContent=hp+'/100';if(hp===0){message('💀 Besiegt! Du erwachst am Portal.');setTimeout(()=>{hp=100;hero.position.set(0,0,0);$('hpfill').style.width='100%';$('hptext').textContent='100/100'},1500)}}}
for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.userData.life-=dt;p.position.addScaledVector(p.userData.v,dt);p.userData.v.y-=9*dt;p.scale.setScalar(Math.max(.05,p.userData.life));if(p.userData.life<=0){scene.remove(p);particles.splice(i,1)}}
fireflies.forEach(f=>{f.position.y=f.userData.y+Math.sin(t*1.8+f.userData.phase)*.45;f.position.x=f.userData.x+Math.sin(t*.5+f.userData.phase)*.3});const offset=new THREE.Vector3(Math.sin(yaw)*7,3.2+camPitch*7,Math.cos(yaw)*7);camera.position.lerp(hero.position.clone().add(offset),Math.min(1,dt*7));camera.lookAt(hero.position.x,hero.position.y+1.5,hero.position.z);pond.material.opacity=.78+Math.sin(t*1.6)*.035;renderer.render(scene,camera)}

// Persistent single-player RPG foundation. Online multiplayer requires a separate server.
const RPG_KEY='megapower_schattenreiche_progress_v1';
let progress;try{progress=JSON.parse(localStorage.getItem(RPG_KEY)||'null')}catch{}
if(!progress||!progress.quests)progress={level:1,xp:0,gold:25,points:0,power:0,vitality:0,potions:3,quests:{wolves:0,crystals:0,boss:0},completed:{},class:'Krieger',weapon:'Reiseschwert'};
const quests=[{id:'wolves',name:'Schattenwölfe',goal:5,exp:90,gold:40},{id:'crystals',name:'Arkankristalle',goal:4,exp:120,gold:55},{id:'boss',name:'Ruinenwächter',goal:1,exp:240,gold:100}];
const crystals=[];for(let i=0;i<12;i++){const x=rng(-65,65),z=rng(-85,-30),c=new THREE.Mesh(new THREE.OctahedronGeometry(.5),crystalMaterial);c.position.set(x,.75,z);c.scale.y=1.7;scene.add(c);crystals.push(c)}
const village=new THREE.Group();village.position.set(26,0,8);scene.add(village);
const wallMat=mat(0xa38b71),roofMat=mat(0x453b55);
for(const [x,z] of [[-9,-5],[0,-8],[9,-4],[-7,8],[8,9]]){const house=new THREE.Group();house.position.set(x,0,z);village.add(house);const walls=new THREE.Mesh(new THREE.BoxGeometry(6,4,5),wallMat);walls.position.y=2;house.add(walls);const roof=new THREE.Mesh(new THREE.ConeGeometry(4.6,3,4),roofMat);roof.position.y=5.4;roof.rotation.y=Math.PI/4;house.add(roof);const door=new THREE.Mesh(new THREE.BoxGeometry(1.3,2,.12),bark);door.position.set(0,1,2.56);house.add(door)}
const npcList=[];for(const [name,x,z,color] of [['Hauptmann Arin',17,6,0x355d9e],['Waldhüterin Lyra',31,17,0x42734c],['Schmied Borin',33,0,0x935c35]]){const npc=new THREE.Group();npc.position.set(x,0,z);scene.add(npc);const body=new THREE.Mesh(new THREE.CylinderGeometry(.4,.35,1.1,10),mat(color));body.position.y=1.45;npc.add(body);const face=new THREE.Mesh(new THREE.SphereGeometry(.32,12,10),skin);face.position.y=2.3;npc.add(face);npcList.push({name,npc})}
function persistRpg(){try{localStorage.setItem(RPG_KEY,JSON.stringify(progress))}catch{}}
function rpgUI(){$('rpgStatus').textContent='Level '+progress.level+' · '+progress.class+' · '+progress.xp+'/'+progress.level*100+' EP · '+progress.gold+' Gold · '+progress.potions+' Tränke';$('rpgQuests').replaceChildren();for(const q of quests){const p=document.createElement('p');p.textContent=(progress.completed[q.id]?'✓ ':'◇ ')+q.name+': '+Math.min(progress.quests[q.id]||0,q.goal)+'/'+q.goal;$('rpgQuests').append(p)}$('lvl').textContent=progress.level}
function addXP(amount){progress.xp+=amount;while(progress.xp>=progress.level*100){progress.xp-=progress.level*100;progress.level++;progress.points++;hp=100;message('✨ Levelaufstieg! '+progress.level+' · Talentpunkt erhalten')}persistRpg();rpgUI()}
function questProgress(id){if(progress.completed[id])return;const q=quests.find(v=>v.id===id);progress.quests[id]=(progress.quests[id]||0)+1;if(progress.quests[id]>=q.goal){progress.completed[id]=true;progress.gold+=q.gold;addXP(q.exp);message('🏆 Quest: '+q.name+' abgeschlossen!')}persistRpg();rpgUI()}
function rpgInteract(){for(const n of npcList){if(n.npc.position.distanceTo(hero.position)<4){if(n.name==='Schmied Borin'){if(progress.gold>=50){progress.gold-=50;progress.weapon='Stahlschwert';message('⚔️ Stahlschwert gekauft!')}else message('Schmied: Ein Stahlschwert kostet 50 Gold.')}else message(n.name+': Besiege Wölfe, sammle Kristalle und bezwinge den Wächter!');persistRpg();rpgUI();return}}for(const c of crystals){if(c.visible&&c.position.distanceTo(hero.position)<3){c.visible=false;questProgress('crystals');message('💎 Arkankristall gefunden!');return}}message('Niemand in Reichweite.')}
$('rpgTalent').onclick=()=>{if(progress.points>0){progress.points--;progress.power++;message('✨ Kampfkraft verbessert!')}else message('Noch keine Talentpunkte.');persistRpg();rpgUI()};
$('rpgPotion').onclick=()=>{if(progress.potions>0){progress.potions--;hp=Math.min(100,hp+50);$('hpfill').style.width=hp+'%';$('hptext').textContent=hp+'/100';message('🧪 Heiltrank verwendet')}else message('Keine Tränke mehr');persistRpg();rpgUI()};
$('rpgSave').onclick=()=>{persistRpg();message('💾 Fortschritt gespeichert')};
$('rpgNew').onclick=()=>{if(confirm('Gespeicherten Schattenreiche-Fortschritt wirklich zurücksetzen?')){localStorage.removeItem(RPG_KEY);location.reload()}};
document.addEventListener('keydown',e=>{if(e.target?.matches('input,textarea'))return;if(e.key.toLowerCase()==='f')rpgInteract()});
window.addEventListener('beforeunload',persistRpg);setInterval(persistRpg,15000);
rpgUI();

window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});$('loading').remove();message('Willkommen in den Schattenreichen!');tick();