/* Drachenfels equipment progression – 100% offline and fictional currency only */
(()=>{'use strict';
const rarity=[{name:'Gewöhnlich',color:'#c5c9c5',weight:55,mult:1},{name:'Ungewöhnlich',color:'#72d6a1',weight:28,mult:1.35},{name:'Selten',color:'#66aaff',weight:12,mult:1.8},{name:'Episch',color:'#bd8cff',weight:4,mult:2.6},{name:'Legendär',color:'#ffb74b',weight:1,mult:4}];
const templates=[
{slot:'weapon',name:'Klinge des Morgenrots',icon:'⚔️',stat:'atk',base:12},
{slot:'weapon',name:'Waldjägerbogen',icon:'🏹',stat:'atk',base:11},
{slot:'weapon',name:'Sternenstab',icon:'🪄',stat:'atk',base:13},
{slot:'head',name:'Drachenhelm',icon:'🪖',stat:'def',base:9},
{slot:'chest',name:'Wächterbrustpanzer',icon:'🛡️',stat:'def',base:15},
{slot:'hands',name:'Runenhandschuhe',icon:'🧤',stat:'atk',base:5},
{slot:'feet',name:'Windläuferstiefel',icon:'🥾',stat:'def',base:7},
{slot:'ring',name:'Ring der Sternenglut',icon:'💍',stat:'atk',base:7},
{slot:'amulet',name:'Amulett des Lichts',icon:'📿',stat:'hp',base:22},
{slot:'cape',name:'Mantel der Schatten',icon:'🧥',stat:'hp',base:18}
];let serial=0;
function roll(level=1,forced){const weights=rarity.reduce((s,r)=>s+r.weight,0);let n=Math.random()*weights,i=0;for(;i<rarity.length-1;i++){n-=rarity[i].weight;if(n<0)break}const r=forced==null?i:Math.max(0,Math.min(4,forced));const t=templates[Math.floor(Math.random()*templates.length)];return{id:'loot_'+Date.now().toString(36)+'_'+(++serial)+'_'+Math.floor(Math.random()*999999),slot:t.slot,name:t.name,icon:t.icon,rarity:r,level:Math.max(1,level|0),upgrade:0,stat:t.stat,base:t.base,bonus:Math.round((t.base+level*1.8)*rarity[r].mult),value:Math.round((t.base+level*3)*(r+1)*2)}}
function stats(s){let atk=0,def=0,hp=0;for(const id of Object.values(s.equipped||{})){const item=(s.gear||[]).find(x=>x.id===id);if(!item)continue;const v=item.bonus+item.upgrade*4;if(item.stat==='atk')atk+=v;else if(item.stat==='def')def+=v;else hp+=v}return{atk,def,hp}}
function add(s,item){s.gear??=[];if(s.gear.length>=70)return false;s.gear.push(item);return true}
function equip(s,id){s.gear??=[];s.equipped??={};const it=s.gear.find(x=>x.id===id);if(!it)return false;s.equipped[it.slot]=it.id;return true}
function sell(s,id){const it=(s.gear||[]).find(x=>x.id===id);if(!it||Object.values(s.equipped||{}).includes(id))return false;s.gold+=it.value+it.upgrade*10;s.gear=s.gear.filter(x=>x.id!==id);return true}
function enhance(s,id){const it=(s.gear||[]).find(x=>x.id===id);if(!it)return{ok:false,reason:'Gegenstand nicht gefunden.'};if(it.upgrade>=10)return{ok:false,reason:'Maximalstufe +10 erreicht.'};const cost=25+(it.upgrade+1)*20;if(s.gold<cost)return{ok:false,reason:'Du benötigst '+cost+' Gold.'};s.gold-=cost;const chance=Math.max(.25,.95-it.upgrade*.075);const success=Math.random()<chance;if(success)it.upgrade++;return{ok:true,success,cost,chance,upgrade:it.upgrade}}
function gamble(s){const cost=45;if(s.gold<cost)return{ok:false,reason:'Du benötigst 45 erspieltes Gold.'};if((s.gear||[]).length>=70)return{ok:false,reason:'Dein Inventar ist voll.'};s.gold-=cost;const item=roll(s.level);add(s,item);return{ok:true,item}}
window.DrachenfelsGear={rarity,templates,roll,stats,add,equip,sell,enhance,gamble};
})();