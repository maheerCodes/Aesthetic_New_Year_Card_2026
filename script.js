const W = 360, H = 640;

//  Stars effect
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");
starCanvas.width = W;
starCanvas.height = H;

let stars=[];
for(let i=0;i<120;i++){
  stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5,s:Math.random()*0.5});
}

function animateStars(){
  sctx.clearRect(0,0,W,H);
  sctx.fillStyle="white";
  stars.forEach(st=>{
    sctx.beginPath();
    sctx.arc(st.x,st.y,st.r,0,Math.PI*2);
    sctx.fill();
    st.y+=st.s;
    if(st.y>H){st.y=0;st.x=Math.random()*W;}
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Fireworks effect
const fireCanvas=document.getElementById("fireworks");
const fctx=fireCanvas.getContext("2d");
fireCanvas.width=W;
fireCanvas.height=H;

let particles=[];
const sound=document.getElementById("boom");
let soundEnabled=false;

function burst(x,y){
  if(soundEnabled){
    sound.currentTime=0;
    sound.play();
  }
  for(let i=0;i<40;i++){
    particles.push({
      x,y,
      vx:(Math.random()-0.5)*6,
      vy:(Math.random()-0.5)*6,
      life:60,
      color:`hsl(${Math.random()*360},100%,60%)`
    });
  }
}

function startFireworks(){
  setInterval(()=>burst(W/2,H/2),900);
}

function animateFireworks(){
  fctx.clearRect(0,0,W,H);
  particles.forEach((p,i)=>{
    fctx.fillStyle=p.color;
    fctx.fillRect(p.x,p.y,3,3);
    p.x+=p.vx;
    p.y+=p.vy;
    p.life--;
    if(p.life<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

//  Tap/Click fireworks + enable sound
document.getElementById("capture").addEventListener("click",e=>{
  soundEnabled=true;
  const rect=fireCanvas.getBoundingClientRect();
  burst(e.clientX-rect.left,e.clientY-rect.top);
});

// Countdown 
const cd=document.getElementById("countdown");
let target=new Date("January 1, 2026 00:00:00");
// let target = new Date(Date.now() + 10000);


if(new Date()>=target){
  cd.innerHTML="🎉 Welcome 2026 🎉";
  startFireworks();
}else{
  setInterval(()=>{
    const diff=target-new Date().getTime();
    if(diff<=0){
      cd.innerHTML="🎉 Welcome 2026 🎉";
      startFireworks();
      return;
    }
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m=Math.floor((diff%(1000*60*60))/(1000*60));
    const s=Math.floor((diff%(1000*60))/1000);
    cd.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
  },1000);
}

// Screenshot
function takeShot(){
  html2canvas(document.getElementById("capture")).then(c=>{
    const a=document.createElement("a");
    a.href=c.toDataURL();
    a.download="HNY_2026_Story.png";
    a.click();
  });
}
