const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('#nav-links');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  document.querySelector('#form-status').textContent='Thank you! Your message has been received. We will contact you soon.';
  e.target.reset();
});
