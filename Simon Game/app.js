let gameSeq=[];
let userSeq=[];

let colors=["yellow","red","green","purple"];

let level=0;
let started=false;

let h4=document.querySelector("h4");

document.addEventListener("keypress", function() {
    if(started==false) {
        console.log("game started")
        started=true;

        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash")

    setTimeout(function() {
        btn.classList.remove("flash")
    },200)
}

function levelUp() {
    userSeq=[];
    level++;
    h4.innerText=`Level ${level}`;

    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=colors[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`)
    gameSeq.push(randomColor)
    console.log(gameSeq)

    btnFlash(randomBtn);
}

function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h4.innerHTML=`Game over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}

function btnPress() {
    let btn=this;
    btnFlash(btn);

    userColor=btn.getAttribute("id")
    userSeq.push(userColor)

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}