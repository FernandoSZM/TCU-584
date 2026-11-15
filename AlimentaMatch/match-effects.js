
(() => {
 'use strict';
 const board=document.getElementById('board'), score=document.getElementById('score'), toast=document.getElementById('matchToast');
 if(!board||!score)return;
 let selected=null, previousScore=0, timer=null;
 const notice=(message)=>{toast.textContent=message;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),1350)};
 const scoreObserver=new MutationObserver(()=>{
   const current=Number(score.textContent)||0;
   if(current>previousScore){const delta=current-previousScore;if(delta>=30)notice('✨ ¡+'+delta+' puntos!');}
   previousScore=current;
 });
 scoreObserver.observe(score,{childList:true,characterData:true,subtree:true});
 board.addEventListener('click',(event)=>{
   const tile=event.target.closest('img');
   if(!tile||!board.contains(tile))return;
   if(!selected){selected=tile;tile.classList.add('selected');return;}
   const first=selected;first.classList.remove('selected');selected=null;
   if(first===tile)return;
   const a=first.id.split('-').map(Number),b=tile.id.split('-').map(Number);
   if(a.length!==2||b.length!==2||Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])!==1){
     selected=tile;tile.classList.add('selected');return;
   }
   // Reuse the game's original drag handlers so touch/click keeps its rules.
   if(typeof window.dragStart==='function'&&typeof window.dragDrop==='function'&&typeof window.dragEnd==='function'){
     window.dragStart.call(first);
     window.dragDrop.call(tile);
     window.dragEnd.call(first);
   }
 });
 document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&selected){selected.classList.remove('selected');selected=null;}});
})();
