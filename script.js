let userbt=false;
let compbt=false;
let innings=1;
let target=0;
let userscore=0;
let compscore=0;
let userclick=document.querySelector("#user-num");
let compclick=document.querySelector("#comp-num");
const choices=document.querySelectorAll(".choice");
const userScoreDisplay=document.getElementById("user-score");
const compScoreDisplay=document.getElementById("comp-score");
const newGameBtn=document.getElementById("new-game");
let result=document.querySelector("#msg");
const compbatting=()=>Math.floor(Math.random()*6)+1;
const compbowling=()=>Math.floor(Math.random()*6)+1;
const clearclick=()=> {
    choices.forEach(choice => choice.onclick=null);
};
const endMatch=(msg)=> {
    clearclick();
    alert(msg);
}
const match=()=> {
    clearclick();
    if(innings===1) {
        if(userbt) {
            userbatting();
        } else {
            compbattingfirst();
        }
    } else {
        if(userbt) {
            userbowling();
        } else {
            userbatting();
        }
    }
};
const userbatting=()=> {
    choices.forEach(choice=>{
        choice.onclick=()=> {
            let userun=Number(choice.innerText);
            let comprun=compbatting();
            console.log(`User: ${userun}, Comp: ${comprun}`);
            userclick.innerText = userun;
            compclick.innerText = comprun;
            if(userun===comprun) {
                if(innings===1) {
                    target=userscore+1;
                    innings=2;
                    alert(`User OUT! Target is ${target}`);
                    result.innerText=`Target=${target}`;
                    match();
                } else {
                    endMatch("Computer Win!");
                    result.innerText="Computer Win!";
                }
                return;
            }
            userscore+=userun;
            userScoreDisplay.innerText=userscore;
            if(innings===2 && userscore>=target) {
                endMatch("You win!");
                result.innerText="You Win!";
            }
        };
    });
};
const compbattingfirst=()=> {
    choices.forEach(choice=>{
        choice.onclick=()=> {
            let useball=Number(choice.innerText);
            let comprun=compbatting();
            console.log(`User Ball: ${useball}, Comp: ${comprun}`);
            userclick.innerText=useball;
            compclick.innerText=comprun;
            if(useball===comprun) {
                target=compscore+1;
                innings=2;
                alert(`Computer OUT! Target is ${target}`);
                result.innerText=`Target=${target}`;
                match();
                return;
            }
            compscore+=comprun;
            compScoreDisplay.innerText=compscore;
        };
    });
};

const userbowling=()=> {
    choices.forEach(choice=> {
        choice.onclick=()=>{
            let useball = Number(choice.innerText);
            let comprun = compbatting();
            console.log(`User Ball: ${useball}, Comp: ${comprun}`);
            userclick.innerText=useball;
            compclick.innerText=comprun;
            if(useball===comprun) {
                if(compscore<target) {
                    endMatch("You Win!");
                    result.innerText="You Win!";
                } else if(compscore===target) {
                    endMatch("Match Drawn");
                    result.innerText="Match Drawn!";
                } else {
                    endMatch("Computer Win!");
                    result.innerText="Computer Win!";
                }
                return;
            }
            compscore+=comprun;
            compScoreDisplay.innerText=compscore;
            if(compscore>=target) {
                endMatch("Computer Win!");
            }
        };
    });
};

const startgame=()=> {
    userscore = 0;
    compscore = 0;
    innings = 1;
    target = 0;
    userScoreDisplay.innerText = 0;
    compScoreDisplay.innerText = 0;
    userclick.innerText=0;
    userclick.innerText=0;
    clearclick();
    let userinp=prompt("Choose even or odd for choice");
    userinp=userinp.toLowerCase();
    let compinp="";
    if(userinp==="even") {
        compinp="odd";
    } else {
        compinp="even";
    }
    console.log(`User Toss = ${userinp} and Computer Choice = ${compinp}`);
    let userchoice=Number(prompt("Enter a number between 1 to 6: "));
    let comp=[1,2,3,4,5,6];
    let ind=Math.floor(Math.random()*6);
    let compchoice=comp[ind];
    console.log(`User Choosen Number = ${userchoice} and Computer Choosen Number = ${compchoice}`);
    let userwin=false;
    let sum=userchoice+compchoice;
    if(userinp==="even" && sum%2===0) {
        console.log("User won the toss");
        let chosebtbo=prompt("You won the toss, Choose to bat or bowl");
        if(chosebtbo==="bat") {
            console.log("User chose to bat");
            userbt=true;
            compbt=false;
            result.innerText="User won the toss and chose to bat";
        } else {
            console.log("User chose to bowl");
            userbt=false;
            compbt=true;
            result.innerText="User won the toss and chose to bowl";
        }
    } else if(userinp==="odd" && sum%2===1) {
        console.log("User won the toss");
        let chosebtbo=prompt("Choose to bat or bowl");
        if(chosebtbo==="bat") {
            console.log("User chose to bat");
            userbt=true;
            compbt=false;
            result.innerText="User won the toss and chose to bat";
        } else {
            console.log("User chose to bowl");
            userbt=false;
            compbt=true;
            result.innerText="User won the toss and chose to bowl";
        }
    } else {
        console.log(`Computer won the toss as computer chose ${compchoice} and sum = ${sum}`);
        let arr=["bat","bowl"];
        let index=Math.floor(Math.random()*2);
        let compch=arr[index];
        console.log(`Computer chose to ${compch}`);
        result.innerText=`Computer won the toss and chose to ${compch} first`;
        if(compch==="bat") {
            userbt=false;
            compbt=true;
        } else {
            compbt=false;
            userbt=true;
        }
    }
    console.log()
    match();
};

newGameBtn.onclick = startgame;