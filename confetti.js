import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const btn = document.getElementById("btn")
function makeConfetti(){
    console.log('INSIDE MAKE CONFETTI');
    confetti()
}

//window.addEventListener("message", makeConfetti)
window.addEventListener("message",function(){
    console.log('INSIDE');
})
