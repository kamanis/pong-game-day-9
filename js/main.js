//Global Variabes
//variable for loading the first image
let firstbackimg;
//adding gameState
let gameState;
//variable for loading the background image of create and join room
let main;
//variable for join button
let joinbut;
//variable for creat room button
let createbut;
//selection for tv variable
let select;
//variable for join button in tv
let jointv;
//variable for creat room button for tv
let createtv;
//variable for stroing the device type
let deviceType = "";
//variable for creting input of naming the room
let roomnameInp;
//variable for making the player name input while creating room
let playernameInp;
//variable for image laoded when the gameStaate is create
let createbackimg;
//variablefor creating a button in the create state
let createbutton;
let database;
let res;
let rjson;
//variable for referring to ip adress
let refip;
//variable for ip count
let ipcount = {
    ip: 0
};
//let i;
let j;
//variable for storing the room name
let roomname;
//variable for storing the player name
let playername;
// a bollean value for storing true and false if room name or player name is less than 1
let isroom;
//varible for storing the waiting image
let wait;
//variable which will increase when gamestate is join in mobile so that we get value from database once
let f=0;
//this varible will store how many rooms are available in that ip adress
let roomnum;
let f2=0;
//arrat to store romm name of various rooms
let roomsarr=[];
let loopover=false;
function setup() {
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    gameState = "select";
    joinbut = new Button("images/join.png", width - width / 4, height / 2, width / 3, height / 2);
    createbut = new Button("images/create.png", width / 4, height / 2, width / 3, height / 2);
    jointv = new Button("images/jointv.png", width - width / 4, height / 2, width / 3, height / 2);
    createtv = new Button("images/createtv.png", width / 4, height / 2, width / 3, height / 2);
    select = new Select(createtv, jointv);
    roomnameInp = createInput("Room Name");
    playernameInp = createInput("Your Name");
    roomnameInp.hide();
    playernameInp.hide();
    roomnameInp.position(width / 2 - width / 11, height / 3);
    playernameInp.position(width / 2 - width / 11, height - height / 2.7);
    playernameInp.style("font-size", width / 45 + "px");
    playernameInp.style("background", color(153, 255, 255));
    roomnameInp.style("font-size", width / 45 + "px");
    roomnameInp.style("background", color(153, 255, 255));
    createbutton = createButton("Sumbit");
    createbutton.position(width / 2 + width / 8, height - height / 5);
    createbutton.style("font-size", "20px");
    createbutton.style("background", color(0, 255, 255));
    createbutton.hide();
    getip();
}

function preload() {
    //loading the first welcome image
    firstbackimg = loadImage("images/first.png");

    //background where create and join room is there
    main = loadImage("images/backdrop.png");
    //loading the background image when the gameState is create
    createbackimg = loadImage("images/Pong1.jpg")
    wait=loadImage("images/wait.jpg");
}

function draw() {
    background(255);
    //ig gameState is select then
    if (gameState === "select") {
        push();
        imageMode(CENTER);
        //IMAGE FOR THE FIRST WELOCOME SCREEN
        image(firstbackimg, width / 2, height / 2, width - width / 2, height - height / 2);
        pop();
        push();
        textFont(BOLD);
        textAlign(CENTER);
        textSize(40);
        //first screen text tap for mobile ond press ok for tv
        text("Tap to Begin for Mobile", width / 2, height - height / 5);
        text("Press Center Button for TV", width / 2, height / 5);
        pop();
    }
    if (gameState === "android") {
        push();
        imageMode(CENTER);
        image(main, width / 2, height / 2, width, height);
        createbut.display();
        joinbut.display();
        pop();
    }
    if (gameState === "tv") {
        push();
        imageMode(CENTER);
        image(main, width / 2, height / 2, width, height);
        createtv.display();
        jointv.display();
        pop();
        select.display();
    }
    if (gameState === "create" && deviceType === "mobile") {
        playernameInp.show();
        roomnameInp.show();
        createbutton.show();
        push();
        imageMode(CENTER);
        image(createbackimg, width / 2, height / 2, width, height);
        pop();
        push();
        if (isroom === false) {
            textSize(20);
            fill("red");
            text("we are the sounds", width / 2, height / 2);
        }
        pop();
        createbutton.mousePressed(() => {
            ip();
        })
    } else {
        playernameInp.hide();
        roomnameInp.hide();
        createbutton.hide();  
    }
    if (gameState === "wait" && deviceType === "mobile") {
        push();
        imageMode(CENTER);
        image(wait,width/2,height/2,width,height);
        textAlign(CENTER);
        textSize(width/16);
        fill("red");
        text("Waiting For Other Players...",width/2,height/2);
        pop();
    }
    if(gameState==="join" && deviceType==="mobile"){
        f++;
        if(f===1){
            database.ref(j+"/ip").on("value",(data)=>{
                roomnum=data.val();
            })
        }
       if(roomnum!==undefined){
           if(roomnum>0){ 
               f2++;
               if(f2===1){
                   for(var a=1;a<=roomnum;a++){
                    database.ref(j+"("+a+")/roomName").on("value",(data)=>{
                       roomsarr.push(data.val())
                    })
                    if(a===roomnum){
                         loopover=true;
                    }
                   }
                
               }
              if(loopover){
                 
              } 
           }
       }

        
    }
}

function keyPressed() {
    //RELOADING THE PAGE ON ENTER FOR MY EASE
    // console.log(keyCode);
    select.move();
    if (keyCode === 13) {
        location.reload();
    }
    //making gameState tv after keypress
    //remember to play sound when player chooses his device as a tv
    //change keyCode as per the tv
    if (keyCode === 32 && gameState === "select") {
        gameState = "tv";
        deviceType = "tv";
    }
    //dertmining if the selecter is create or join
    if (keyCode === 65 && gameState === "tv") {

        if (select.i === 0) {
            //making gameStaate create for tv
            gameState = "create"
        }
        if (select.i === 1) {
            //making gameState join for tv
            gameState = "join";
        }
    }
}

function mousePressed() {
    if (gameState === "select") {
        setTimeout(() => {
            gameState = "android";
            deviceType = "mobile";
        }, 100);

    }
    if (buttonpressed(createbut) && gameState === "android") {
        //making gameState create for mobile
        gameState = "create";
    }
    if (buttonpressed(joinbut) && gameState === "android") {
        //making gameState join for mobile
        gameState = "join";
    }
}

function buttonpressed(obj) {
    if (mouseX - obj.x <= obj.width / 2 &&
        obj.x - mouseX <= obj.width / 2 &&
        obj.y - mouseY <= obj.height / 2 &&
        mouseY - obj.y <= obj.height / 2) {
        return true;
    } else {
        return false;
    }
}
async function getip() {
    res = await fetch("https://api.ipify.org/?format=json");
    rjson = await res.json();
    j = replace(rjson.ip, ".", "");
}
async function ip() {
    if (rjson !== undefined) {
        roomname = roomnameInp.value();
        playername = playernameInp.value();
        if (roomname.length < 1 || playername.length < 1) {
            isroom = false;
        } else {
            isroom = true;
        }
        
        if (isroom) {
            refip = await database.ref(j).once("value");
            if (refip.exists()) {
                ipcount = refip.val();
                ipcount.ip++;
            } else {
                ipcount.ip = 1;
            }

            database.ref(j).set({
                ip: ipcount.ip
            })


            database.ref(j + "(" + ipcount.ip + ")").set({
                players: {
                    player1: {
                        name: playername,
                        y: 0
                    },
                    player2: {
                        name: "",
                        y: 0
                    }
                },
                roomName: roomname
            })
            gameState = "wait";
        }
    }
}