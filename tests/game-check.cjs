const fs=require('node:fs');const assert=require('node:assert/strict');const vm=require('node:vm');const path=require('node:path');
const root=path.resolve(__dirname,'..');const js=fs.readFileSync(path.join(root,'drachenfels-3d.js'),'utf8');
const pages=['drachenfels.html','drachenfels-3d.html'];
function test(name,fn){try{fn();console.log('✓ '+name)}catch(e){console.error('✗ '+name+'\n'+e.stack);process.exitCode=1}}
test('Game JavaScript parses',()=>new vm.Script(js,{filename:'drachenfels-3d.js'}));
test('Both public pages show development notice, not a playable beta',()=>{for(const file of pages){const html=fs.readFileSync(path.join(root,file),'utf8');assert.match(html,/In Entwicklung/);assert.doesNotMatch(html,/src=["'].*drachenfels-3d\.js/);assert.doesNotMatch(html,/<canvas\s+id=["']game/)}});
test('Three.js runtime is required, not paid assets',()=>{assert.match(js,/window\.THREE/);assert.doesNotMatch(js,/stripe|paypal|in.app.purchase|premium.subscription/i)});
test('Core game content is preserved',()=>{for(const feature of ['function makeCharacter','function rebuildGear','function animate(t)','function interact()','function updateMiniMap','function openTreasure','function updateSky','function spellBolt'])assert.ok(js.includes(feature),feature)});
test('No leftover V20 diagnostic graphics',()=>{assert.ok(!js.includes('GRAFIKTEST V20'));assert.ok(!js.includes('heroAura.rotation'))});
test('No undefined velocity used in cape animation',()=>{assert.ok(!js.includes('velocity.x'))});
test('Save compatibility key is preserved',()=>assert.match(js,/drachenfels-3d-save/));

test('Equipment is attached to articulated limbs',()=>{for(const part of ['g.userData.gauntlets=gauntlets','g.userData.greaves=greaves','heldSwordMount.add(sword)','g.userData.gauntlets||arms.map','g.userData.greaves||legs.map'])assert.ok(js.includes(part),part)});
test('Only one cape mesh per hero',()=>{assert.ok(js.includes('g.userData.cloak=g.userData.capeMesh'));assert.ok(!js.includes('new TH.PlaneGeometry(1.5,2.2,6,9)'))});

test('Armor mounts are reused and sword does not accumulate after re-equipping',()=>{for(const token of ['g.userData.shoulderMounts||arms.map','g.userData.heldSwordMount||new TH.Group()','heldSwordMount.add(sword)','shoulderMounts[x===-1?0:1]','shoulderMounts[side===-1?0:1]'])assert.ok(js.includes(token),token);assert.ok(!js.includes('arms[0].userData.forearm.add(sword)'))});

test('Locomotion uses delta-time blending and smooth articulated joints',()=>{for(const token of ['const locomotion={speed:0,phase:0,heading:0}','function smoothJoint(','locomotion.phase+=dt*','hero.rotation.y+=turn*','leg.userData.shin.rotation.x=smoothJoint'])assert.ok(js.includes(token),token)});

test('Character face and hair react to helmets',()=>{for(const token of ['const hairRoot=new TH.Group()','g.userData.hairRoot.visible=!helm','const mouth=mesh(body','const nostril=sphere(body','head,hairRoot,torso'])assert.ok(js.includes(token),token)});

test('Hero silhouette has shaped torso, limbs and layered cuirass',()=>{for(const token of ['new TH.LatheGeometry(torsoProfile,20)','new TH.LatheGeometry(vestProfile,20)','const pelvis=mesh(body','const chestContour=mesh(body','const panelShape=new TH.Shape()'])assert.ok(js.includes(token),token)});

test('Four distinct armor themes have geometry and use saved class',()=>{for(const token of ["armorTheme==='dragon'","armorTheme==='ranger'","armorTheme==='arcane'","const themeColors=","state.class==='Waldläufer'","state.class==='Arkanist'"])assert.ok(js.includes(token),token)});

test('Forest undergrowth uses instancing and preserves road clearings',()=>{for(const token of ['const forestFloor=new TH.Group()','const foliageShape=new TH.Shape()','function forestClearing(x,z)','new TH.InstancedMesh(foliageGeo,leafMat,650)','new TH.InstancedMesh(shrubGeo','forestFloor.add(shrubs)'])assert.ok(js.includes(token),token)});

test('Forest trees have distinct oak birch and pine silhouettes',()=>{for(const token of ["species=seed%9<5?'oak'","species==='birch'","species==='pine'","const pineGeo=new TH.ConeGeometry","const birchBark=mat","const pineLeaves="])assert.ok(js.includes(token),token)});

test('Forest terrain roads light and castle approach are implemented',()=>{for(const token of ['const groundPatches=new TH.Group()','new TH.InstancedMesh(patchGeo,patchMat,460)','const pathEdgeMat=','function path(x,z,w,d)','sun.color.copy(new TH.Color','renderer.toneMappingExposure=1.02+day*.2','function castleApproach()','castleApproach();'])assert.ok(js.includes(token),token)});

test('Castle towers have architectural layers and trees have buttress roots',()=>{for(const token of ['const castleWindowMat=','for(const y of [h*.35,h*.7,h-.8])','const crenel=box(g','for(let root=0;root<3;root++)','const buttress=mesh(g'])assert.ok(js.includes(token),token)});
