// helper functions
function screenlog(msg){
    let screenlogElem = document.querySelector('.screenlog');
    screenlogElem.innerText = msg;
}


let mainElem = document.querySelector('main');
let peekNavSelector = document.querySelector('.peek-nav-selector');

let isMouseDown = false;
let startPos = {
    x: 0,
    y: 0
};
let delta = {
    x: 0,
    y: 0
};
let peekNavItems = document.querySelectorAll('.peek-nav-item');
let totalItems = peekNavItems.length;
let activeItem = 0;
let nextItem = 0;

console.log(`totalItems: ${totalItems}`);

const handleMouseDown = (e) => {
    isMouseDown = true;
    startPos.x = e.clientX;
    startPos.y = e.clientY;
}

const handleMouseUp = (e) => {
    isMouseDown = false;
    resetMainElem();
    activeItem = activeItem + nextItem;

    gsap.to(peekNavSelector, {
        scale: 2,
        opacity: 0,
        duration: 0.35,
        ease: 'expo.out',
        clearProps: 'scale',
        onComplete: function(){
            peekNavSelector.style.opacity = 1;
        }
    });

    screenlog(getCurrentTitle());
}

function getCurrentTitle(){
    return peekNavItems[activeItem].getAttribute('data-title');
}
screenlog(getCurrentTitle());


const handleMouseMove = (e) => {
    e.preventDefault();
    
    if(!isMouseDown) return;

    let x = e.clientX;
    let y = e.clientY;

    delta.x = x - startPos.x;
    delta.y = y - startPos.y;
    
    if(delta.x > 10){
        animateMainElem(delta.x);

        let index = Math.floor(delta.y / 100);
        nextItem = index;

        let nextIndex = activeItem + nextItem;

        console.log(`nextIndex: ${nextIndex}`);

        if(nextIndex >= 0 && nextIndex < totalItems){
            animatePeekNavSelectorTo((activeItem + nextItem) * 100);
        }
    
    }
    // screenlog(`x: ${delta.x} \n y: ${delta.y}`);
}


function animateMainElem(distance){
    mainElem.style.transform = 'translateX(' + distance + 'px)';
}

function resetMainElem(){
    gsap.to(mainElem, {
        x: 0,
        duration: 0.25,
        ease: 'expo.out',
        clearProps: 'all'
    });

    delta.x = 0;
    // screenlog(`x: ${delta.x} \n y: ${delta.y}`);
}

function animatePeekNavSelectorTo(index){
    gsap.to(peekNavSelector, {
        y: index,
        duration: 0.3,
        ease: 'expo.out'
    });
}

document.body.addEventListener('mouseup', (e)=> {handleMouseUp(e)});
document.body.addEventListener('mousedown', (e)=> {handleMouseDown(e)});
document.body.addEventListener('mouseleave', (e)=> {handleMouseUp(e)});
document.body.addEventListener('mousemove',  (e)=> {handleMouseMove(e)});
document.body.addEventListener('touchstart', (e)=> {handleMouseDown(e)});
document.body.addEventListener('touchend', (e)=> {handleMouseUp(e)});
document.body.addEventListener('touchmove',  (e)=> {handleMouseMove(e)});