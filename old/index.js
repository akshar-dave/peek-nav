function $(elem){
    return document.querySelectorAll(elem);
}

const title = $('h1')[0];
const container = $('.container')[0];
const peekNav = $('.peek-nav')[0];
const peekNavItems = $('.peek-nav-item');
const peekNavSelector = $('.peek-nav-item-selector')[0];

let touching = false;
let delta = [0, 0];
const threshold = 20;
let nextTitle = 'Peek at the nav';

function handleMouseDown(e){
    touching = true;
    delta[0] = e.pageX;
    delta[1] = e.pageY;
}

function handleMouseUp(e){
    touching = false;
    delta[0] = 0;
    delta[1] = 0;

    gsap.to(container, {
        x: 0,
        duration: 0.4,
        ease: "expo.out",
        clearProps: "all",
        delay: 0.1
    });

    gsap.to(peekNavSelector, {
        scale: 10,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        clearProps: "all"
    });

    gsap.fromTo(document.querySelector('[data-selected-item]'), {
        scale: 0.75,
    },{
        scale: 1,
        duration: 0.6,
        ease: "bounce.out",
        clearProps: "all"
    });

    title.innerText = nextTitle;
    gsap.fromTo(title, {
        opacity: 0,
        y: "10px"
    }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power4.out"
    });
}

function handleMouseMove(e){
    e.preventDefault();
    if(touching){
        var x = e.pageX - delta[0];
        var y = e.pageY - delta[1];

        if(x > 0 && x <= 100){
            if(x > threshold){
                move(container, x, 0);
            }
        };

        var index = Math.ceil(Math.abs(y/50));
        try{
            document.querySelector('[data-selected-item]').removeAttribute("data-selected-item");
        }
        catch{}
        peekNavItems[index].dataset.selectedItem = "true";
        nextTitle = peekNavItems[index].dataset.title;
        

        if(y >= 0 && y < (peekNavItems.length - 1) * 50){
            if(x > 75){
                // move(peekNavSelector, 0, y);

                gsap.fromTo(peekNavSelector, {
                    scaleX: 0.85,
                    scaleY: 1.25
                },{
                    y: `${50 * Math.ceil(Math.abs(y/50))}px`,
                    scale: 1.5,
                    duration: 0.6,
                    ease: "power4.out"
                });
            }
            
        };
    }
}

function move(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`;
}

document.body.addEventListener('mousedown', (e)=> {handleMouseDown(e)});
document.body.addEventListener('mouseup', (e)=> {handleMouseUp(e)});
document.body.addEventListener('mouseleave', (e)=> {handleMouseUp(e)});
document.body.addEventListener('mousemove',  (e)=> {handleMouseMove(e)});
document.body.addEventListener('touchstart', (e)=> {handleMouseDown(e)});
document.body.addEventListener('touchend', (e)=> {handleMouseUp(e)});
document.body.addEventListener('touchmove',  (e)=> {handleMouseMove(e)});


