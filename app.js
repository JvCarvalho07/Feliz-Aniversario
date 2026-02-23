/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progress').style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ── INTRO PETALS ── */
(function () {
  const wrap = document.querySelector('.intro-petals');
  if (!wrap) return;
  const emojis = ['🌸','🌷','🤍','✨','💕'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'intro-petal';
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.75 + Math.random() * 0.7) + 'rem';
    el.style.animationDuration = (9 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 9) + 's';
    wrap.appendChild(el);
  }
})();

/* ── ENTER SITE ── */
function enterSite() {
  document.getElementById('intro').classList.add('leaving');
  document.body.style.overflow = '';
  setTimeout(() => document.getElementById('intro').style.display = 'none', 950);
  setTimeout(() => {
    ['hero-eyebrow','hero-title','hero-name','hero-heart']
      .forEach(c => document.querySelector('.'+c)?.classList.add('vis'));
  }, 180);
}
window.enterSite = enterSite;
document.body.style.overflow = 'hidden';

/* ── PARTICLES in carta-section ── */
(function () {
  const c = document.querySelector('#carta-section .particles');
  if (!c) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = 2 + Math.random() * 4;
    p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;
      --dx:${(Math.random()-0.5)*80}px;
      animation-duration:${12+Math.random()*16}s;
      animation-delay:${Math.random()*14}s;
      opacity:${0.15+Math.random()*0.35};`;
    c.appendChild(p);
  }
})();

/* ── INTERSECTION OBSERVER ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

['.hero-eyebrow','.hero-title','.hero-name','.hero-heart',
 '.counter-intro','.c-card','.p-card','#envelope-stage'
].forEach(sel => document.querySelectorAll(sel).forEach(el => obs.observe(el)));

/* ── LIVE COUNTER ── */
const START = new Date('2025-11-04T20:04:00');
function fmt(n) { return n.toLocaleString('pt-BR'); }
function tick() {
  const diff=Date.now()-START, totalS=Math.floor(diff/1000),
        totalM=Math.floor(totalS/60), totalH=Math.floor(totalM/60),
        totalD=Math.floor(totalH/24), now=new Date();
  let months=(now.getFullYear()-START.getFullYear())*12+(now.getMonth()-START.getMonth());
  if(now.getDate()<START.getDate()) months--;
  const secEl=document.getElementById('c-sec');
  const nv=String(totalS);
  if(secEl.dataset.v!==nv){
    secEl.classList.remove('tick'); void secEl.offsetWidth;
    secEl.classList.add('tick');
    setTimeout(()=>secEl.classList.remove('tick'),180);
    secEl.dataset.v=nv;
  }
  document.getElementById('c-months').textContent=months;
  document.getElementById('c-days').textContent=fmt(totalD);
  document.getElementById('c-hrs').textContent=fmt(totalH);
  document.getElementById('c-min').textContent=fmt(totalM);
  secEl.textContent=fmt(totalS);
}
tick(); setInterval(tick, 1000);

/* ── LIGHTBOX ── */
const lb=document.getElementById('lightbox'), lbImg=document.getElementById('lb-img');
function openLB(src){ lbImg.src=src; lb.classList.add('open'); document.body.style.overflow='hidden'; }
function closeLB(){ lb.classList.remove('open'); document.body.style.overflow=''; }
lb.addEventListener('click', e=>{ if(e.target===lb||e.target.id==='lb-close') closeLB(); });
window.openLB=openLB; window.closeLB=closeLB;

/* ── DEVICE TILT PARALLAX ── */
(function(){
  const glows = document.querySelectorAll('.hero-glow');
  function handle(e){
    const b=Math.max(-20,Math.min(20,e.beta||0)), g=Math.max(-20,Math.min(20,e.gamma||0));
    glows.forEach((el,i)=>{ const m=i%2===0?1:-1; el.style.transform=`translate(${g*m*0.7}px,${b*0.4}px)`; });
  }
  if(window.DeviceOrientationEvent){
    if(typeof DeviceOrientationEvent.requestPermission==='function'){
      document.addEventListener('click',function ask(){
        DeviceOrientationEvent.requestPermission().then(r=>{ if(r==='granted') window.addEventListener('deviceorientation',handle); }).catch(()=>{});
        document.removeEventListener('click',ask);
      },{once:true});
    } else {
      window.addEventListener('deviceorientation',handle,{passive:true});
    }
  }
})();

/* ══════════════════════════════════
   ENVELOPE + CARTA IMERSIVA
══════════════════════════════════ */

const cartaBlocks = [
  { type:'p', text:'Feliz aniversário minha princesa, hoje você completa 18 anos e eu quero dizer que você é amada, que você é especial, que você é exatamente o tipo de pessoa que faz o mundo fazer mais sentido.' },
  { type:'photo', src:'assets/foto4.jpg', note:'o começo de tudo — 04/11/2025 🤍', peak:true },
  { type:'p', text:'Desde aquele beijo às 20h04 do dia 4 de novembro de 2025 já se passaram 9.518.160 segundos, 158.636 minutos, 2.643 horas, 110 dias, 3 meses, e em nenhum segundo desses eu me arrependi de ter te escolhido, pode anotar isso, pode guardar, porque eu não tô falando por falar não.' },
  { type:'p', text:'e eu fico pensando em como tudo começou naquele shopping, aquele momento simples que no papel não tinha nada de especial mas que ficou em mim de um jeito que não sai, depois vieram mini encontros escondidos, e foi vindo cada coisa pequena que a gente foi fazendo junto, e cada uma dessas coisas foi ficando guardada em mim como se eu soubesse desde o começo que eu ia querer lembrar delas pra sempre.' },
  { type:'photo', src:'assets/foto2.jpg', note:'momentos que não saem da minha cabeça 🌸' },
  { type:'p', text:'minha princesa eu preciso falar uma coisa e quero que você leia com calma porque é importante, você não estraga a vida de ninguém, você nunca estragou a minha, pelo contrário, você faz ela fazer mais sentido do que fazia antes de você aparecer, e eu sei que você talvez não acredite nisso, eu sei que lá no fundo você acha que é o problema, que você só complica, que as pessoas seriam melhor sem você por perto, e eu quero que você saiba que isso é mentira, é uma mentira que você ficou repetindo pra si mesma por tempo demais e que chegou a hora de parar de acreditar.', peak:true },
  { type:'p', text:'você merece alguém bom, você merece ser amada do jeito certo, você merece ter alguém que fique mesmo quando é difícil, e eu vou me esforçar ao máximo pra sempre ser essa pessoa pra você, não tô aqui por obrigação não, tô aqui porque eu te escolho, todos os dias, mesmo nos dias que a gente briga, mesmo nos dias que eu sou impossível, mesmo nos dias que você acha que eu deveria ir embora, eu não vou, pode tirar esse da cabeça.' },
  { type:'photo', src:'assets/foto3.jpg', note:'você não tá sozinha 🤍' },
  { type:'p', text:'e eu sei que você tá passando por coisa pesada meu bem, as coisas pequenas que parecem que estão sempre te pesando, e eu queria poder tirar tudo isso de você mas eu não consigo, o que eu consigo fazer é ficar do seu lado enquanto você atravessa isso tudo, e é isso que eu vou fazer, ficar, porque você não tá sozinha mesmo quando parece que tá.' },
  { type:'p', text:'Deus não esqueceu de você minha princesa, eu preciso que você ouça isso, Ele não te ama de um jeito comum não, Ele te ama de um jeito que não tem comparação, de um jeito que é maior do que as brigas, maior do que qualquer coisa que você tá carregando agora, e cada coisa difícil que você tá passando tem um propósito que você ainda não consegue ver mas que um dia vai fazer sentido, e nesse dia você vai olhar pra trás e vai entender porque cada coisa aconteceu assim.', peak:true },
  { type:'p', text:'minha vasa, minha mulher formosa, minha pérola rara, a bíblia já sabia de mulheres como você antes de você existir e mesmo assim você conseguiu ser mais do que qualquer descrição que eu encontro, você é rara do jeito mais real que essa palavra pode significar.' },
  { type:'p', text:'e pode rir disso mas agora que você tem 18 anos tá oficialmente presa, juridicamente, espiritualmente, em todos os sentidos que existem, não adianta tentar não, já assinou, já carimbou, você é minha e pronto, e olha que eu nem precisei fazer nada pra isso acontecer foi você que ficou então a culpa é sua.' },
  { type:'photo', src:'assets/foto1.jpg', note:'presa. juridicamente. é isso. 😂🤍' },
  { type:'p', text:'mas sendo sério de verdade, eu quero me casar com você, quero construir uma família com você, quero crescer do seu lado e superar cada coisa difícil que ainda vai vir junto com você, quero te ver realizando cada sonho que você tem, quero tá lá quando a medicina vier, quando as coisas melhorarem, quando você olhar pro espelho e finalmente enxergar o que eu enxergo quando olho pra você, quero tá lá em cada momento bom e em cada momento difícil porque do lado que eu quero estar é o seu, com aliança, com compromisso, com a vida toda pela frente.', peak:true },
  { type:'p', text:'você faz 18 anos hoje meu amor e eu te escolho agora e em todos os 9 milhões de segundos que ainda vão vir.', emph:true },
  { type:'p', text:'te amo demais minha princesa.', emph:true, peak:true },
];

/* BLOOM + HAPTIC */
const bloom = document.getElementById('bloom');
function doPeak(){
  bloom.classList.add('on');
  if(navigator.vibrate) navigator.vibrate([80,40,160]);
  setTimeout(()=>bloom.classList.remove('on'), 900);
}

/* ── HOLD BUTTON ── */
const holdBtn  = document.getElementById('hold-btn');
const envEl    = document.querySelector('.envelope');
const envHint  = document.querySelector('.env-hint');
const btnText  = document.querySelector('#hold-btn .btn-text');
const HOLD_MS  = 1800;
let holdTimer  = null;
let holdStart  = null;

function startHold(e){
  e.preventDefault();
  if(holdBtn.classList.contains('done')) return;
  holdStart = Date.now();
  if(navigator.vibrate) navigator.vibrate([20]);
  holdTimer = setInterval(()=>{
    const pct = Math.min((Date.now()-holdStart)/HOLD_MS*100, 100);
    holdBtn.style.background = `linear-gradient(90deg, rgba(212,132,158,0.28) ${pct}%, transparent ${pct}%)`;
    if(pct>=100) openEnvelope();
  }, 30);
}
function endHold(){
  if(holdTimer){ clearInterval(holdTimer); holdTimer=null; }
  if(!holdBtn.classList.contains('done')){
    holdBtn.style.background='';
  }
}
holdBtn.addEventListener('mousedown',   startHold);
holdBtn.addEventListener('touchstart',  startHold, {passive:false});
holdBtn.addEventListener('mouseup',     endHold);
holdBtn.addEventListener('mouseleave',  endHold);
holdBtn.addEventListener('touchend',    endHold);
holdBtn.addEventListener('touchcancel', endHold);

function openEnvelope(){
  clearInterval(holdTimer); holdTimer=null;
  holdBtn.classList.add('done');
  holdBtn.style.background='';
  btnText.textContent = 'abrindo... 🤍';
  if(navigator.vibrate) navigator.vibrate([50,30,100,30,220]);
  envEl.classList.add('open');
  if(envHint) envHint.classList.add('gone');
  setTimeout(()=>{
    holdBtn.style.display='none';
    if(envHint) envHint.style.display='none';
    startLetterReveal();
  }, 950);
}

/* ── TYPEWRITER ── */
let blockIndex = 0;
const letterReveal = document.getElementById('letter-reveal');
const letterBody   = document.getElementById('letter-body');

function startLetterReveal(){
  letterReveal.classList.add('vis');
  setTimeout(nextBlock, 450);
}

function nextBlock(){
  if(blockIndex >= cartaBlocks.length){
    const sig = document.querySelector('.letter-sig');
    if(sig){ setTimeout(()=>{ sig.classList.add('vis'); doPeak(); }, 600); }
    return;
  }
  const block = cartaBlocks[blockIndex++];

  if(block.type==='photo'){
    const div = document.createElement('div');
    div.className = 'l-photo';
    div.onclick = ()=>openLB(block.src);
    div.innerHTML = `<img src="${block.src}" alt="" loading="lazy"><div class="l-photo-note">${block.note}</div>`;
    letterBody.appendChild(div);
    setTimeout(()=>{
      div.classList.add('vis');
      div.scrollIntoView({behavior:'smooth',block:'nearest'});
      if(block.peak) doPeak();
      setTimeout(nextBlock, 1500);
    }, 120);
  } else {
    const p = document.createElement('p');
    p.className = 'l-p' + (block.emph?' emph':'');
    const curEl = document.createElement('span');
    curEl.className = 'cursor';
    p.appendChild(curEl);
    letterBody.appendChild(p);
    setTimeout(()=>{
      p.classList.add('vis');
      p.scrollIntoView({behavior:'smooth',block:'nearest'});
    }, 80);
    typeText(p, block.text, curEl, ()=>{
      if(block.peak) doPeak();
      const pause = 500 + Math.min(block.text.length * 1.2, 1800);
      setTimeout(nextBlock, pause);
    });
  }
}

function typeText(el, text, cursor, onDone){
  const baseSpeed = text.length > 300 ? 12 : text.length > 150 ? 18 : 25;
  let i = 0;
  function next(){
    if(i >= text.length){
      if(cursor && cursor.parentNode) cursor.remove();
      if(onDone) onDone();
      return;
    }
    const ch = text[i++];
    if(cursor && cursor.parentNode === el){
      el.insertBefore(document.createTextNode(ch), cursor);
    } else {
      el.appendChild(document.createTextNode(ch));
    }
    let delay = baseSpeed + Math.random()*8;
    if('.!?'.includes(ch))      delay = 340 + Math.random()*180;
    else if(',;:'.includes(ch)) delay = 140 + Math.random()*60;
    else if(ch===' ')           delay = baseSpeed * 0.5;
    setTimeout(next, delay);
  }
  next();
}

/* ── MUSIC ── */
const audio=document.getElementById('audio');
const pbtn=document.getElementById('pbtn');
const waves=document.getElementById('waves');
let playing=false;

function toggleMusic(){
  if(!playing){
    audio.play().then(()=>{ waves.classList.remove('off'); pbtn.textContent='⏸'; playing=true; })
      .catch(()=>showNote('♪ coloca musica.mp3 na pasta do site'));
  } else {
    audio.pause(); waves.classList.add('off'); pbtn.textContent='▶'; playing=false;
  }
}
window.toggleMusic=toggleMusic;

function showNote(msg){
  const n=document.createElement('div'); n.textContent=msg;
  n.style.cssText=`position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:rgba(92,35,54,0.92);color:#fff;padding:11px 22px;border-radius:20px;
    font-size:0.73rem;z-index:800;white-space:nowrap;animation:fn 3.2s ease forwards;`;
  document.body.appendChild(n); setTimeout(()=>n.remove(),3300);
}

document.addEventListener('touchstart',function once(){
  if(!playing && audio.readyState>=2){
    audio.play().then(()=>{ waves.classList.remove('off'); pbtn.textContent='⏸'; playing=true; }).catch(()=>{});
  }
  document.removeEventListener('touchstart',once);
},{once:true});

const s=document.createElement('style');
s.textContent=`@keyframes fn{0%{opacity:0;transform:translateX(-50%) translateY(8px)}12%{opacity:1;transform:translateX(-50%) translateY(0)}80%{opacity:1}100%{opacity:0}}`;
document.head.appendChild(s);
