const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.card')];
const input=document.querySelector('#searchInput');
const count=document.querySelector('#resultCount');
const empty=document.querySelector('#emptyState');
let active='all';

function update(){
  const q=input.value.trim().toLowerCase();let visible=0;
  cards.forEach(card=>{const matchesCategory=active==='all'||card.dataset.category===active;const matchesSearch=!q||(card.dataset.search+' '+card.innerText).toLowerCase().includes(q);const show=matchesCategory&&matchesSearch;card.classList.toggle('hidden',!show);if(show)visible++;});
  count.textContent=`${visible} 个实验样本`;empty.hidden=visible!==0;
}
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;update();}));
input.addEventListener('input',update);

document.querySelector('.toggle-demo').addEventListener('click',e=>{e.stopPropagation();e.currentTarget.classList.toggle('on')});

const detail=document.querySelector('#detailDialog');
cards.forEach(card=>card.querySelector('.card-open').addEventListener('click',()=>{
  detail.querySelector('#dialogTitle').textContent=card.querySelector('h3').textContent;
  detail.querySelector('#dialogDesc').textContent=card.querySelector('.card-meta p').textContent;
  detail.querySelector('#dialogStack').textContent=card.querySelector('.card-meta>span').textContent;
  const filter=filters.find(f=>f.dataset.filter===card.dataset.category);
  detail.querySelector('#dialogCategory').textContent=filter?.textContent||card.dataset.category;
  detail.showModal();
}));

const addDialog=document.querySelector('#addDialog');
document.querySelector('#addButton').addEventListener('click',()=>addDialog.showModal());
document.querySelectorAll('.dialog-close').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()}));
document.querySelector('#copyPrompt').addEventListener('click',async e=>{
  const text='请帮我收录这个动效：\n链接：\n动效位置：\n我喜欢的部分：\n还原要求（可选）：';
  try{await navigator.clipboard.writeText(text);e.currentTarget.textContent='已复制，去对话里发送给我 ✓'}catch{e.currentTarget.textContent='复制失败，请直接在对话里发链接'}
});

const magnetic=document.querySelector('.preview-magnetic');
const magnet=magnetic.querySelector('.magnet-demo');
magnetic.addEventListener('pointermove',e=>{const r=magnetic.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12;const y=(e.clientY-r.top-r.height/2)*.12;magnet.style.transform=`translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`});
magnetic.addEventListener('pointerleave',()=>magnet.style.transform='');
