//(made by Sylvie) 🏳️‍⚧️
//disord @syiv 
//top ten "id rather do it in js" codes
let currentWebsiteVersion = "2.0.0";
let startingFarm = " "

let chosenFarmSpot = 12;
let previousPlot = chosenFarmSpot;
let chosenFarmSpotDirection = 0;

let orbs = 0;
let chosenHoe = 0;
let chosenSickle = 1;
let sickleYield = 1;

let revealWateredSelected = false;
let revealFertSelected = false;
let revealUVSelected = false;

let fertSelected = false;
let gccKey = 1;
let gccToggle = false;
let strangeSelected = false;
let englishSelected = true;
let isRight = true;
let isHidden = true;

let baseStrangeRate = .0015;
let baseOrbPrice = 10000;

var plotCount = [];
let groups = [];

//randomize this to be between 10 and 50 centered on 30 
let luck = 30;
setLuck();
const maxLuck = 250;

let canRedo = false;
let undoRedoPosition = 0;
let highestRedoPosition = 0;
var undoRedoList = []; 
undoRedoList.length = 1000;
for(let i = 0; i < undoRedoList.length; i++){
    undoRedoList[i] = "";
}

//variables for the brute force thing
let winnerWinner = 0;
let winnerStructure = "";
let currentStructure = "";
var endgameIDs = [
    1,4,16,14
];//16,14,4,1

/////////////////////////////////////////////
// Structure: 2d array:  
//   x = part of structure
//   z = empty   
//   {w,u,f,s,p,b} = structure effect{watered, uv'd, fertilized, strawberried, planted, breed spot}     
//   Default facing UP
//
// Name
// time, value, price, minYield, maxYield
/////////////////////////////////////////////
let clear = new plot(
    [['x']],
    'Empty',    
    0,0,0,0,0);
let sprinkler = new plot(
    [['w','w','w'],
     ['w','x','w'],
     ['w','w','w']],
    'Sprinkler',    
    0,0,0,0,0);
let laneSprinkler = new plot(
    [['w','z','w'],
     ['w','x','w'],
     ['w','x','w'],
     ['w','x','w'],
     ['w','z','w']],  
    'LaneSprinkler',
    0,0,0,0,0);
    laneSprinkler.isDirectional = true;
let megagrow = new plot(
    [['u'],
     ['u'],
     ['u'],
     ['x']],  
    'MegaGrow',
    0,0,0,0,0);
    megagrow.isDirectional = true;
let gigagrow = new plot(
    [['u','u','u','u'],
     ['u','u','u','u'],
     ['z','x','x','z']],  
    'GigaGrow',
    0,0,0,0,0);
    gigagrow.isDirectional = true;
let goatFert = new plot(
    [['f','f','f'],
     ['f','x','f'],
     ['f','f','f']],  
    'GoatFert',
    0,0,0,0,0);
let bullFert = new plot(
    [['f','f','f','f'],
     ['f','x','x','f'],
     ['f','x','x','f'],
     ['f','f','f','f']],  
    'BullFert',
    0,0,0,0,0);
let elephantFert = new plot(
    [['f','f','f','f','f'],
     ['f','x','x','x','f'],
     ['f','x','x','x','f'],
     ['f','x','x','x','f'],
     ['f','f','f','f','f']],  
    'ElephantFert',
    0,0,0,0,0);
let plantFlower = new plot(
    [['p','p','p'],
     ['p','x','p'],
     ['p','p','p']],  
     'Plant',
    0,0,0,0,0);
    plantFlower.canFreePlace = true;
let fourLeafClover = new plot(
    [['b','z','b'],
     ['z','x','z'],
     ['b','z','b']],  
    '4 Leaf Clover',
    0,0,0,0,0);
    fourLeafClover.canFreePlace = true;
let sixteenLeafClover = new plot(
    [['b','z','b'],
     ['z','x','z'],
     ['b','z','b']],  
    '16 Leaf Clover',
    0,0,0,0,0);
    sixteenLeafClover.canFreePlace = true;
let sixtyfourLeafClover = new plot(
    [['b','z','b'],
     ['z','x','z'],
     ['b','z','b']],  
    '64 Leaf Clover',
    0,0,0,0,0);
    sixtyfourLeafClover.canFreePlace = true;
let emptyPlot = new plot(
    [['x']],  
    'Farm',
    2,0,0,0,0);
    emptyPlot.isCrop = true; //the usual check to see if there is a min yield wont work here so I have to let it know
let carrot = new plot(
    [['x']],  
    'Carrot',
    2,1,0,20,20);
let grape = new plot(
    [['x']],  
    'Grape',
    2,4,0,6,6);
    grape.isSeedCapped = true;
let gloamroot = new plot(
    [['x']],  
    'Gloamroot',
    2,5,0,5,10);
    gloamroot.isSeedCapped = true;
let strawberry = new plot(
    [['s','s','s'],
     ['s','x','s'],
     ['s','s','s']],  
    'Strawberry',
    2,2,0,5,5);
    strawberry.isSeedCapped = true;
let turnip = new plot(
    [['x']],  
    'Turnip',
    2,1,0,10,30);
    turnip.isSeedCapped = true;
let potato = new plot(
    [['x']],  
    'Potato',
    1,1,0,10,10);
    potato.isSeedCapped = true;
let onion = new plot(
    [['x']],  
    'Onion',
    3,3,0,4,4);
    onion.isSeedCapped = true;
let pumpkin = new plot(
    [['x']],  
    'Pumpkin',
    2,120,50,1,1);
let melon = new plot(
    [['x']],  
    'Melon',
    6,200,50,1,1);

let plotList = [        // I HATEEEE having IDs so much but idk how to move on from them for now...ugh
    clear,              //0
    sprinkler,          //1
    laneSprinkler,      //2
    megagrow,           //3
    gigagrow,           //4
    goatFert,           //5
    bullFert,           //6
    elephantFert,       //7
    plantFlower,        //8
    fourLeafClover,     //9
    sixteenLeafClover,  //10
    sixtyfourLeafClover,//11
    emptyPlot,          //12
    carrot,             //13
    grape,              //14
    gloamroot,          //15
    strawberry,         //16
    turnip,             //17
    onion,              //18
    potato,             //19
    pumpkin,            //20
    melon               //21
];

/////////////////////////////////////////////

function makeGroups() {
    groups.length = data.groups.length;
    for(var l = 0; l < data.groups.length; l++){//width and height are swapped here 
        groups[l] = new group(data.groups[l].width, data.groups[l].height, data.groups[l].heightOffset, data.groups[l].widthOffset);
        for(var b = 0; b < data.groups[l].blanks.length; b++)
        {
            groups[l].plots[data.groups[l].blanks[b].x][data.groups[l].blanks[b].y] = -1;
        }
    }
}



function numberWithCommas(x) {//thanks stackoverflow i love you
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}



buildFarm();
function buildFarm(){
    console.log(strawberry.isClover)
    // document.getElementById("farmPlotSelect").selectedIndex = 1;
    // chosenFarmSpot = document.getElementById("farmPlotSelect").value;
    
    
    document.getElementById("englishOrSpanish").innerHTML = "<img id=\"englishOrSpanishImg\" src=\"/images/farmPlots/English.png\">"
    makeGroups();
    let charCode = "A".charCodeAt(0);
    let farm = document.getElementById("Farm");

    let gridDiv = document.createElement("div");// i had to split it up unto visual and buttons
    gridDiv.id = "gridDiv";
    farm.appendChild(gridDiv);
        let plotsDiv = document.createElement("div");
        plotsDiv.id = "plotsDiv";
        gridDiv.appendChild(plotsDiv);
        let placerDiv = document.createElement("div");
        placerDiv.id = "placerDiv";
        gridDiv.appendChild(placerDiv);

    for(let l = 0; l < groups.length; l++){// these are the places the board gets written to
        let letta = String.fromCharCode(charCode + l);
        let g = document.createElement("table");
        g.id = "group"+letta;
        g.className = "gridTable";
        g.style.position = "relative";
        g.style.left = data.groups[l].left;
        g.style.top = data.groups[l].top;
        plotsDiv.appendChild(g);
        for(let i=0; i<groups[l].height; i++){
            let row = document.createElement("tr");
            g.appendChild(row);
            for(let j=0; j<groups[l].width; j++){
                let td = document.createElement("td");
                let plot = document.createElement("div");
                plot.id = "plot"+letta+i+","+j;
                plot.className = "plot";
                plot.style.filter = "";
                plot.dataset.x = j;
                plot.dataset.y = i;
                if(groups[l].plots[i][j] == -1){
                    plot.className = "plotNull";
                }
                else{
                    plot.className = "plot";
                }
                td.appendChild(plot);
                row.appendChild(td);
            }
        }
    }

    for(let l = 0; l < groups.length; l++){// this is the duplicate invisible board on top that gets clicked
        let letta = String.fromCharCode(charCode + l);
        let g = document.createElement("table");
        g.id = "pGroup"+letta;
        g.className = "placerTable";
        g.style.position = "relative";
        g.style.left = data.groups[l].left;
        g.style.top = data.groups[l].top;
        placerDiv.appendChild(g);
        for(let i=0; i<groups[l].height; i++){
            let row = document.createElement("tr");
            g.appendChild(row);
            for(let j=0; j<groups[l].width; j++){
                let td = document.createElement("td");
                let plot = document.createElement("div");
                plot.id = "placer"+letta+i+","+j;
                plot.className = "plot";
                plot.style.filter = "";
                plot.dataset.x = j;
                plot.dataset.y = i;
                if(groups[l].plots[i][j] == -1){
                }
                else{
                    plot.className = "plot";
                    plot.onclick = function(){
                        undoRedoList[undoRedoPosition] = "";
                        undoRedoList[undoRedoPosition] = printFarmstructure();
                        canRedo = false;
                        highestRedoPosition = undoRedoPosition;
                        undoRedoPosition++
                        groups[l].updatePlot(chosenFarmSpot, chosenFarmSpotDirection, i, j, letta);
                        calculateBoard();
                    }
                }
                td.appendChild(plot);
                row.appendChild(td);
            }
        }
    }
    
    

    let uiDiv = document.createElement("div");
    uiDiv.id = "uiDiv";
    farm.appendChild(uiDiv);
    uiDiv.style.display = "";

    //if i create a div with 0x0 dimensions and put everything in there, everything after this wont shift around when the 
    //display shows up.. heh yeah i am a genius please praise me heh heh
    //////////////////////////////breed stuffs///////////////////////////////////
    let breedDiv = document.createElement("div");
    breedDiv.id = "breedDiv";
    uiDiv.appendChild(breedDiv);
        let breedDisplay = document.createElement("div");
        breedDisplay.id = "breedDisplay";
        breedDiv.appendChild(breedDisplay);
            let breedTableDiv = document.createElement("div");
            breedTableDiv.id = "breedTableDiv";
            breedDisplay.appendChild(breedTableDiv);
                let breedParentCountDiv = document.createElement("div");
                breedParentCountDiv.id = "breedParentCountDiv";
                breedParentCountDiv.className = "breedDisplayImgDiv";
                breedDisplay.appendChild(breedParentCountDiv);
                    let breedParentCount = document.createElement("div");
                    breedParentCount.id = "breedParentCount";
                    breedParentCountDiv.appendChild(breedParentCount);
                    breedParentCount.innerHTML = "#";
                let breedSpotImgDiv = document.createElement("div");
                breedSpotImgDiv.id = "breedSpotImgDiv";
                breedSpotImgDiv.className = "breedDisplayImgDiv";
                breedDisplay.appendChild(breedSpotImgDiv);
                    let breedSpotImg = document.createElement("img");
                    breedSpotImg.id = "breedSpotImg";
                    breedSpotImgDiv.appendChild(breedSpotImg);
                    breedSpotImg.src = "/images/farmPlots/alone.png";
                let breedChanceImgDiv = document.createElement("div");
                breedChanceImgDiv.id = "breedChanceImgDiv";
                breedChanceImgDiv.className = "breedDisplayImgDiv";
                breedDisplay.appendChild(breedChanceImgDiv);
                    let breedChanceImg = document.createElement("img");
                    breedChanceImg.id = "breedChanceImg";
                    breedChanceImgDiv.appendChild(breedChanceImg);
                    breedChanceImg.src = "/images/farmPlots/heart.png";
                
                let breedableCounter = 0;
                for(let i = 0; i < plotList.length; i++){
                    if(plotList[i].isBreedable){
                        let c = document.createElement("div");
                        c.className = "breedDisplayImgDiv";
                        c.id = "bdid" + i;      //breed display img div
                        c.innerHTML = "<img class=\"bdImg\" src=\"/images/farmPlots/" + plotList[i].namae + ".png\">";
                        c.style.top  = (3.6 + breedableCounter * 4.1) + "vw";
                        c.style.left = (.4) + "vw";
                        breedTableDiv.appendChild(c);
                        
                        breedableCounter++;
                    }
                }
                let breedTable = document.createElement("table");
                breedTable.id = "breedTable";
                breedTableDiv.appendChild(breedTable);
                breedableCounter = 0;
                for(let i = 0; i < plotList.length; i++){
                    if(plotList[i].isBreedable){
                        let row = document.createElement("tr");
                        breedTable.appendChild(row);
                        for(let j=0; j<3; j++){
                            let td = document.createElement("td");
                            let breedTableCell = document.createElement("div");
                            breedTableCell.id = "breedTable" + i + "," + j;
                            breedTableCell.className = "breedTableCell";
                            td.appendChild(breedTableCell);
                            row.appendChild(td);
                        }
                        breedableCounter++;
                    }
                }
            let breedProfitTableDiv = document.createElement("div");
            breedProfitTableDiv.id = "breedProfitTableDiv";
            breedDisplay.appendChild(breedProfitTableDiv);
                let breedProfitTable = document.createElement("table");
                breedProfitTable.id = "breedProfitTable";
                breedProfitTableDiv.appendChild(breedProfitTable);
                breedProfitTableDiv.style.display = "none"
                breedableCounter = 0;
                for(let i = 0; i < plotList.length; i++){
                    if(plotList[i].isBreedable){
                        let row = document.createElement("tr");
                        breedProfitTable.appendChild(row);
                        for(let j=0; j<3; j++){
                            let td = document.createElement("td");
                            let breedTableCell = document.createElement("div");
                            breedTableCell.id = "breedProfitTable" + i + "," + j;
                            breedTableCell.className = "breedProfitTableCell";
                            if(j%2 == 1){
                                breedTableCell.style.borderColor = "#de7373";
                                breedTableCell.style.backgroundColor = "#f2ded6";
                            }else{
                                breedTableCell.style.borderColor = "#bfc673";
                                breedTableCell.style.backgroundColor = "#eef2d6";
                            }
                            td.appendChild(breedTableCell);
                            row.appendChild(td);
                        }
                        breedableCounter++;
                    }
                }

    //////////////////////////////erase farm stuffs///////////////////////////////////
    let eraseFarmDiv = document.createElement("div");
    eraseFarmDiv.id = "eraseFarmDiv";
    uiDiv.appendChild(eraseFarmDiv);
        let eraseFarmImg = document.createElement("img");
        eraseFarmImg.id = "eraseFarmImg";
        eraseFarmDiv.appendChild(eraseFarmImg);
        eraseFarmImg.src = "/images/farmPlots/Remove.png";
        eraseFarmImg.onclick = function(){
            undoRedoList[undoRedoPosition] = "";
            undoRedoList[undoRedoPosition] = printFarmstructure();
            canRedo = false;
            highestRedoPosition = undoRedoPosition;
            undoRedoPosition++
            for(let l=0; l<6; l++){
                groups[l].clearfarm(String.fromCharCode(charCode + l));
            }
            calculateBoard();
        }

    //////////////////////////////undoRedo stuffs///////////////////////////////////
    let undoRedoDiv = document.createElement("div");
    undoRedoDiv.id = "undoRedoDiv";
    uiDiv.appendChild(undoRedoDiv);
        let undoRedo = document.createElement("div");
        undoRedo.id = "undoRedo";
        undoRedoDiv.appendChild(undoRedo);
            let undoBox = document.createElement("div");
            undoBox.id = "undoBox";
            undoRedo.appendChild(undoBox);
                let undoImg = document.createElement("img");
                undoImg.id = "undoImg";
                undoImg.src = "/images/farmPlots/undo.png";
                undoBox.appendChild(undoImg);
                undoBox.onclick = function(){
                    if(undoRedoPosition > 0){
                        undoRedoList[undoRedoPosition] = printFarmstructure();
                        undoRedoPosition--;
                        canRedo = true;
                        readFarmstructure(undoRedoList[undoRedoPosition]);
                        calculateBoard();
                    }
                }

            let redoBox = document.createElement("div");
            redoBox.id = "redoBox";
            undoRedo.appendChild(redoBox);
                let redoImg = document.createElement("img");
                redoImg.id = "redoImg";
                redoImg.src = "/images/farmPlots/redo.png";
                redoBox.appendChild(redoImg);
                redoBox.onclick = function(){
                    if(canRedo){
                        if(undoRedoPosition == highestRedoPosition){
                            canRedo = false;
                        }
                        undoRedoList[undoRedoPosition] = printFarmstructure();
                        undoRedoPosition++;
                        readFarmstructure(undoRedoList[undoRedoPosition]);
                        calculateBoard();
                    }
                }

    //////////////////////////////save/load stuffs///////////////////////////////////
    let saveLoadDiv = document.createElement("div");
    saveLoadDiv.id = "saveLoadDiv";
    uiDiv.appendChild(saveLoadDiv);
        let saveLoad = document.createElement("div");
        saveLoad.id = "saveLoad";
        saveLoadDiv.appendChild(saveLoad);
            let loadIconBox = document.createElement("div");
            loadIconBox.id = "loadIconBox";
            saveLoad.appendChild(loadIconBox);
                let loadIcon = document.createElement("img");
                loadIcon.id = "loadIcon";
                loadIcon.src = "/images/farmPlots/loadIcon.png";
                loadIconBox.appendChild(loadIcon);

            let farmIconBox = document.createElement("div");
            farmIconBox.id = "farmIconBox";
            saveLoad.appendChild(farmIconBox);
                let farmIcon = document.createElement("img");
                farmIcon.id = "farmIcon";
                farmIcon.src = "/images/farmPlots/farmIcon.png";
                farmIconBox.appendChild(farmIcon);

            let importBox = document.createElement("div");
            importBox.id = "importBox";
            importBox.contentEditable = true;
            importBox.spellcheck = false;
            saveLoad.appendChild(importBox);
            let currentBox = document.createElement("div");
            currentBox.id = "currentBox";
            saveLoad.appendChild(currentBox);
            currentBox.onclick = function(){
                navigator.clipboard.writeText(currentBox.textContent);
            }
            //currentBox.innerHTML = "";

            let importButtonBox = document.createElement("div");  readFarmstructure
            importButtonBox.id = "importButtonBox";
            saveLoad.appendChild(importButtonBox);
            importButtonBox.onclick = function(){
                undoRedoList[undoRedoPosition] = "";
                undoRedoList[undoRedoPosition] = printFarmstructure();
                canRedo = false;
                highestRedoPosition = undoRedoPosition;
                undoRedoPosition++
                readFarmstructure(document.getElementById("importBox").innerHTML);
                calculateBoard();
            }
                let importButton = document.createElement("img");
                importButton.id = "importButton";
                importButton.src = "/images/farmPlots/import.png";
                importButtonBox.appendChild(importButton);

    ///////////////////////////hoe stufs///////////////////////////////////
    let hoeDisplayDiv = document.createElement("div");
    hoeDisplayDiv.id = "hoeDisplayDiv";
    uiDiv.appendChild(hoeDisplayDiv);
        let hoeDropDownDiv = document.createElement("div");
        hoeDisplayDiv.appendChild(hoeDropDownDiv);
        hoeDropDownDiv.id = "hoeDropDownDiv"; 
        hoeDropDownDiv.innerHTML = "<img id=\"hoedropDownImg\" src=\"/images/farmPlots/dropDownArrow.png\">";
        hoeDropDownDiv.onclick = function(){
            hoeSelectorDiv.style.display = "";
            calculateBoard();
        } 
        let hoeTool = document.createElement("div");
        hoeTool.id = "hoeTool";
        hoeDisplayDiv.appendChild(hoeTool);
        hoeTool.innerHTML = "<img class=\"hoeToolImg\" src=\"/images/farmPlots/Hoe0.png\">";
        hoeTool.onclick = function(){
            hoeSelectorDiv.style.display = "";
            calculateBoard();
        } 
        let hoeSelectorDiv = document.createElement("div");
        hoeDisplayDiv.appendChild(hoeSelectorDiv);
        hoeSelectorDiv.id = "hoeSelectorDiv";  
        hoeSelectorDiv.style.display = "none";
            for(let i=0; i<=6; i++){
                let c = document.createElement("img");
                c.className = "hoeSelectorImg";
                c.id = "hoeSelector" + i;
                c.src = "/images/farmPlots/Hoe" + i + ".png";
                c.style.position = "relative";
                c.style.height = "5.3vw";
                c.style.left = ".5vw";
                c.onclick = function(){
                    chosenHoe = i;
                    hoeSelectorDiv.style.display = "none";
                    hoeTool.innerHTML = "<img class=\"hoeToolImg\" src=\"/images/farmPlots/Hoe" + i + ".png\">";
                    calculateBoard();
                }
                hoeSelectorDiv.appendChild(c);
            }

    /////////////////////////////orb stuff////////////////////////////////////
    let orbDisplayDiv = document.createElement("div");
    uiDiv.appendChild(orbDisplayDiv);
    orbDisplayDiv.id = "orbDisplayDiv";   
        let orbPricingDiv = document.createElement("div");
        orbPricingDiv.id = "orbPricingDiv";
        orbDisplayDiv.appendChild(orbPricingDiv);
            let orbPricing = document.createElement("div");
            orbPricing.id = "orbPricing";
            orbPricingDiv.appendChild(orbPricing);
        let sickleOrbDiv = document.createElement("div");
        orbDisplayDiv.appendChild(sickleOrbDiv);
        sickleOrbDiv.id = "sickleOrbDiv";   
        let sickleOrbUpDiv = document.createElement("div");
        orbDisplayDiv.appendChild(sickleOrbUpDiv);
        sickleOrbUpDiv.id = "sickleOrbUpDiv";  
            let sickleOrbUp = document.createElement("div");
            sickleOrbUpDiv.appendChild(sickleOrbUp);
            sickleOrbUp.id = "sickleOrbUp";   
            sickleOrbUp.innerHTML = "+";
            sickleOrbUpDiv.onclick = function(){
                orbs++;
                calculateBoard();
            }
        let sickleOrbDownDiv = document.createElement("div");
        orbDisplayDiv.appendChild(sickleOrbDownDiv);
        sickleOrbDownDiv.id = "sickleOrbDownDiv";   
            let sickleOrbDown = document.createElement("div");
            sickleOrbDownDiv.appendChild(sickleOrbDown);
            sickleOrbDown.id = "sickleOrbDown";   
            sickleOrbDown.innerHTML = "-";
            sickleOrbDownDiv.onclick = function(){
                if(orbs > 0){
                    orbs--;
                }
                calculateBoard();
            }
            let sickleOrbCount = document.createElement("div");
            sickleOrbDiv.appendChild(sickleOrbCount);
            sickleOrbCount.id = "sickleOrbCount";

    /////////////////////////////sickle stuff////////////////////////////////////
    let sickleDisplayDiv = document.createElement("div");
    uiDiv.appendChild(sickleDisplayDiv);
    sickleDisplayDiv.id = "sickleDisplayDiv";
        let sickleDisplay = document.createElement("div");
        sickleDisplayDiv.appendChild(sickleDisplay);
        sickleDisplay.id = "sickleDisplay";
            let sickleDropDownDiv = document.createElement("div");
            sickleDisplay.appendChild(sickleDropDownDiv);
            sickleDropDownDiv.id = "sickleDropDownDiv"; 
            sickleDropDownDiv.innerHTML = "<img id=\"sickledropDownImg\" src=\"/images/farmPlots/dropDownArrow.png\">";
            sickleDropDownDiv.onclick = function(){
                sickleSelectorDiv.style.display = "";
            } 
            let sickleImgDiv = document.createElement("div");
            sickleDisplay.appendChild(sickleImgDiv);
            sickleImgDiv.id = "sickleImgDiv";
            sickleImgDiv.onclick = function(){
                sickleSelectorDiv.style.display = "";
            }
            let sickleYieldDiv = document.createElement("div");
            sickleDisplay.appendChild(sickleYieldDiv);
            sickleYieldDiv.id = "sickleYieldDiv"; 
            sickleYieldDiv.innerHTML = "&nbsp+&nbsp" + sickleYield + "&nbsp" + "<img id=\"sickleYieldImg\" src=\"/images/farmPlots/yield.png\">";
            
            let sickleProfitLabel = document.createElement("div");
            sickleDisplay.appendChild(sickleProfitLabel);
            sickleProfitLabel.id = "sickleProfitLabel"; 
            sickleProfitLabel.innerHTML = "Sickle Profit: "; 
            let sickleProfitScore = document.createElement("div");
            sickleDisplay.appendChild(sickleProfitScore);
            sickleProfitScore.id = "sickleProfitScore";  
            sickleProfitScore.innerHTML = "+0"; 
            let sickleSelectorDiv = document.createElement("div");
            sickleDisplay.appendChild(sickleSelectorDiv);
            sickleSelectorDiv.id = "sickleSelectorDiv";  
            sickleSelectorDiv.style.display = "none";
                for(let i=1; i<=6; i++){
                    let c = document.createElement("img");
                    c.className = "sickleSelectorImg";
                    c.id = "sickleSelector" + i;
                    c.src = "/images/farmPlots/Sickle" + i + ".png";
                    c.style.position = "relative";
                    c.style.width = "5.3vw";
                    c.style.left = ".5vw";
                    c.onclick = function(){
                        chosenSickle = i;
                        sickleSelectorDiv.style.display = "none";
                        sickleImgDiv.innerHTML = "<img id=\"sickleImg\" src=\"/images/farmPlots/Sickle" + i + ".png\">";
                        calculateBoard();
                    }
                    sickleSelectorDiv.appendChild(c);
                }
    
    document.getElementById("sickleImgDiv").innerHTML = "<img id=\"sickleImg\" src=\"/images/farmPlots/Sickle1.png\">";

    //////////////////////////////reveal stuffs///////////////////////////////////
    let revealDisplayDiv = document.createElement("div");
    revealDisplayDiv.id = "revealDisplayDiv";
    uiDiv.appendChild(revealDisplayDiv);
        let revealDisplay = document.createElement("div");
        revealDisplayDiv.appendChild(revealDisplay);
        revealDisplay.id = "revealDisplay";
            let revealWatered = document.createElement("img");
            revealWatered.id = "revealWatered";
            revealWatered.className = "revealImg";
            revealDisplay.appendChild(revealWatered);
            revealWatered.src = "/images/farmPlots/watered.png";
            revealWatered.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
            revealWatered.onclick = function(){
                if(revealWateredSelected == true){
                    revealWateredSelected = false;
                    revealWatered.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
                }else{
                    revealWateredSelected = true;
                    revealWatered.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(200%) contrast(100%)";
                }
                calculateBoard();
            }

            let revealFert = document.createElement("img");
            revealFert.id = "revealFert";
            revealFert.className = "revealImg";
            revealDisplay.appendChild(revealFert);
            revealFert.src = "/images/farmPlots/fert.png";
            revealFert.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
            revealFert.onclick = function(){
                if(revealFertSelected == true){
                    revealFertSelected = false;
                    revealFert.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
                }else{
                    revealFertSelected = true;
                    revealFert.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(200%) contrast(100%)";
                }
                calculateBoard();
            }

            let revealUV = document.createElement("img");
            revealUV.id = "revealUV";
            revealUV.className = "revealImg";
            revealDisplay.appendChild(revealUV);
            revealUV.src = "/images/farmPlots/uv.png";
            revealUV.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
            revealUV.onclick = function(){
                if(revealUVSelected == true){
                    revealUVSelected = false;
                    revealUV.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(0%) contrast(100%)";
                }else{
                    revealUVSelected = true;
                    revealUV.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(200%) contrast(100%)";
                }
                calculateBoard();
            }

    //////////////////////////////counter stuffs///////////////////////////////////
    let counterDisplayDiv = document.createElement("div");
    counterDisplayDiv.id = "counterDisplayDiv";
    uiDiv.appendChild(counterDisplayDiv);
        let rotationSelectorDiv = document.createElement("div");
        rotationSelectorDiv.id = "rotationSelectorDiv";
        counterDisplayDiv.appendChild(rotationSelectorDiv);
            let rotationSelector = document.createElement("div");
            rotationSelector.id = "rotationSelector";
            rotationSelectorDiv.appendChild(rotationSelector);
                let rotationSelectorUp = document.createElement("img");
                rotationSelectorUp.id = "rotationSelectorUp";
                rotationSelectorUp.className = "rotationSelectorImg";
                rotationSelectorUp.src = "/images/farmPlots/Rotate.png";
                rotationSelector.appendChild(rotationSelectorUp);
                let rotationSelectorOverlay = document.createElement("img");
                rotationSelectorOverlay.id = "rotationSelectorOverlay";
                rotationSelectorOverlay.src = "/images/farmPlots/Arrow.png";
                rotationSelectorOverlay.style.rotate = "0deg"
                rotationSelector.appendChild(rotationSelectorOverlay);
                rotationSelector.onclick = function(){//GOTTA REWRITE THIS
                    if(chosenFarmSpotDirection == 3){
                        chosenFarmSpotDirection = 0;
                    }else{
                        chosenFarmSpotDirection++;
                    }
                    
                    document.getElementById("rotationSelectorOverlay").style.rotate = (chosenFarmSpotDirection * 90) + "deg";
                }

        let erasePlotDiv = document.createElement("div");
        erasePlotDiv.id = "erasePlotDiv";
        counterDisplayDiv.appendChild(erasePlotDiv);
            let erasePlot = document.createElement("div");
            erasePlot.id = "erasePlot";
            erasePlotDiv.appendChild(erasePlot);
                let erasePlotImg = document.createElement("img");
                erasePlotImg.id = "erasePlotImg";
                erasePlotImg.src = "/images/farmPlots/circleX.png";
                erasePlot.appendChild(erasePlotImg);
            erasePlot.onclick = function(){
                chosenFarmSpot = 0;
                if(chosenFarmSpot != previousPlot){
                    erasePlot.style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(150%) contrast(100%)";
                    document.getElementById("cdid" + previousPlot).style.filter = "";
                }
                previousPlot = chosenFarmSpot;
            }


        let counterDisplay = document.createElement("div");
        counterDisplay.id = "counterDisplay";
        counterDisplayDiv.appendChild(counterDisplay);
        
        for(let i = 0; i < plotList.length; i++){
            let c = document.createElement("div");
            c.className = "counterDisplayImgDiv";
            c.id = "cdid" + i;      //counter display img div
            if(i==0){
                c.innerHTML = "<img class=\"cdImg\" src=\"/images/farmPlots/Crops.png\">";
            }else{
                c.innerHTML = "<img class=\"cdImg\" src=\"/images/farmPlots/" + plotList[i].namae + ".png\">";
                c.onclick = function(){
                    chosenFarmSpot = i;
                    if(chosenFarmSpot != previousPlot){
                        document.getElementById("cdid" + i).style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(150%) contrast(100%)";
                        erasePlot.style.filter = "";
                        document.getElementById("cdid" + previousPlot).style.filter = "";
                    }
                    previousPlot = chosenFarmSpot;
                }
            }
            if(i>=12){
                c.style.top  = (7.2 + i * -4) + "vw";
                c.style.left = (.5 + (i-11) * 4.1) + "vw";
            }else if(i==0){
                c.style.top  = (7.2 + i * -4) + "vw";
                c.style.left = (.5 + 0 * 4.1) + "vw";
            }else{
                c.style.top  = (.4 + i * -4) + "vw";
                c.style.left = (-3.6 + i * 4.1) + "vw";
            }
            counterDisplay.appendChild(c);
        }
        for(let i = 0; i < plotList.length; i++){
            let c = document.createElement("div");
            c.className = "counterDisplayNumDiv";
            c.id = "cdnd" + i;      //counter display number div
            c.innerHTML = "0";
            if(i>=12){
                c.style.top  = (-76.6 + i * -2) + "vw";
                c.style.left = (.5 + (i-11) * 4.1) + "vw";
            }else if(i==0){
                c.style.top  = (-76.6 + i * -2) + "vw";
                c.style.left = (.5 + 0 * 4.1) + "vw";
            }else{
                c.style.top  = (-83.3 + i * -2) + "vw";
                c.style.left = (-3.6 + i * 4.1) + "vw";
            }
            counterDisplay.appendChild(c);
        }
        for(let i = 0; i < plotList.length; i++){
            let c = document.createElement("div");
            c.className = "counterDisplayOrbDiv";
            c.id = "cdod" + i;      //counter display orb div
            c.style.color = "lime";
            if(plotList[i].isSeedCapped){
                c.innerHTML = "/5";
            }else{
                c.innerHTML = "/30";
            }

            if(i==0){
                c.style.top  = (-118.2 + i * -1.8) + "vw";
                c.style.left = (.5 + 0 * 4.1) + "vw";
                counterDisplay.appendChild(c);
            }else if(plotList[i].isCrop){
                c.style.top  = (-98.4 + i * -1.8) + "vw";
                c.style.left = (.5 + (i-11) * 4.1) + "vw";
                counterDisplay.appendChild(c);
            }
        }
        document.getElementById("cdid" + chosenFarmSpot).style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(150%) contrast(100%)";

    //////////////////////////profit display stuffs///////////////////////////////////////
    let profitDisplayDiv = document.createElement("div");
    profitDisplayDiv.id = "profitDisplayDiv";
    uiDiv.appendChild(profitDisplayDiv);
        let profitDisplay = document.createElement("div");
        profitDisplay.id = "profitDisplay";
        profitDisplayDiv.appendChild(profitDisplay);
            let playerProfitlabel = document.createElement("div");
            playerProfitlabel.innerHTML = "Hourly Profit:"
            playerProfitlabel.id = "playerProfitlabel";
            profitDisplay.appendChild(playerProfitlabel);
            profitDisplay.appendChild(document.createElement("br"));
            let playerProfitScore = document.createElement("div");
            playerProfitScore.innerHTML = "[MIN: 0] [MAX: 0]"
            playerProfitScore.id = "playerProfitScore";
            profitDisplay.appendChild(playerProfitScore);
            profitDisplay.appendChild(document.createElement("br"));

            let playerStrangeRatelabel = document.createElement("div");
            playerStrangeRatelabel.innerHTML = "Strange Rate: "
            playerStrangeRatelabel.id = "playerStrangeRatelabel";
            profitDisplay.appendChild(playerStrangeRatelabel);
            let playerStrangerateScore = document.createElement("div");
            playerStrangerateScore.innerHTML = "0.15%"
            playerStrangerateScore.id = "playerStrangerateScore";
            profitDisplay.appendChild(playerStrangerateScore);
            profitDisplay.appendChild(document.createElement("br"));
            
            let playerCloverTimelabel = document.createElement("div");
            playerCloverTimelabel.innerHTML = "Clover Time: "
            playerCloverTimelabel.id = "playerCloverTimelabel";
            profitDisplay.appendChild(playerCloverTimelabel);
            let playerCloverTimeScore = document.createElement("div");
            playerCloverTimeScore.innerHTML = "100%"
            playerCloverTimeScore.id = "playerCloverTimeScore";
            profitDisplay.appendChild(playerCloverTimeScore);

    /////////////////////////////calculation toggle stuffs//////////////////////////////////// 
    let toggleDisplayDiv = document.createElement("div");
    toggleDisplayDiv.id = "toggleDisplayDiv";
    uiDiv.appendChild(toggleDisplayDiv);
        let toggleDisplay = document.createElement("div");
        toggleDisplay.id = "toggleDisplay";
        toggleDisplayDiv.appendChild(toggleDisplay);
            let fertToggle = document.createElement("div");
            fertToggle.id = "fertToggle";
            toggleDisplay.appendChild(fertToggle);
                let fertToggleImg = document.createElement("img");
                fertToggleImg.id = "fertToggleImg";
                fertToggleImg.src = "/images/farmPlots/fert.png";
                fertToggle.appendChild(fertToggleImg);
                fertToggleImg.onclick = function(){
                    fertToggleX.style.display = ""
                    fertSelected = true;
                    calculateBoard();
                }
                let fertToggleX = document.createElement("img");
                fertToggleX.id = "fertToggleX";
                fertToggleX.style.display = "";
                fertToggleX.src = "/images/farmPlots/orbAdd.png";
                fertToggle.appendChild(fertToggleX);
                fertToggleX.onclick = function(){
                    fertToggleX.style.display = "none"
                    fertSelected = true;
                    calculateBoard();
                }

            let strangeToggle = document.createElement("div");
            strangeToggle.id = "strangeToggle";
            toggleDisplay.appendChild(strangeToggle);
                let strangeToggleImg = document.createElement("img");
                strangeToggleImg.id = "strangeToggleImg";
                strangeToggleImg.src = "/images/farmPlots/Gold4LeafClover.png";
                strangeToggle.appendChild(strangeToggleImg);
                strangeToggleImg.onclick = function(){
                    strangeToggleX.style.display = ""
                    strangeSelected = false;
                    calculateBoard();
                }
                let strangeToggleX = document.createElement("img");
                strangeToggleX.id = "strangeToggleX";
                strangeToggleX.style.display = "";
                strangeToggleX.src = "/images/farmPlots/orbAdd.png";
                strangeToggle.appendChild(strangeToggleX);
                strangeToggleX.onclick = function(){
                    strangeToggleX.style.display = "none"
                    strangeSelected = true;
                    calculateBoard();
                }

    /////////////////////////////////////////////////////////////////
    
    document.getElementById("englishOrSpanish").onclick = function(){
        if(englishSelected){
            document.getElementById("englishOrSpanish").innerHTML = "<img id=\"englishOrSpanishImg\" src=\"/images/farmPlots/Espanol.png\">"
            document.getElementById("instructions").innerHTML = 
                "Instrucciones:\<br\>" +
                "--N/A :(";
            englishSelected = false;
        }else{
            document.getElementById("englishOrSpanish").innerHTML = "<img id=\"englishOrSpanishImg\" src=\"/images/farmPlots/English.png\">"
            document.getElementById("instructions").innerHTML = 
                "Instructions:\<br\>" +
                "--N/A :(";
            englishSelected = true;
        }
        calculateBoard();
    }
    
    readFarmstructure(startingFarm);
    calculateBoard();
}

/////////////////////////////////////////////////////////
function setLuck(){
    luck = 70 + (Math.round(2 * (Math.random() * 40)) / 2);
}

/////////////////////////////////////////////////////////
function luckClamp(n){
    n = Math.min(n, 250);
    n = Math.max(0, n);
    return n;
}

/////////////////////////////////////////////////////////
function possibleBreedSpots(l, k, i, j){//groups, plot id, row, col
    var spots = [];
    let x = 0;
    let y = 0;
    
    if(groups[l].canPlace(k, 0, i-2, j)){//up
        if(groups[l].breedSpotList[i-2][j][k] > 0 && !groups[l].isOccupied(i-2, j)){
            spots[x] = y
            x++
        }
    }
    y++

    if(groups[l].canPlace(k, 0, i, j+2)){//right
        if(groups[l].breedSpotList[i][j+2][k] > 0 && !groups[l].isOccupied(i, j+2)){
            spots[x] = y
            x++
        }
    }
    y++

    if(groups[l].canPlace(k, 0, i+2, j)){//down
        if(groups[l].breedSpotList[i+2][j][k] > 0 && !groups[l].isOccupied(i+2, j)){
            spots[x] = y
            x++
        }
    }
    y++

    if(groups[l].canPlace(k, 0, i, j-2)){//left
        if(groups[l].breedSpotList[i][j-2][k] > 0 && !groups[l].isOccupied(i, j-2)){
            spots[x] = y
            x++
        }
    }
    y++

    if(x==0){//something about this feels illegal lmao
        return false;
    }else{
        return spots;
    }
}

/////////////////////////////////////////////////////////
function findParents(l, k, i, j){//groups, plot id, row, col
    var parents = [];
    let y = 0;
    
    
    parents[y] = 0
    if(groups[l].canPlace(k, 0, i-2, j-2)){//up-left
        if(groups[l].plots[i-2][j-2] == k){
            parents[y] = 1
        }
    }
    y++

    parents[y] = 0
    if(groups[l].canPlace(k, 0, i-2, j+2)){//up-right
        if(groups[l].plots[i-2][j+2] == k){
            parents[y] = 1
        }
    }
    y++

    parents[y] = 0
    if(groups[l].canPlace(k, 0, i+2, j+2)){//down-right
        if(groups[l].plots[i+2][j+2] == k){
            parents[y] = 1
        }
    }
    y++

    parents[y] = 0
    if(groups[l].canPlace(k, 0, i+2, j-2)){//down-left
        if(groups[l].plots[i+2][j-2] == k){
            parents[y] = 1
        }
    }
    y++
    
    return parents;
}

/////////////////////////////////////////////////////////
function seedCappedAmmount(){
    let x = Math.ceil((chosenHoe-1)/2)*5+5

    if(chosenHoe == 6){
        x += Math.ceil((orbs-4)/5)*5;
    }

    return x;
}

/////////////////////////////////////////////////////////
function plotsAmmount(){
    let x = 30 + chosenHoe*5

    if(chosenHoe == 6){
        x += orbs*2;
    }

    return x;
}

//////////////////////////////////////////////////////////////////////////
function orbUpdate(){
    var orbPrices = [0];
    let totalOrbPrice = 0;

    for(let l=0; l<orbs; l++){
        orbPrices[l] = Math.min((Math.pow(2, l) * baseOrbPrice), 2560000);
        totalOrbPrice += orbPrices[l];
    }

    sickleOrbCount.innerHTML = orbs + "&nbsp<img id=\"sickleOrbImg\" src=\"/images/farmPlots/orbIcon.png\">";

    document.getElementById("orbPricing").innerHTML = "$" + numberWithCommas(totalOrbPrice) + "<br>----------------<br>";
    for(let l=0; l<orbs; l++){// i want to put the total at the top.. so idk ggs gotta loop again
        document.getElementById("orbPricing").innerHTML += (l+1) + ": $" + numberWithCommas(orbPrices[l]) + "<br>";
    }


}

//////////////////////////////////////////////////////////////////////////
function calculateBoard(){
    orbUpdate();
    let minHourlyProfit = 0;
    let maxHourlyProfit = 0;
    let cloverVal = 0;
    let cloverTotal = 0;
    let cloverTimeEffect = 0;
    let cloverStrangeEffect = 0;
    let totalPlots = 0;

        
    var breedSpotCount = [];
    var breedChanceCount = [];

    var totalBabies = [];
    var lowestBabies = [];
    var avgBabies = [];
    var highestBabies = [];

    let sickleProfit = 0;
    if(chosenSickle == 6){
        sickleYield = chosenSickle + orbs;
    }else{
        sickleYield = chosenSickle;
    }
    document.getElementById("sickleYieldDiv").innerHTML = "&nbsp+&nbsp" + sickleYield + "&nbsp" + "<img id=\"sickleYieldImg\" src=\"/images/farmPlots/yield.png\">";

    for(let l=0; l<plotList.length; l++){
        plotCount[l] = 0;
        breedSpotCount[l] = 0;
        breedChanceCount[l] = 0;
        
        totalBabies[l] = 0;
        lowestBabies[l] = 0;
        avgBabies[l] = 0;
        highestBabies[l] = 0;
    }

    //count totals
    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].plots[i][j] != -1){
                    //document.getElementById("plotB5,3").innerHTML += groups[l].plots[i][j];
    
                    if(plotList[Math.max(0,groups[l].plots[i][j])].isCrop){
                        totalPlots++;
                    }
    
                    plotCount[groups[l].plots[i][j]]++;
                    for(let k=0; k<plotList.length; k++){
                        if(plotList[k].isBreedable && groups[l].breedSpotList[i][j][k] > 0 && !groups[l].isOccupied(i, j)){
                            breedSpotCount[k]++;
                        }
                    }
                    breedChanceCount[groups[l].plots[i][j]] += groups[l].breedChanceList[i][j][groups[l].plots[i][j]];
                }
            }
        }
    }


    //run the breed sims.
    //r is repetitions for redoing the sim
    //k is plot id
    //l is group
    //i is row
    //j is col
    //x is breed chances per clover
    let repetitions = 300
    let luckChangeTotal = 0;
    let luckTotal =0;
    for(let r = 0; r < repetitions; r++){
        var babies = [];
        let startLuck = luck;

        for(let k = 0; k < plotList.length; k++){
            babies[k] = 0;

            if(plotList[k].isBreedable){
                for(let l=0; l<6; l++){
                    for(let i=0; i<groups[l].height; i++){
                        for(let j=0; j<groups[l].width; j++){ 
                            if(plotList[Math.max(0,groups[l].plots[i][j])].isBreedable){
                                let spots = possibleBreedSpots(l,k,i,j);

                                for(let x=0; x<groups[l].breedChanceList[i][j][k]; x++){
    
                                    let roll = Math.pow(Math.random(), luckClamp(luck) * .01);
                                    //console.log(roll)
                                    if(plotList[k].namae.includes("64")){
                                        roll *= 10;//64 nerf
                                    }
    
                                    //ok now check babies
                                    if(spots){
                                        if(roll < .01){//baby
                                            if(roll < .001 && !(plotList[k].namae.includes("64"))){//promote :: 64 cant promote
                                                //gotta make promote to next tier code
        
                                                luck -= 5
                                            }else{
                                                babies[k]++;
        
                                                luck -=2.5
                                            }
                                        }else{//fail
                                            //boowomp
                                            luck += .5
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
            
            totalBabies[k] += babies[k];
            lowestBabies[k] = Math.min(lowestBabies[k], babies[k]);
            highestBabies[k] = Math.max(highestBabies[k], babies[k]);
            avgBabies[k] = totalBabies[k]/repetitions;
        }
    luckChangeTotal+= (luck-startLuck);
    luckTotal+=luck;
        setLuck();//reset luck for next run
    }
    let averageLuckChange = luckChangeTotal/repetitions;
    let averageLuck = luckTotal/repetitions;
    setLuck();//reset luck for next run


    cloverVal = (1 * plotCount[9]) + (16 * plotCount[10]) + (256 * plotCount[11]);
    cloverTotal = plotCount[9] + plotCount[10] + plotCount[11];
    cloverTimeEffect = (Math.pow(cloverTotal, 3) + 2047) / 2047;
    cloverStrangeEffect = (1 + Math.log2(cloverVal + 1)) * baseStrangeRate;

    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
    
                if(plotList[Math.max(0,groups[l].plots[i][j])].isBreedable){
                    let parents = findParents(l, groups[l].plots[i][j], i, j);
                    for(let p=0; p<parents.length; p++){
                        if(parents[p] == 0){
                            document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML =
                            document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML.replace(
                                "<img class=\"plotBreed" + (p+1) + "\" style=\"filter:invert(77%) sepia(10%) saturate(1308%) hue-rotate(305deg) brightness(416%) contrast(102%)\" src=\"/images/farmPlots/heart.png\">",
                                "<img class=\"plotBreed" + (p+1) + "\" style=\"filter:invert(77%) sepia(10%) saturate(1308%) hue-rotate(305deg) brightness(0%) contrast(102%)\" src=\"/images/farmPlots/heart.png\">"
                                );
                        }else{
                            document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML =
                            document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML.replace(
                                "<img class=\"plotBreed" + (p+1) + "\" style=\"filter:invert(77%) sepia(10%) saturate(1308%) hue-rotate(305deg) brightness(0%) contrast(102%)\" src=\"/images/farmPlots/heart.png\">",
                                "<img class=\"plotBreed" + (p+1) + "\" style=\"filter:invert(77%) sepia(10%) saturate(1308%) hue-rotate(305deg) brightness(416%) contrast(102%)\" src=\"/images/farmPlots/heart.png\">"
                                );
                        }
                    }
                }
                if(groups[l].breedTotal[i][j] > 0 && groups[l].canPlace(0, 0, i, j) && !groups[l].isOccupied(i, j)){
                    document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML = 
                        "<img class=\"breedDot\" src=\"/images/farmPlots/alone.png\">";
                }else if(groups[l].breedTotal[i][j] == 0 && groups[l].canPlace(0, 0, i, j) && !groups[l].isOccupied(i, j)){
                    document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML =
                    document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).innerHTML.replace(
                        "<img class=\"breedDot\" src=\"/images/farmPlots/alone.png\">",
                        ""
                        );
                }

                if(plotList[Math.max(0,groups[l].plots[i][j])].isCrop){
                    if(revealWateredSelected && groups[l].watered[i][j] == 0){
                        document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).style.filter = "invert(0%) sepia(0%) saturate(200%) hue-rotate(350deg) brightness(150%) contrast(100%)";
                    }else if(revealFertSelected && groups[l].fert[i][j] == 0){
                        document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).style.filter = "invert(0%) sepia(0%) saturate(200%) hue-rotate(350deg) brightness(150%) contrast(100%)";
                    }else if(revealUVSelected && groups[l].uv[i][j] == 0){
                        document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).style.filter = "invert(0%) sepia(0%) saturate(200%) hue-rotate(350deg) brightness(150%) contrast(100%)";
                    }else{
                        document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).style.filter = "";
                    }

                    let yieldBoost = 1;
                    let timeBoost = 1 * cloverTimeEffect;
                    let strawberryBoost = 1;
                    let strawberryHourlyRepeat = 1;

                    let sickleBoost = sickleYield;
                    let minProfit = plotList[groups[l].plots[i][j]].minYield;
                    let maxProfit = plotList[groups[l].plots[i][j]].maxYield;

                    if((plotList[groups[l].plots[i][j]].namae).localeCompare('Onion') == 0){
                        minProfit = plotList[groups[l].plots[i][j]].minYield + groups[l].planted[i][j];
                        maxProfit = plotList[groups[l].plots[i][j]].minYield + groups[l].planted[i][j];
                    }

                    if(groups[l].uv[i][j] > 0){
                        if(plotList[groups[l].plots[i][j]].isConsumable){
                            yieldBoost *= 1.25;
                        }else{
                            yieldBoost += .25;
                        }
                    }
                    if(groups[l].fert[i][j] > 0){////rounding doesn make sense if i dont do this?? coco help meee
                        if(plotList[groups[l].plots[i][j]].isConsumable){
                            yieldBoost *= 1.499;
                        }else{
                            yieldBoost += .499;
                        }
                    }
                    if(groups[l].watered[i][j] > 0){
                        timeBoost *= .8;
                    }

                    if(groups[l].strawberried[i][j] > 0 && !(plotList[groups[l].plots[i][j]].isStrawberry)){
                        let minutes = 0;
                        let ogMinutes = 0;
                        do{
                            ogMinutes += 30;
                            minutes += 30;
                            if((ogMinutes % (plotList[16].time * 60)) == 0){
                                minutes += 30*groups[l].strawberried[i][j];
                            }
                        }while(!(minutes%(plotList[groups[l].plots[i][j]].time*60) == 0 && ogMinutes%(plotList[groups[l].plots[i][j]].time*60) == 0 && 
                                ogMinutes >= (plotList[16].time * 60)));
                        strawberryBoost = Math.ceil(minutes / (plotList[groups[l].plots[i][j]].time*60));
                        strawberryHourlyRepeat = Math.ceil(ogMinutes / (plotList[groups[l].plots[i][j]].time*60));
                        //document.getElementById("plotB5,5").innerHTML = strawberryBoost +","+ strawberryHourlyRepeat +","+ minutes +","+ ogMinutes;
                    }
                    
                    //console.log(Math.round(yieldBoost*minProfit) + "," + yieldBoost*minProfit);

                    sickleBoost = Math.round(yieldBoost*sickleBoost);
                    minProfit = Math.round(yieldBoost*minProfit);
                    maxProfit = Math.round(yieldBoost*maxProfit);

                    sickleBoost *= 
                        ((plotList[groups[l].plots[i][j]].value - plotList[groups[l].plots[i][j]].price)); 

                    minProfit *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (plotList[groups[l].plots[i][j]].value - plotList[groups[l].plots[i][j]].price)) / 
                        (plotList[groups[l].plots[i][j]].time * timeBoost); 

                    maxProfit *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (plotList[groups[l].plots[i][j]].value - plotList[groups[l].plots[i][j]].price)) / 
                        (plotList[groups[l].plots[i][j]].time * timeBoost); 
                        
                        
                    if(!(plotList[groups[l].plots[i][j]].isConsumable)){
                        sickleProfit += sickleBoost;
                    }
                    minHourlyProfit += minProfit;
                    maxHourlyProfit += maxProfit;
                }else{
                    document.getElementById("plot" + String.fromCharCode("A".charCodeAt(0) + l) + i + "," + j).style.filter = "";
                }
            }
        }
    }
    
    if(strangeSelected){
        sickleProfit *= (1 - cloverStrangeEffect) + (5 * cloverStrangeEffect);
        minHourlyProfit *= (1 - cloverStrangeEffect) + (5 * cloverStrangeEffect);
        maxHourlyProfit *= (1 - cloverStrangeEffect) + (5 * cloverStrangeEffect);
    }

    if(fertSelected){
        minHourlyProfit -= (((plotCount[4] * 1) + (plotCount[5] * 3 / 4) + (plotCount[6] * 9 / 9)) * 500 / 24);
        maxHourlyProfit -= (((plotCount[4] * 1) + (plotCount[5] * 3 / 4) + (plotCount[6] * 9 / 9)) * 500 / 24);
    }

    //document.getElementById("1").innerHTML = printFarmstructure();
    if(maxHourlyProfit > winnerWinner){
        winnerWinner = maxHourlyProfit;
        winnerStructure = printFarmstructure()
        //document.getElementById("1").innerHTML = winnerWinner;
        //console.log(winnerWinner + ":" + winnerStructure);
        
    }

    document.getElementById("currentBox").innerHTML = printFarmstructure();

    document.getElementById("playerProfitScore").innerHTML = "[MIN: " + (Math.round(100 * minHourlyProfit) / 100) + "]  [MAX: " + (Math.round(100 * maxHourlyProfit) / 100) + "]";
    document.getElementById("playerStrangerateScore").innerHTML = Math.round(100000 * cloverStrangeEffect) / 1000 + "%";
    document.getElementById("playerCloverTimeScore").innerHTML = Math.round(100000 * (1/cloverTimeEffect)) / 1000 + "%";
    document.getElementById("sickleProfitScore").innerHTML = "+" + (Math.round(100 * sickleProfit) / 100);

    document.getElementById("cdnd0").innerHTML = totalPlots;
    document.getElementById("cdnd1").innerHTML = plotCount[1];
    document.getElementById("cdnd2").innerHTML = plotCount[2]/3;
    document.getElementById("cdnd3").innerHTML = plotCount[3];
    document.getElementById("cdnd4").innerHTML = plotCount[4]/2;
    document.getElementById("cdnd5").innerHTML = plotCount[5];
    document.getElementById("cdnd6").innerHTML = plotCount[6]/4;
    document.getElementById("cdnd7").innerHTML = plotCount[7]/9;
    document.getElementById("cdnd8").innerHTML = plotCount[8];
    document.getElementById("cdnd9").innerHTML = plotCount[9];
    document.getElementById("cdnd10").innerHTML = plotCount[10];
    document.getElementById("cdnd11").innerHTML = plotCount[11];
    document.getElementById("cdnd12").innerHTML = plotCount[12];
    document.getElementById("cdnd13").innerHTML = plotCount[13];
    document.getElementById("cdnd14").innerHTML = plotCount[14];
    document.getElementById("cdnd15").innerHTML = plotCount[15];
    document.getElementById("cdnd16").innerHTML = plotCount[16];
    document.getElementById("cdnd17").innerHTML = plotCount[17];
    document.getElementById("cdnd18").innerHTML = plotCount[17];
    document.getElementById("cdnd19").innerHTML = lowestBabies[10];
    document.getElementById("cdnd20").innerHTML = highestBabies[10];
    document.getElementById("cdnd21").innerHTML = avgBabies[10];

    //document.getElementById("breedProfitTable10,2").innerHTML = averageLuckChange;
    //document.getElementById("breedProfitTable9,2").innerHTML = averageLuck;

    for(let i = 0; i < plotList.length; i++){
        //c.style.color = "lime";
        let breedableCounter = 0;
        if(plotList[i].isBreedable){
            document.getElementById("breedTable" + i + ",0").innerHTML = plotCount[i];
            document.getElementById("breedTable" + i + ",1").innerHTML = breedSpotCount[i];
            document.getElementById("breedTable" + i + ",2").innerHTML = breedChanceCount[i];
            document.getElementById("breedProfitTable" + i + ",0").innerHTML = (Math.round(10 * avgBabies[i]) / 10);
            document.getElementById("breedProfitTable" + i + ",1").innerHTML = highestBabies[i];
            breedableCounter++;
        }

        if(i==0){
            document.getElementById("cdod" + i).innerHTML = "/" + plotsAmmount();
            if(totalPlots < plotsAmmount()){
                document.getElementById("cdod" + i).style.color = "lime";   
            }else if(totalPlots == plotsAmmount()){
                document.getElementById("cdod" + i).style.color = "yellow";   
            }else if(totalPlots > plotsAmmount()){
                document.getElementById("cdod" + i).style.color = "red";  
            }
        }else if(plotList[i].isCrop){
            if(plotList[i].isSeedCapped){
                document.getElementById("cdod" + i).innerHTML = "/" + seedCappedAmmount();
                if(plotCount[i] < seedCappedAmmount()){
                    document.getElementById("cdod" + i).style.color = "lime";   
                }else if(plotCount[i] == seedCappedAmmount()){
                    document.getElementById("cdod" + i).style.color = "yellow";   
                }else if(plotCount[i] > seedCappedAmmount()){
                    document.getElementById("cdod" + i).style.color = "red";   
                }
            }else{
                document.getElementById("cdod" + i).innerHTML = "/" + plotsAmmount();
                if(totalPlots < plotsAmmount()){
                    document.getElementById("cdod" + i).style.color = "lime";   
                }else if(plotCount[i] == plotsAmmount()){
                    document.getElementById("cdod" + i).style.color = "yellow";   
                }else if(plotCount[i] > plotsAmmount()){
                    document.getElementById("cdod" + i).style.color = "red";  
                }
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function printFarmstructure(){
    let rowPopulated = false;
    let farmStructure = "/" + currentWebsiteVersion + "/"
    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].iSource[i][j] == i && groups[l].jSource[i][j] == j && groups[l].plots[i][j] > 0){
                    if(!(rowPopulated)){
                        farmStructure += "-" + String.fromCharCode("a".charCodeAt(0) + i);
                        rowPopulated = true;
                    }

                    if((plotList[groups[l].plots[i][j]].isDirectional)){
                        farmStructure += String.fromCharCode(
                            "a".charCodeAt(0) + groups[l].plots[i][j]) + 
                            groups[l].direction[i][j] + 
                            String.fromCharCode("a".charCodeAt(0) + j);
                    }else{
                        farmStructure += String.fromCharCode(
                            "a".charCodeAt(0) + groups[l].plots[i][j]) + 
                            String.fromCharCode("a".charCodeAt(0) + j);
                    }
                }
            }
            rowPopulated = false;
        }
        farmStructure += "/";
    }

    return "`" + farmStructure + "`";
}

function readFarmstructure(farmCode0){//haha i hate error handling haha
    const farmImport = farmCode0.split("/");

    //if its not even a correct value
    if(farmImport.length == 1){
        return;
    }

    //if its not in a correct version to read it, i dont want to.... ok
    if((farmImport[1]).localeCompare(currentWebsiteVersion) != 0){
        return;
    }

    
    for(let l=0; l<6; l++){
        groups[l].clearfarm(String.fromCharCode("A".charCodeAt(0) + l));
    }

    for(let l=0; l<6; l++){
        let g = farmImport[l+2];

        if(g.localeCompare("") != 0){
            const plotImport = g.split("-");

            for(let k=1; k<plotImport.length; k++){//start at 1 because split will count before the first - as well
                const plotData = plotImport[k].split("");
                let x = 1;
                let i = (plotData[0]).charCodeAt(0) - 97;

                do{
                    if((plotList[(plotData[x]).charCodeAt(0) - 97]).isDirectional){
                        groups[l].updatePlot(
                            ((plotData[x]).charCodeAt(0) - 97), 
                            parseInt(plotData[x+1]), 
                            i, 
                            ((plotData[x+2]).charCodeAt(0) - 97), 
                            String.fromCharCode("A".charCodeAt(0) + l));
                        x += 3;
                    }else{
                        groups[l].updatePlot(
                            ((plotData[x]).charCodeAt(0) - 97), 0, 
                            i, 
                            ((plotData[x+1]).charCodeAt(0) - 97),
                            String.fromCharCode("A".charCodeAt(0) + l));
                        x += 2;
                    }
                }while(x<plotData.length);
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////






















/*
//retired code i might want to reference again.. maybe



    if((chosenFarmPlot == 0) && this.breedTotal[rowOffset + row*2][colOffset + col*2] > 0){
        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                    "<img class=\"breedDot\" src=\"/images/farmPlots/alone.png\">";
    }

    //document.getElementById("plotSelector" + plotList[12].namae).style.filter = "invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(200%) contrast(200%)";

    //document.getElementById("plotSelectorSprinkler").onclick = function(){chosenFarmSpot = 1}
    for(let i = 0; i < plotList.length; i++){
        //document.getElementById("plotB5,"+i).innerHTML += i + "," + namae;
        document.getElementById("plotSelector" + plotList[i].namae).onclick = function(){
            chosenFarmSpot = i;
            if(chosenFarmSpot != previousPlot){
                document.getElementById("plotSelector" + plotList[i].namae).style.filter = "invert(0%) sepia(0%) saturate(50%) hue-rotate(0deg) brightness(200%) contrast(100%)";
                document.getElementById("plotSelector" + plotList[previousPlot].namae).style.filter = "";
            }
            previousPlot = chosenFarmSpot;
        }
    }


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////Didnt end up continuting this///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function bruteForce(){// the best endgame farm is out there and ill find it soon
    let gID = 0;//group
    let rID = 0;//row
    let cID = 0;//col
    var farmCode = [['']];


    farmCode.length = gID+1;
    farmCode[gID].length = (groups[gID].height * groups[gID].width);
    

    for(let n=2677810000; n<(Math.pow(endgameIDs.length, (groups[gID].height * groups[gID].width)-2)); n++){///number
        let remainder = 0;
        let result = n;

        currentStructure = "";
        for(let d=2; d<(farmCode[gID].length); d++){//digit
            remainder = result%(endgameIDs.length);
            result = (result-remainder)/(endgameIDs.length);

            cID = d%(groups[gID].width)
            rID = (d-cID)/(groups[gID].width)
            if(groups[gID].plots[rID][cID] != -1){
                groups[gID].updatePlot(endgameIDs[remainder], 0, rID, cID, String.fromCharCode("A".charCodeAt(0) + gID));
            }

            farmCode[gID][d] = remainder;
            currentStructure = currentStructure + "," + farmCode[gID][d];
        }
        calculateBoard();

        if(n%30000 == 0){
            console.log("::" + n + ":" + currentStructure);
        }
    }

    ///this is great... in theory... but my pc only has so much ram.... and storage....
    console.log(winnerWinner + ":" + winnerStructure);
    console.log("000:" + printFarmstructure());
    if(rID >= groups[gID].height){
        return;
    }

    
    if(groups[gID].plots[rID][cID] != -1){
        for(let l=0; l<endgameIDs.length; l++){

            groups[gID].updatePlot(endgameIDs[l], 0, rID, cID, String.fromCharCode("A".charCodeAt(0) + gID));
            calculateBoard();
            
            
            if(cID+1 == groups[gID].width){
                bruteForce(gID, rID+1, 0);
            }else{
                bruteForce(gID, rID, cID+1);
            }
            

        }
    }
    if(cID+1 == groups[gID].width){
        bruteForce(gID, rID+1, 0);
    }else{
        bruteForce(gID, rID, cID+1);
    }
}

function fillFarmWith(fillPlot){//write all grapes
    let charCode = "A".charCodeAt(0);
    let l=0;
    //for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].plots[i][j] != -1){
                    groups[l].updatePlot(1, 0, i, j, String.fromCharCode("A".charCodeAt(0) + l));
                }
            }
        }
    //}
}
/////////////////////////////////////////////////////////////////////////////////////////



//desperate attempt to prevent the errors from copy pasting the encoded 
//text in the input box.  nothing worked man. it was a good idea man. if 
//you feed the encoder back through itself in reverse it gives you the 
//correct output man. fuck. whatever.. 
document.addEventListener('copy', function(e) {
    const text_only = document.getSelection().toString();
    const clipdata = e.clipboardData || window.clipboardData;  
    clipdata.setData('text/plain', text_only);
    clipdata.setData('text/html', text_only);
    e.preventDefault();
  });

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////idk bruh....
function encode(input, base, goal){
    const crypt = input.split("");
    let x = "";
    let middle = BigInt(0);
    let expo = BigInt(1);

    if(base == goal){
        return input;
    }else{
        for(let i=(crypt.length-1); i>=0; i--){
            middle = middle + (BigInt((crypt[i]).charCodeAt(0) - 45) * expo);
            expo = expo * BigInt(base);
            //console.log(middle + " md");
            //console.log(expo + " ex");
        }
        do{
            //console.log(input + "," + x + "," + middle);
            let y = Number(middle % BigInt(goal));
            x = (String.fromCharCode((y) + 45)) + x;
            //console.log(x + " XX");
            //console.log(input + "," + x + "," + middle);
            middle = (middle- BigInt(y))/BigInt(goal)
        }while(middle > 0);
        return x;
    }
}



//we need this part in order to calculate which hoe to show
if((plotList[groups[l].plots[i][j]]).isSeedCapped){
    //console.log(groups[l].plots[i][j]);
    if(plotCount[groups[l].plots[i][j]] > biggestSeedCappedTotal){
        biggestSeedCappedTotal = plotCount[groups[l].plots[i][j]];
    }
}
//console.log(biggestSeedCappedTotal);/


    ////////////////////////////////hoe stuff//////////////////////////////////////////////////
    //this technically has an issue where if its going off the seed count, when it starts needing orbs, 
    //it resets the hoe level back to 0.. the fix would be to add a check to see if it went past the 
    //max seeds for a hoe, but it doesnt need that fix because the  "if highestOrb" corrects the
    //display anyway..  leaving this here in case we need highestHoe(me) later on for some calculation

    for(let l=0; l<=6; l++){//there are 7 hoes, 0-6  
        if(l == (Math.floor((biggestSeedCappedTotal-1)/5) * 2) ||
           l == Math.ceil((totalPlots-30)/5)){
            if(l > highestHoe){
                highestHoe = l;
                //console.log(highestHoe);
            }
        }
    }
    highestOrb = Math.max((Math.ceil((biggestSeedCappedTotal-20)/5)*5) , Math.ceil((totalPlots-60)/2));

    for(let l=0; l<highestOrb; l++){
        orbPrices[l] = Math.min((Math.pow(2, l) * baseOrbPrice), 2000000);
        totalOrbPrice += orbPrices[l];
    }
    //console.log(totalOrbPrice);

    ////////////////////////////////////////////////////////////////////////////////////////////


/*
    document.getElementById("hoeTool").innerHTML = "<img id=\"hoeToolImg\" src=\"/images/farmPlots/Hoe" + highestHoe + ".png\">";
    if(highestOrb > 0){
        document.getElementById("hoeTool").innerHTML = "<img id=\"hoeToolImg\" src=\"/images/farmPlots/Hoe" + 6 + ".png\">";//obsidian hoe
        document.getElementById("hoeTool").innerHTML += "<img id=\"orbAdd\" src=\"/images/farmPlots/orbAdd.png\">";
        document.getElementById("hoeTool").innerHTML += "<img id=\"orbImg\" src=\"/images/farmPlots/orb.png\">";
        document.getElementById("hoeTool").innerHTML += "<div id=\"orbCount\">" + highestOrb + "</div>";
    }   

    
    document.getElementById("orbPricing").innerHTML = totalOrbPrice + "<br>-----------------<br>";
    for(let l=0; l<highestOrb; l++){// i want to put the total at the top.. so idk ggs gotta loop again
        document.getElementById("orbPricing").innerHTML += (l+1) + ":" + orbPrices[l] + "<br>";
    }

    

//this bit sets up the "gold clover club (gcc for short)" easter egg where you click a certain plot 3 times with a 16 leaf"
its outdated but i might bring it back idk

document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/4 Leaf Clover.png\">";
document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/16 Leaf Clover.png\">";
document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/64 Leaf Clover.png\">";
function goldCloverClub(){
    if(gccToggle){
        document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/4 Leaf Clover.png\">";
        document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/16 Leaf Clover.png\">";
        document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/64 Leaf Clover.png\">";
        gccToggle = false;
        gccKey = 0;
    }else{
        document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold4LeafClover.png\">"
        document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold16LeafClover.png\">"
        document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold64LeafClover.png\">"
        gccToggle = true;
        gccKey = 0;
    }
}
///////////////////////////////////////////////////////////////////////////////////

document.getElementById("toolBarHider").onclick = function(){
        ///////////////////////////////////////////////
        //fillFarmWith(14);
        //bruteForce();   //im trying
        ///////////////////////////////////////////////
        if(isHidden){
            document.getElementById("toolBar").style.display = ""
            //document.getElementById("toolBar").src = ""   //i wanna try changing it to "show" or something...idk
            isHidden = false;
        }else{
            document.getElementById("toolBar").style.display = "none"
            isHidden = true;
        }
    }
    document.getElementById("toolBarFlipper").onclick = function(){
        if(isRight){
            //document.getElementById("instructions").innerHTML = "jkytfkfgkhfkfkyg"
            document.getElementById("toolBarGroup").style.right = ""
            document.getElementById("toolBarGroup").style.left = "1vw"
            document.getElementById("toolBarGroup").style.direction = ""
            //document.getElementById("toolBarGroup").style.display = "none"
            isRight = false;
        }else{
            document.getElementById("toolBarGroup").style.left = ""
            document.getElementById("toolBarGroup").style.right = "1vw"
            document.getElementById("toolBarGroup").style.direction = "rtl"
            isRight = true;
        }
    }




//const cropCountingBoxes = document.getElementsByClassName("counterBox2");
//const cropCountingimgBoxes = document.getElementsByClassName("counterBox2img");

//let cropListSelected = false;
document.getElementById("cropListSelect").onclick = function(){
        cropListSelected = document.getElementById("cropListSelect").checked;
        if(cropListSelected == true){
            for (let i = 0; i < cropCountingBoxes.length; i++) {
                cropCountingBoxes[i].style.display = "";
            }
            for (let i = 0; i < cropCountingimgBoxes.length; i++) {
                cropCountingimgBoxes[i].style.display = "";
            }
        }else{
            for (let i = 0; i < cropCountingBoxes.length; i++) {
                cropCountingBoxes[i].style.display = "none";
            }
            for (let i = 0; i < cropCountingimgBoxes.length; i++) {
                cropCountingimgBoxes[i].style.display = "none";
            }
        }
        calculateBoard();
    }

*/
