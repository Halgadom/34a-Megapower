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
