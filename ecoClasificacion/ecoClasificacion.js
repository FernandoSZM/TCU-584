
"use strict";
const types=["glass","hazardous","metal","paper","plastic","organic"];
const names={glass:"vidrio",hazardous:"residuos peligrosos",metal:"metal",paper:"papel y cartón",plastic:"plástico",organic:"orgánico"};
const items=types.flatMap(type=>Array.from({length:4},(_,i)=>({type,src:`assets/trash/${type}/${i+1}.png`})));
const image=document.getElementById("trashItem"),scoreEl=document.getElementById("score"),timeEl=document.getElementById("time"),comboEl=document.getElementById("combo"),feedback=document.getElementById("feedback"),progress=document.getElementById("progressFill");
const modal=document.getElementById("modal"),modalTitle=document.getElementById("modalTitle"),modalText=document.getElementById("modalText"),modalEmoji=document.getElementById("modalEmoji"),modalButton=document.getElementById("modalButton"),pauseButton=document.getElementById("pause");
const bins=[...document.querySelectorAll(".bin")];
let score=0,combo=0,time=60,current=null,playing=false,interval=null,lastItem=-1,locked=false,mode="start",lastTick=0;
function chooseItem(){let idx;do{idx=Math.floor(Math.random()*items.length)}while(idx===lastItem&&items.length>1);lastItem=idx;current=items[idx];image.src=current.src;image.alt="Residuo para clasificar";feedback.textContent="Selecciona el contenedor correcto.";feedback.className="";}
function update(){scoreEl.textContent=score;comboEl.textContent=combo;timeEl.textContent=`${Math.ceil(time)} s`;progress.style.width=`${Math.max(0,Math.min(100,time/60*100))}%`;}
function showModal(title,message,emoji,button,nextMode){playing=false;clearInterval(interval);interval=null;mode=nextMode;modalTitle.textContent=title;modalText.textContent=message;modalEmoji.textContent=emoji;modalButton.textContent=button;modal.classList.remove("hidden");}
function begin(){score=0;combo=0;time=60;locked=false;chooseItem();update();resume();}
function resume(){modal.classList.add("hidden");playing=true;pauseButton.textContent="⏸ Pausar";lastTick=performance.now();clearInterval(interval);interval=setInterval(()=>{const now=performance.now();time=Math.max(0,time-(now-lastTick)/1000);lastTick=now;update();if(time<=0)showModal("¡Tiempo terminado!",`Conseguiste ${score} puntos. ¡Buen trabajo!`,"🏆","Volver a jugar","end");},100);}
function classify(type,bin){if(!playing||locked)return;locked=true;bins.forEach(b=>b.classList.remove("correct","wrong"));if(type===current.type){combo++;score+=10;time=Math.min(90,time+2);feedback.textContent=`✓ ¡Correcto! +10 puntos · Racha ${combo}`;feedback.className="good";bin.classList.add("correct");update();setTimeout(()=>{bin.classList.remove("correct");if(playing)chooseItem();locked=false;},360);}else{combo=0;feedback.textContent=`✕ Inténtalo de nuevo. Pista: busca ${names[current.type]}.`;feedback.className="bad";bin.classList.add("wrong");update();setTimeout(()=>{bin.classList.remove("wrong");locked=false;},400);}}
bins.forEach(bin=>{bin.addEventListener("click",()=>classify(bin.dataset.type,bin));bin.addEventListener("dragover",e=>{if(playing){e.preventDefault();bin.classList.add("over");}});bin.addEventListener("dragleave",()=>bin.classList.remove("over"));bin.addEventListener("drop",e=>{e.preventDefault();bin.classList.remove("over");classify(bin.dataset.type,bin);});});
image.addEventListener("dragstart",e=>{if(!playing){e.preventDefault();return;}e.dataTransfer.setData("text/plain","trash");e.dataTransfer.effectAllowed="move";});
document.getElementById("restart").addEventListener("click",()=>showModal("¿Otra partida?","Tu puntuación actual se reiniciará.","🔄","Reiniciar","start"));
pauseButton.addEventListener("click",()=>{if(playing)showModal("Partida en pausa","Tu tiempo está detenido.","⏸️","Continuar","pause");});
modalButton.addEventListener("click",()=>mode==="pause"?resume():begin());
document.addEventListener("visibilitychange",()=>{if(document.hidden&&playing)showModal("Partida en pausa","Pausamos el tiempo mientras estabas fuera.","⏸️","Continuar","pause");});
chooseItem();update();
