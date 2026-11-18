/* Animated vector boss, no images, purchases or external requests */
(()=>{'use strict';
const css=`
.mp-dragon-stage{width:min(100%,410px);height:260px;position:relative;margin:0 auto;perspective:700px;z-index:3;pointer-events:none}
.mp-dragon-svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 14px 15px #0009);animation:mp-hover 2.6s ease-in-out infinite}
.mp-dragon-svg .mp-wing-left{transform-origin:185px 123px;animation:mp-flap-left 1.3s ease-in-out infinite}
.mp-dragon-svg .mp-wing-right{transform-origin:215px 123px;animation:mp-flap-right 1.3s ease-in-out infinite}
.mp-dragon-svg .mp-tail{transform-origin:200px 175px;animation:mp-tail 2s ease-in-out infinite}
.mp-dragon-svg .mp-head{transform-origin:201px 100px;animation:mp-head 2.3s ease-in-out infinite}
.mp-dragon-svg .mp-eyes{animation:mp-eyes 3s ease-in-out infinite}
.mp-dragon-svg .mp-flame{transform-origin:202px 83px;animation:mp-breath 4.5s ease-in-out infinite}
.mp-dragon-stage:after{content:'';position:absolute;bottom:2px;left:28%;width:44%;height:18px;border-radius:50%;background:#0008;filter:blur(10px);animation:mp-shadow 2.6s ease-in-out infinite}
.mp-dragon-stage .mp-orbit{position:absolute;inset:8% 15%;border:1px solid #ffcc7066;border-radius:50%;transform:rotateX(72deg);box-shadow:0 0 18px #ff9d4477;animation:mp-orbit 8s linear infinite}
.mp-rage .mp-dragon-svg{filter:drop-shadow(0 0 25px #b66bff)}
.mp-inferno .mp-dragon-svg{filter:drop-shadow(0 0 24px #ff512e)}
@keyframes mp-hover{50%{transform:translateY(-15px) rotate(-2deg)}}
@keyframes mp-flap-left{0%,100%{transform:rotate(-11deg) scaleY(.92)}50%{transform:rotate(13deg) scaleY(1.12)}}
@keyframes mp-flap-right{0%,100%{transform:rotate(11deg) scaleY(.92)}50%{transform:rotate(-13deg) scaleY(1.12)}}
@keyframes mp-tail{50%{transform:rotate(13deg)}}
@keyframes mp-head{50%{transform:rotate(-5deg) translateY(3px)}}
@keyframes mp-eyes{0%,93%,100%{opacity:1}95%{opacity:.12}}
@keyframes mp-breath{0%,48%,76%,100%{opacity:0;transform:scale(.1)}55%,68%{opacity:1;transform:scale(1)}}
@keyframes mp-shadow{50%{transform:scale(.8);opacity:.5}}
@keyframes mp-orbit{to{transform:rotateX(72deg) rotateZ(360deg)}}
@media(prefers-reduced-motion:reduce){.mp-dragon-stage *, .mp-dragon-stage:after{animation:none!important}}
`;
const st=document.createElement('style');st.textContent=css;document.head.append(st);
const svg=`<svg class="mp-dragon-svg" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animierter Drachenboss mit schlagenden Flügeln, beweglichem Schwanz und Feueratem">
<defs><linearGradient id="mpScale" x2=".8" y2="1"><stop stop-color="#b0ef72"/><stop offset=".48" stop-color="#3c9c5a"/><stop offset="1" stop-color="#145747"/></linearGradient><linearGradient id="mpWing"><stop stop-color="#8cdb70"/><stop offset="1" stop-color="#285c6b"/></linearGradient><linearGradient id="mpFire" x2="0" y2="1"><stop stop-color="#fff9b5"/><stop offset=".5" stop-color="#ffb332"/><stop offset="1" stop-color="#fa3c22"/></linearGradient></defs>
<g class="mp-tail"><path d="M197 171 Q155 207 222 224 Q273 248 309 212 Q282 229 256 214 Q232 199 223 171" fill="url(#mpScale)" stroke="#173e37" stroke-width="4"/><path d="M301 214 324 203 311 227Z" fill="#d4ec75"/></g>
<g class="mp-wing-left"><path d="M185 130 Q133 40 31 35 L57 87 13 111 80 125 56 169 135 151Z" fill="url(#mpWing)" stroke="#174a45" stroke-width="5"/><path d="M181 130 31 35 M181 130 13 111 M181 130 56 169" fill="none" stroke="#b8ed9d" stroke-width="3" opacity=".8"/></g>
<g class="mp-wing-right"><path d="M215 130 Q268 40 369 35 L343 87 387 111 320 125 344 169 265 151Z" fill="url(#mpWing)" stroke="#174a45" stroke-width="5"/><path d="M219 130 369 35 M219 130 387 111 M219 130 344 169" fill="none" stroke="#b8ed9d" stroke-width="3" opacity=".8"/></g>
<path d="M166 168 148 193 179 183 190 210 204 185 225 210 237 183 259 195 244 161" fill="#246a50" stroke="#153f38" stroke-width="4"/>
<ellipse cx="201" cy="149" rx="55" ry="65" fill="url(#mpScale)" stroke="#174b3a" stroke-width="5"/>
<path d="M184 115 Q200 101 217 115 L227 179 Q202 195 175 179Z" fill="#d8c979" opacity=".9"/>
<path d="M161 119 137 136 153 153 170 139 M239 119 264 136 249 153 230 139" fill="#4b9e57" stroke="#184c3b" stroke-width="4"/>
<g class="mp-head"><path d="M168 105 147 64 178 83 184 52 198 81 217 52 224 83 253 64 232 107" fill="#c0dc7d" stroke="#21543e" stroke-width="4"/>
<path d="M163 99 Q165 65 201 67 Q239 65 241 99 L228 131 Q200 151 173 131Z" fill="url(#mpScale)" stroke="#174b3a" stroke-width="5"/>
<path d="M182 113 Q200 104 218 113 L231 134 Q201 153 171 134Z" fill="#8ac36b" stroke="#205443" stroke-width="3"/>
<g class="mp-eyes"><path d="M174 96 Q184 88 194 98 L192 108 178 108Z M208 98 Q218 88 228 96 L225 108 210 108Z" fill="#ffdf55"/><path d="M186 96v11 M216 96v11" stroke="#1b2530" stroke-width="4"/></g>
<circle cx="183" cy="127" r="3" fill="#244b37"/><circle cx="219" cy="127" r="3" fill="#244b37"/>
<g class="mp-flame"><path d="M194 130 Q155 105 179 52 Q181 80 196 61 Q210 37 216 13 Q248 83 207 131Z" fill="url(#mpFire)" opacity=".92"/><path d="M199 124 Q185 91 204 71 Q221 103 199 124" fill="#fff5a1"/></g></g>
<path d="M168 183 152 205 176 199 187 185 M232 183 248 205 224 199 213 185" fill="#316e4b" stroke="#184536" stroke-width="4"/>
</svg>`;
function upgrade(){document.querySelectorAll('.boss-arena .boss-dragon').forEach(el=>{if(el.dataset.mpVector)return;el.dataset.mpVector='1';el.textContent='';const stage=document.createElement('div');stage.className='mp-dragon-stage';stage.innerHTML='<div class="mp-orbit"></div>'+svg;el.append(stage)})}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;upgrade()})}).observe(document.body,{childList:true,subtree:true});upgrade();
})();