
(function(){
  const cards=[...document.querySelectorAll('.review-card')];
  const prev=document.getElementById('reviewsPrev');
  const next=document.getElementById('reviewsNext');
  if(!cards.length||!prev||!next)return;
  let index=0;
  const show=(step)=>{cards[index].classList.remove('is-active');index=(index+step+cards.length)%cards.length;cards[index].classList.add('is-active');};
  prev.addEventListener('click',()=>show(-1));
  next.addEventListener('click',()=>show(1));
  window.setInterval(()=>show(1),6000);
})();

// rzu-informatique
