/* 34a MEGAPOWER – rein lokale, kostenlose Atmosphaere und Begleiter-Effekte. */
(()=>{'use strict';
const pets={ember:{mark:'🔥',a:'#ff9b40',b:'#ffdf79'},frost:{mark:'❄',a:'#7bdcff',b:'#e2fbff'},forest:{mark:'🍃',a:'#64d78c',b:'#d7ff9c'},storm:{mark:'⚡',a:'#b18bff',b:'#f0d7ff'},gold:{mark:'✦',a:'#ffcc49',b:'#fff3ae'},shadow:{mark:'☾',a:'#a77aff',b:'#e0baff'}};
const style=document.createElement('style');style.textContent=`
:root{--kingdom-sky:#13253e;--kingdom-glow:#a2d7ff}
body.kingdom-morning{--kingdom-sky:#705a83;--kingdom-glow:#ffdba2}
body.kingdom-day{--kingdom-sky:#2477a4;--kingdom-glow:#ffdf8d}
body.kingdom-evening{--kingdom-sky:#713b6b;--kingdom-glow:#ffae6c}
body.kingdom-night{--kingdom-sky:#101c38;--kingdom-glow:#9fbbff}
#kingdom-atmosphere{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;opacity:.45;background:radial-gradient(ellipse at 85% 5%,var(--kingdom-glow),transparent 33%);transition:background 1s}
#kingdom-atmosphere .kingdom-orb{position:absolute;right:8%;top:5%;width:50px;height:50px;border-radius:50%;background:var(--kingdom-glow);box-shadow:0 0 55px var(--kingdom-glow);opacity:.35}
#kingdom-atmosphere .kingdom-star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;animation:kingdomTwinkle 3s ease-in-out infinite alternate}
#kingdom-atmosphere .kingdom-weather{position:absolute;inset:-15% 0 0;opacity:.28;background-image:radial-gradient(2px 5px at 8px 8px,#d1ecff 90%,transparent),radial-gradient(2px 5px at 50px 35px,#d1ecff 90%,transparent);background-size:75px 85px;animation:kingdomRain 9s linear infinite}
body.kingdom-snow #kingdom-atmosphere .kingdom-weather{background-image:radial-gradient(3px 3px at 10px 12px,#fff 95%,transparent),radial-gradient(4px 4px at 55px 35px,#fff 95%,transparent);animation-duration:22s}
@keyframes kingdomRain{to{transform:translateY(85px)}}@keyframes kingdomTwinkle{to{opacity:.15;transform:scale(.5)}}
.dragon-pet{--pet-accent:#ffba60;--pet-light:#fff3c1;isolation:isolate}
.dragon-pet .pet-creature{display:inline-block;position:relative;z-index:2;animation:kingdomPetBreathe 2.4s ease-in-out infinite;filter:drop-shadow(0 0 9px var(--pet-accent))}
.dragon-pet:before{content:attr(data-pet-mark);position:absolute;left:-13px;top:-19px;font-size:18px;color:var(--pet-light);animation:kingdomPetOrbit 3.1s ease-in-out infinite}
.dragon-pet:after{content:'✦';position:absolute;right:-11px;bottom:-11px;color:var(--pet-accent);font-size:17px;animation:kingdomPetOrbit 2.5s ease-in-out infinite reverse}
.pet-shop-card .pet-shop-icon{animation:petFloat 3s ease-in-out infinite,kingdomPetShine 4s ease-in-out infinite}
.pet-ember{--pet-accent:#ff9b40;--pet-light:#ffdf79}.pet-frost{--pet-accent:#7bdcff;--pet-light:#e2fbff}.pet-forest{--pet-accent:#64d78c;--pet-light:#d7ff9c}.pet-storm{--pet-accent:#b18bff;--pet-light:#f0d7ff}.pet-gold{--pet-accent:#ffcc49;--pet-light:#fff3ae}.pet-shadow{--pet-accent:#a77aff;--pet-light:#e0baff}
@keyframes kingdomPetBreathe{50%{transform:scale(1.15) rotate(5deg)}}@keyframes kingdomPetOrbit{50%{transform:translate(6px,-8px) rotate(30deg);opacity:.5}}@keyframes kingdomPetShine{50%{filter:drop-shadow(0 0 20px var(--pet-accent))}}
#kingdom-settings{position:fixed;right:12px;bottom:12px;z-index:9998;border:1px solid #b69b6c;border-radius:14px;background:#1c2139ed;color:#fff;padding:8px 11px;font:600 12px system-ui;box-shadow:0 3px 15px #0006;cursor:pointer}
#kingdom-settings:focus-visible{outline:3px solid #ffd56e}
@media(prefers-reduced-motion:reduce){#kingdom-atmosphere *, .dragon-pet *, .dragon-pet:before,.dragon-pet:after,.pet-shop-card .pet-shop-icon{animation:none!important}}
`;document.head.append(style);
const key='34a-kingdom-atmosphere-v1';let enabled=true;try{enabled=localStorage.getItem(key)!=='off'}catch{}
const overlay=document.createElement('div');overlay.id='kingdom-atmosphere';overlay.setAttribute('aria-hidden','true');document.body.append(overlay);
for(let i=0;i<18;i++){const s=document.createElement('i');s.className='kingdom-star';s.style.left=(i*47%97)+'%';s.style.top=(i*31%63)+'%';s.style.animationDelay=(i%7*.4)+'s';overlay.append(s)}
const orb=document.createElement('i');orb.className='kingdom-orb';overlay.append(orb);
const weather=document.createElement('i');weather.className='kingdom-weather';overlay.append(weather);
const btn=document.createElement('button');btn.id='kingdom-settings';btn.type='button';btn.title='Kostenlose Wetter- und Lichtanimationen ein- oder ausschalten';document.body.append(btn);
function update(){const h=new Date().getHours(),period=h>=6&&h<11?'morning':h>=11&&h<17?'day':h>=17&&h<21?'evening':'night';document.body.classList.remove('kingdom-morning','kingdom-day','kingdom-evening','kingdom-night','kingdom-snow');document.body.classList.add('kingdom-'+period);const d=new Date().getDate();const mode=d%7===0?'snow':d%3===0?'rain':'clear';document.body.classList.toggle('kingdom-snow',mode==='snow');overlay.style.display=enabled?'':'none';weather.style.display=mode==='clear'?'none':'';overlay.querySelectorAll('.kingdom-star').forEach(s=>s.style.display=period==='night'?'':'none');btn.textContent='🌦️ Königreich: '+(enabled?'An':'Aus');}
btn.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off')}catch{}update()});update();setInterval(update,60000);
function decorate(root){const nodes=[];if(root.nodeType===1&&root.matches('.dragon-pet'))nodes.push(root);if(root.querySelectorAll)nodes.push(...root.querySelectorAll('.dragon-pet'));for(const el of nodes){if(el.dataset.petMark)continue;const id=Object.keys(pets).find(x=>el.classList.contains('pet-'+x));if(id){el.dataset.petMark=pets[id].mark;el.style.setProperty('--pet-accent',pets[id].a);el.style.setProperty('--pet-light',pets[id].b)}}}
decorate(document);new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)decorate(n)}).observe(document.body,{childList:true,subtree:true});
})();