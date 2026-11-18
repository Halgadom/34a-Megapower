/* Kostenloses Bosskampf-Upgrade: rein visuell, keine externen Dienste. */
(()=>{'use strict';
const css=`
.boss-arena.mp-cinematic{position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 50% 30%,#75314b,#29132f 65%,#0d0b1e);border:2px solid #ffab59;box-shadow:0 0 32px #ff703d77,inset 0 0 45px #ff753322;transition:background .6s,box-shadow .6s}
.mp-cinematic .boss-dragon{display:block;position:relative;z-index:2;font-size:clamp(92px,15vw,155px);filter:drop-shadow(0 0 18px #ffb050);animation:mp-dragon 2.3s ease-in-out infinite}
.mp-cinematic .boss-bar{position:relative;z-index:2;border:1px solid #ffffff55;box-shadow:0 0 14px #f9754255;height:23px}
.mp-cinematic .boss-bar span{transition:width .7s cubic-bezier(.2,.8,.2,1)}
.mp-cinematic.mp-inferno{background:radial-gradient(ellipse at 50% 30%,#9d291e,#341020 68%,#100b19);box-shadow:0 0 38px #ff4a2d88}
.mp-cinematic.mp-rage{background:radial-gradient(ellipse at 50% 30%,#632f9c,#18133e 68%,#090a22);border-color:#c5a1ff;box-shadow:0 0 42px #a266ff99}
.mp-cinematic.mp-rage .boss-dragon{animation-duration:1.2s;filter:drop-shadow(0 0 22px #c093ff)}
.mp-boss-phase{position:relative;z-index:3;font-size:clamp(14px,3vw,22px);font-weight:900;color:#fff1c0;letter-spacing:.07em;text-shadow:0 0 12px #ff9b34;margin:8px auto}
.mp-phase-pop{animation:mp-pop .9s ease-out}
.mp-boss-embers{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at 50% 65%,#ff8c3322,transparent 60%);animation:mp-glow 2s ease-in-out infinite alternate}
.mp-boss-embers:after{content:'✦  ✧  ✦  ✧  ✦';position:absolute;inset:8px 0 auto;color:#ffbe8b77;letter-spacing:1.5em;animation:mp-glow 3s infinite alternate}
.mp-boss-burst{position:absolute;inset:0;pointer-events:none;z-index:8}
.mp-boss-spark{position:absolute;left:50%;top:40%;font-size:24px;text-shadow:0 0 12px #ffb155;animation:mp-spark 1.2s ease-out forwards}
.mp-boss-shake{animation:mp-shake .45s ease-in-out}
.mp-boss-transform{animation:mp-transform .9s ease-in-out}
@keyframes mp-dragon{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg) scale(1.08)}}
@keyframes mp-glow{to{opacity:.35;filter:brightness(1.6)}}
@keyframes mp-pop{0%{opacity:0;transform:scale(.65) translateY(-20px)}65%{transform:scale(1.1)}100%{opacity:1;transform:none}}
@keyframes mp-spark{to{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--r)) scale(1.5)}}
@keyframes mp-shake{20%{transform:translate(-7px,3px)}40%{transform:translate(7px,-3px)}60%{transform:translate(-5px,2px)}80%{transform:translate(4px,-2px)}}
@keyframes mp-transform{45%{filter:brightness(2.4) saturate(2)}}
@media(prefers-reduced-motion:reduce){.mp-cinematic *,.mp-boss-shake,.mp-boss-transform{animation:none!important;transition:none!important}.mp-boss-burst{display:none}}
`;
const st=document.createElement('style');st.textContent=css;document.head.append(st);
let previous=null,seen=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function burst(a,type,n){if(reduced)return;const layer=document.createElement('div');layer.className='mp-boss-burst';a.append(layer);const symbols=type==='win'?['🏆','✨','⭐']:type==='phase'?['🔥','⚡','✦']:['⚔️','💥','✧'];for(let i=0;i<n;i++){const p=document.createElement('span');p.className='mp-boss-spark';p.textContent=symbols[i%symbols.length];const angle=i*Math.PI*2/n,dist=60+Math.random()*135;p.style.setProperty('--x',Math.cos(angle)*dist+'px');p.style.setProperty('--y',Math.sin(angle)*dist+'px');p.style.setProperty('--r',(Math.random()*540)+'deg');p.style.animationDelay=(Math.random()*.15)+'s';layer.append(p)}setTimeout(()=>layer.remove(),1600)}
function phase(a,label){let b=a.querySelector('.mp-boss-phase');if(!b){b=document.createElement('div');b.className='mp-boss-phase';a.prepend(b)}b.textContent=label;b.classList.remove('mp-phase-pop');void b.offsetWidth;b.classList.add('mp-phase-pop')}
function scan(){const a=document.querySelector('.boss-arena');if(!a){previous=null;seen=false;return}if(!a.classList.contains('mp-cinematic')){a.classList.add('mp-cinematic');const e=document.createElement('div');e.className='mp-boss-embers';e.setAttribute('aria-hidden','true');a.prepend(e)}
const m=(a.textContent||'').match(/(\d+)\s*\/\s*(\d+)\s*LP/);if(!m)return;const hp=+m[1],max=+m[2],damage=1-hp/Math.max(1,max),level=damage>=.7?2:damage>=.35?1:0;
a.classList.toggle('mp-inferno',level===1);a.classList.toggle('mp-rage',level===2);
if(!previous||previous.max!==max||hp>previous.hp){previous={hp,max,level};phase(a,'🐉 DER DRACHE ERWACHT');if(!seen){seen=true;burst(a,'phase',18)}return}
if(hp<previous.hp){burst(a,hp===0?'win':'hit',hp===0?42:20);a.classList.remove('mp-boss-shake');void a.offsetWidth;a.classList.add('mp-boss-shake');setTimeout(()=>a.classList.remove('mp-boss-shake'),500)}
if(level>previous.level){phase(a,level===1?'🔥 PHASE II · INFERNO':'⚡ PHASE III · DRACHENZORN');burst(a,'phase',32);a.classList.add('mp-boss-transform');setTimeout(()=>a.classList.remove('mp-boss-transform'),950)}
if(hp===0&&previous.hp>0)phase(a,'🏆 BOSS BESIEGT!');
previous={hp,max,level}}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;scan()})}).observe(document.body,{subtree:true,childList:true});scan();
})();