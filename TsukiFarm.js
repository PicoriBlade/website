//(made by Sylvie) 🏳️‍⚧️
//disord @syiv 
//"waaahhhh im a coding professor early returns is bad waaahhhhhhhhhhhh"
//KILL YOURSELFFFFF

let playerCheck = 0;
let chosenFarmSpot = 0;
let chosenFarmSpotDirection = 0;
let fertSelected = false;
let gccKey = 1;
let gccToggle = false;
let cropListSelected = false;
let strangeSelected = false;

let minHourlyProfit = 0;
let maxHourlyProfit = 0;

let baseStrangeRate = .0015;

var plotCount = [];

const cropCountingBoxes = document.getElementsByClassName("counterBox2");
const cropCountingimgBoxes = document.getElementsByClassName("counterBox2img");


class plot {
    constructor(structure, namae,  time, value, price, minYield, maxYield) {
        this.structure = structure;
        this.img = '/images/farmPlots/' + namae + '.png';
        this.namae = namae; //japanese "name"
        this.time = time;
        this.value = value;
        this.price = price;
        this.minYield = minYield;
        this.maxYield = maxYield;


        let rowLength = structure.length;
        let colLength = structure[0].length;
        this.structureUP = structure;
        this.structureRight = [['z']];
        this.structureDown = [['z']];
        this.structureLeft = [['z']];


        this.isCrop = false;    //are these useful? idk? but iscrop sure as hell is

        this.isSprinkler = false;
        this.isUV = false;
        this.isFert = false;
        this.isPlant = false;
        this.isStrawberry = false;
        this.isConsumable = false;

        
        this.structureRight.length = colLength;
        for(let row=1; row<(colLength+1); row++){
            this.structureRight[row-1] = [['z']];
            this.structureRight[row-1].length = rowLength;
            for(let col=1; col<(rowLength+1); col++){
                this.structureRight[row-1][col-1] = structure[rowLength-col][colLength-row];
            }
        }
        this.structureDown.length = rowLength;
        for(let row=1; row<(rowLength+1); row++){
            this.structureDown[row-1] = [['z']];
            this.structureDown[row-1].length = colLength;
            for(let col=1; col<(colLength+1); col++){
                this.structureDown[row-1][col-1] = structure[rowLength-row][colLength-col];
            }
        }
        this.structureLeft.length = colLength;
        for(let row=0; row<colLength; row++){
            this.structureLeft[row] = [['z']];
            this.structureLeft[row].length = rowLength;
            for(let col=0; col<rowLength; col++){
                this.structureLeft[row][col] = structure[col][row];
            }
        }

        if(maxYield > 0){
            this.isCrop = true;
        }

        for(let row=0; row<structure.length; row++){
            for(let col=0; col<structure[row].length; col++){
                if((structure[row][col]).localeCompare('w') == 0){
                    this.isSprinkler = true;
                }
                if((structure[row][col]).localeCompare('u') == 0){
                    this.isUV = true;
                }
                if((structure[row][col]).localeCompare('f') == 0){
                    this.isFert = true;
                }
                if((structure[row][col]).localeCompare('p') == 0){
                    this.isPlant = true;
                }
                if((structure[row][col]).localeCompare('s') == 0){
                    this.isStrawberry = true;
                }
                if(this.price > 0){
                    this.isConsumable = true;
                }
            }
        }
        //document.getElementById("plotB5,3").innerHTML += structureUP[0][0];
    }

    arrow(direction){
        if(direction == 0){         //up
            return 'up'    + this.namae;
        }else if(direction == 1){   //right
            return 'right' + this.namae;            
        }else if(direction == 2){   //down
            return 'down'  + this.namae;
        }else if(direction == 3){   //left
            return 'left'  + this.namae;
        }
    }

    source(direction){//just return the first X available that we see? reading each row left to right like english
        if(direction == 0){         //up
            for(let row=0; row<this.structureUP.length; row++){
                for(let col=0; col<this.structureUP[row].length; col++){
                    if((this.structureUP[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 1){   //right
            for(let row=0; row<this.structureRight.length; row++){
                for(let col=0; col<this.structureRight[row].length; col++){
                    if((this.structureRight[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 2){   //down
            for(let row=0; row<this.structureDown.length; row++){
                for(let col=0; col<this.structureDown[row].length; col++){
                    if((this.structureDown[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 3){   //left
            for(let row=0; row<this.structureLeft.length; row++){
                for(let col=0; col<this.structureLeft[row].length; col++){
                    if((this.structureLeft[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }
    }
}

/////////////////////////////////////////////
// Structure: 2d array:  
//   x = part of structure
//   z = empty   
//   {w,u,f,s,p} = structure effect{watered, uv'd, fertilized, strawberried, planted}     
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
let megagrow = new plot(
    [['u'],
     ['u'],
     ['u'],
     ['x']],  
    'MegaGrow',
    0,0,0,0,0);
let gigagrow = new plot(
    [['u','u','u','u'],
     ['u','u','u','u'],
     ['z','x','x','z']],  
    'GigaGrow',
    0,0,0,0,0);
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
let laneSprinkler = new plot(
    [['w','w','w','w','w'],
     ['z','x','x','x','z'],
     ['w','w','w','w','w']],  
    'LaneSprinkler',
    0,0,0,0,0);
let fourLeafClover = new plot(
    [['x']],  
    '4 Leaf Clover',
    0,0,0,0,0);
let sixteenLeafClover = new plot(
    [['x']],  
    '16 Leaf Clover',
    0,0,0,0,0);
let sixtyfourLeafClover = new plot(
    [['x']],  
    '64 Leaf Clover',
    0,0,0,0,0);
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
let gloamroot = new plot(
    [['x']],  
    'Gloamroot',
    2,5,0,5,10);
let strawberry = new plot(
    [['s','s','s'],
     ['s','x','s'],
     ['s','s','s']],  
    'Strawberry',
    2,2,0,5,5);
let turnip = new plot(
    [['x']],  
    'Turnip',
    2,1,0,10,30);
let potato = new plot(
    [['x']],  
    'Potato',
    1,1,0,10,10);
let onion = new plot(
    [['x']],  
    'Onion',
    3,3,0,4,4);
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
    megagrow,           //2
    gigagrow,           //3
    goatFert,           //4
    bullFert,           //5
    elephantFert,       //6
    plantFlower,        //7
    laneSprinkler,      //8
    fourLeafClover,     //9
    sixteenLeafClover,  //10
    sixtyfourLeafClover,//11
    emptyPlot,          //12
    carrot,             //13
    grape,              //14
    gloamroot,          //15
    strawberry,         //16
    turnip,             //17
    potato,             //18
    onion,              //19
    pumpkin,            //20
    melon               //21
];

class group {
    constructor(height, width) {
      this.width = width;
      this.height = height;
      this.plots = [[0,0],[0,0]];
      this.uv = [[0,0],[0,0]];
      this.fert = [[0,0],[0,0]];
      this.watered = [[0,0],[0,0]];
      this.strawberried = [[0,0],[0,0]];
      this.planted = [[0,0],[0,0]];
      this.direction = [[0,0],[0,0]];
      this.iSource = [[0,0],[0,0]];
      this.jSource = [[0,0],[0,0]];
      this.minProfit = [[0,0],[0,0]];
      this.maxProfit = [[0,0],[0,0]];

      this.plots.length = width;
      this.uv.length = width;
      this.fert.length = width;
      this.watered.length = width;
      this.strawberried.length = width;
      this.planted.length = width;
      this.direction.length = width;
      this.iSource.length = width;
      this.jSource.length = width;
      this.minProfit.length = width;
      this.maxProfit.length = width;
      for(let i=0; i<height; i++){
        this.plots[i] = [0,0];
        this.plots[i].length = width;
        this.uv[i] = [0,0];
        this.uv[i].length = width;
        this.fert[i] = [0,0];
        this.fert[i].length = width;
        this.watered[i] = [0,0];
        this.watered[i].length = width;
        this.strawberried[i] = [0,0];
        this.strawberried[i].length = width;
        this.planted[i] = [0,0];
        this.planted[i].length = width;
        this.direction[i] = [0,0];
        this.direction[i].length = width;
        this.iSource[i] = [0,0];
        this.iSource[i].length = width;
        this.jSource[i] = [0,0];
        this.jSource[i].length = width;
        this.minProfit[i] = [0,0];
        this.minProfit[i].length = width;
        this.maxProfit[i] = [0,0];
        this.maxProfit[i].length = width;
        for(let j=0; j<width; j++){
            this.plots[i][j] = 0;
            this.uv[i][j] = 0;
            this.fert[i][j] = 0;
            this.watered[i][j] = 0;
            this.strawberried[i][j] = 0;
            this.planted[i][j] = 0;
            this.direction[i][j] = -1;
            this.iSource[i][j] = -1;
            this.jSource[i][j] = -1;
            this.minProfit[i][j] = 0;
            this.maxProfit[i][j] = 0;
        }
      }
    }

    clearfarm(letta){
        for(let i=0; i<this.height; i++){
            for(let j=0; j<this.width; j++){
                if(this.plots[i][j] != -1){
                    this.plots[i][j] = 0;
                    this.uv[i][j] = 0;
                    this.fert[i][j] = 0;
                    this.watered[i][j] = 0;
                    this.strawberried[i][j] = 0;
                    this.planted[i][j] = 0;
                    this.direction[i][j] = -1;
                    this.iSource[i][j] = -1;
                    this.jSource[i][j] = -1;
                    this.minProfit[i][j] = 0;
                    this.maxProfit[i][j] = 0;
                
                    document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                }
            }
        }
    }

    canPlace(chosenFarmPlot, chosenFarmPlotDirection, i, j){    //new rules say.. destroy anything it touches other than walls.        
        let rotatedStructure = [['z']];
        if(chosenFarmPlotDirection == 0){   //already faces up, so no changes
            rotatedStructure = plotList[chosenFarmPlot].structureUP;
        }else if(chosenFarmPlotDirection == 1){   //flip right
            rotatedStructure = plotList[chosenFarmPlot].structureRight;
        }else if(chosenFarmPlotDirection == 2){   //flip down
            rotatedStructure = plotList[chosenFarmPlot].structureDown;
        }else if(chosenFarmPlotDirection == 3){   //flip left
            rotatedStructure = plotList[chosenFarmPlot].structureLeft;
        }

        let sRowLen = rotatedStructure.length;      //short for structure row length
        let sColLen = rotatedStructure[0].length;
        let source = plotList[chosenFarmPlot].source(chosenFarmPlotDirection);  //it returns and array as a coordinate: [row,col]
        
        // If its a 1x1 then it fits no questions asked.... I think????? no issues yet ahaaa 
        //if(sColLen == 1 && sRowLen == 1 ){
        //    return true;
        //} there was an issue *gulp*

        for(let row=0; row<sRowLen; row++){
            for(let col=0; col<sColLen; col++){
                if((rotatedStructure[row][col]).localeCompare('x') == 0){
                    if(this.plots[(i - source[0]) + row][(j - source[1]) + col] == -1){//collies with special blocked out sections...
                        return false;
                    }
                    if(((i - source[0]) + row) < 0){//collides with top...
                        return false;
                    }
                    if(((j - source[1]) + col) < 0){//collides with left...
                        return false;
                    }
                    if(((i - source[0]) + row) >= this.height){//collides with bottom...
                        return false;
                    }
                    if(((j - source[1]) + col) >= this.width){//collides with right...
                        return false;
                    }
                }
            }
        }
        return true;    // so if we didnt hit a wall then.. good to go i guess
    }

    placePlot(chosenFarmPlot, chosenFarmPlotDirection, i, j, letta){
        let rotatedStructure = [['z']];
        if(chosenFarmPlotDirection == 0){   //already faces up, so no changes
            rotatedStructure = plotList[chosenFarmPlot].structureUP;
        }else if(chosenFarmPlotDirection == 1){   //flip right
            rotatedStructure = plotList[chosenFarmPlot].structureRight;
        }else if(chosenFarmPlotDirection == 2){   //flip down
            rotatedStructure = plotList[chosenFarmPlot].structureDown;
        }else if(chosenFarmPlotDirection == 3){   //flip left
            rotatedStructure = plotList[chosenFarmPlot].structureLeft;
        }

        let sRowLen = rotatedStructure.length;      //short for structure row length
        let sColLen = rotatedStructure[0].length;
        let source = plotList[chosenFarmPlot].source(chosenFarmPlotDirection);  //it returns and array as a coordinate: [row,col]

        for(let row=0; row<sRowLen; row++){
            for(let col=0; col<sColLen; col++){
                if(!(((i - source[0]) + row) < 0) &&
                   !(((j - source[1]) + col) < 0) &&
                   !(((i - source[0]) + row) >= this.height) &&
                   !(((j - source[1]) + col) >= this.width)){
                    if(!(this.plots[(i - source[0]) + row][(j - source[1]) + col] == -1)){

                        if((rotatedStructure[row][col]).localeCompare('x') == 0){ 
                            if(this.plots[(i - source[0]) + row][(j - source[1]) + col] == 10 &&
                               chosenFarmPlot == 10 &&
                               (letta).localeCompare('A') == 0 &&
                               ((i - source[0]) + row) == 0 &&
                               ((j - source[1]) + col) == 2){
                                gccKey++;
                                if(gccKey == 3){
                                    goldCloverClub();
                                }
                            }
                            if(this.plots[(i - source[0]) + row][(j - source[1]) + col] > 0){
                                this.removePlot(((i - source[0]) + row), ((j - source[1]) + col), letta);  //DESTROYYYY KILLLLLL
                            }
    
                            this.iSource[(i - source[0]) + row][(j - source[1]) + col] = i;
                            this.jSource[(i - source[0]) + row][(j - source[1]) + col] = j;
                            this.direction[(i - source[0]) + row][(j - source[1]) + col] = chosenFarmPlotDirection;
                            this.plots[(i - source[0]) + row][(j - source[1]) + col]=chosenFarmPlot;
    
                            document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML = 
                                "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot].img + "\">";
    
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isUV){
                                document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                    "<img class=\"" + plotList[chosenFarmPlot].arrow(chosenFarmPlotDirection) + "\" src=\"/images/farmPlots/Arrow.png\">"
                            }
    
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isCrop){
                                if(this.fert[(i - source[0]) + row][(j - source[1]) + col] > 0){
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                        "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                                }
                                if(this.uv[(i - source[0]) + row][(j - source[1]) + col] > 0){
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                if(this.watered[(i - source[0]) + row][(j - source[1]) + col] > 0){
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                        "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                                }
                                if(this.strawberried[(i - source[0]) + row][(j - source[1]) + col] > 0 && 
                                   !(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isStrawberry)){
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                        "<div class=\"plotStrawberried\"> " + this.strawberried[(i - source[0]) + row][(j - source[1]) + col] + " </div>"
                                }
                            }
                        }
                        if((rotatedStructure[row][col]).localeCompare('w') == 0){
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isCrop && 
                                this.watered[(i - source[0]) + row][(j - source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                    "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">";
                            }
                            this.watered[(i - source[0]) + row][(j - source[1]) + col]++;
                        }
                        if((rotatedStructure[row][col]).localeCompare('u') == 0){
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isCrop && 
                                this.uv[(i - source[0]) + row][(j - source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                    "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                            }
                            this.uv[(i - source[0]) + row][(j - source[1]) + col]++;
                        }
                        if((rotatedStructure[row][col]).localeCompare('f') == 0){
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isCrop && 
                                this.fert[(i - source[0]) + row][(j - source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                    "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                            }
                            this.fert[(i - source[0]) + row][(j - source[1]) + col]++;
                        }
                        if((rotatedStructure[row][col]).localeCompare('p') == 0){
                            this.planted[(i - source[0]) + row][(j - source[1]) + col]++;
                        }
                        if((rotatedStructure[row][col]).localeCompare('s') == 0){
                            if(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isCrop && 
                               !(plotList[this.plots[(i - source[0]) + row][(j - source[1]) + col]].isStrawberry)){
                                if(this.strawberried[(i - source[0]) + row][(j - source[1]) + col] == 0){
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML += 
                                        "<div class=\"plotStrawberried\"> " + (this.strawberried[(i - source[0]) + row][(j - source[1]) + col]+1) + " </div>"
                                }else{
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML =
                                    document.getElementById("plot" + letta + ((i - source[0]) + row) + "," + ((j - source[1]) + col)).innerHTML.replace(
                                        "<div class=\"plotStrawberried\"> " + this.strawberried[(i - source[0]) + row][(j - source[1]) + col] + " </div>",
                                        "<div class=\"plotStrawberried\"> " + (this.strawberried[(i - source[0]) + row][(j - source[1]) + col]+1) + " </div>"
                                        );
                                }
                            }
                            this.strawberried[(i - source[0]) + row][(j - source[1]) + col]++;
                        }
                    }
                }
            }
        }
    }

    removePlot(i, j, letta){    //BUURRRNNNN
        let rPlot = this.plots[i][j];
        let rPlotDirection = this.direction[this.iSource[i][j]][this.jSource[i][j]]
        let rSource = [this.iSource[i][j],this.jSource[i][j]];  //it stores as a coordinate: [row,col]

        let rotatedStructure = [['z']];
        if(rPlotDirection == 0){   //already faces up, so no changes
            rotatedStructure = plotList[rPlot].structureUP;
        }else if(rPlotDirection == 1){   //flip right
            rotatedStructure = plotList[rPlot].structureRight;
        }else if(rPlotDirection == 2){   //flip down
            rotatedStructure = plotList[rPlot].structureDown;
        }else if(rPlotDirection == 3){   //flip left
            rotatedStructure = plotList[rPlot].structureLeft;
        }

        let sRowLen = rotatedStructure.length;      //short for structure row length
        let sColLen = rotatedStructure[0].length;
        let source = plotList[rPlot].source(rPlotDirection);  //it returns and array as a coordinate: [row,col]

        for(let row=0; row<sRowLen; row++){
            for(let col=0; col<sColLen; col++){
                if(!(((rSource[0] - source[0]) + row) < 0) &&
                   !(((rSource[1] - source[1]) + col) < 0) &&
                   !(((rSource[0] - source[0]) + row) >= this.height) &&
                   !(((rSource[1] - source[1]) + col) >= this.width)){
                    if(!(this.plots[(rSource[0] - source[0]) + row][(rSource[1] - source[1]) + col] == -1)){

                        if((rotatedStructure[row][col]).localeCompare('x') == 0){
                            document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML = "";
        
                            this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]=0;
                            this.iSource[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] = -1;
                            this.jSource[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] = -1;
                            this.direction[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] = -1;
                        }
                        if((rotatedStructure[row][col]).localeCompare('w') == 0){
                            this.watered[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]--;
                            if(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isCrop && 
                                this.watered[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML =
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML.replace(
                                    "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">",
                                    ""
                                    );
                            }
                        }
                        if((rotatedStructure[row][col]).localeCompare('u') == 0){
                            this.uv[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]--;
                            if(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isCrop && 
                                this.uv[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML =
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML.replace(
                                    "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                    ""
                                    );
                            }
                        }
                        if((rotatedStructure[row][col]).localeCompare('f') == 0){
                            this.fert[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]--;
                            if(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isCrop && 
                                this.fert[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] == 0){
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML =
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML.replace(
                                    "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">",
                                    ""
                                    );
                            }
                        }
                        if((rotatedStructure[row][col]).localeCompare('p') == 0){
                            this.planted[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]--;
                        }
                        if((rotatedStructure[row][col]).localeCompare('s') == 0){
                            this.strawberried[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]--;
                            if(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isCrop && 
                               this.strawberried[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] == 0 && 
                               !(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isStrawberry)){
        
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML =
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML.replace(
                                    "<div class=\"plotStrawberried\"> " + (this.strawberried[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]+1) + " </div>",
                                    ""
                                    );
                            }else if(!(plotList[this.plots[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]].isStrawberry)){
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML =
                                document.getElementById("plot" + letta + ((rSource[0]- source[0]) + row) + "," + ((rSource[1]- source[1]) + col)).innerHTML.replace(
                                    "<div class=\"plotStrawberried\"> " + (this.strawberried[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col]+1) + " </div>",
                                    "<div class=\"plotStrawberried\"> " + this.strawberried[(rSource[0]- source[0]) + row][(rSource[1]- source[1]) + col] + " </div>"
                                    );
                            }
                        }
                    }
                }
            }
        }
    }

    updatePlot(chosenFarmPlot, chosenFarmPlotDirection, i, j, letta){
        //document.getElementById("plotB5,3").innerHTML += "uuuuu";
        if(this.canPlace(chosenFarmPlot, chosenFarmPlotDirection, i, j)){
            if(chosenFarmPlot == 0){
                this.removePlot(i, j, letta);  //DESTROYYYY KILLLLLL                
            }else{
                this.placePlot(chosenFarmPlot, chosenFarmPlotDirection, i, j, letta);
            }
        }
    }
}

//////////////////////////////////////////////
let groupA = new group(5,3);
groupA.plots[0][0] = -1;
groupA.plots[0][1] = -1;
let groupB = new group(12,12);
groupB.plots[0][0] = -1;
groupB.plots[0][1] = -1;
groupB.plots[1][0] = -1;
groupB.plots[10][11] = -1;
groupB.plots[11][10] = -1;
groupB.plots[11][11] = -1;
let groupC = new group(6,2);
groupC.plots[4][1] = -1;
groupC.plots[5][1] = -1;
let groupD = new group(2,1);
let groupE = new group(2,2);
groupE.plots[0][0] = -1;
groupE.plots[1][1] = -1;
let groupF = new group(4,4);

let groups = [
    groupA,
    groupB,
    groupC,
    groupD,
    groupE,
    groupF
];

class gccGroup {
    constructor(height, width) {
      this.width = width;
      this.height = height;
      this.plots = [[0,0],[0,0]];
      this.iSource = [[0,0],[0,0]];
      this.jSource = [[0,0],[0,0]];
      this.minProfit = [[0,0],[0,0]];
      this.maxProfit = [[0,0],[0,0]];

      this.plots.length = width;
      this.iSource.length = width;
      this.jSource.length = width;
      this.minProfit.length = width;
      this.maxProfit.length = width;
      for(let i=0; i<height; i++){
        this.plots[i] = [0,0];
        this.plots[i].length = width;
        this.iSource[i] = [0,0];
        this.iSource[i].length = width;
        this.jSource[i] = [0,0];
        this.jSource[i].length = width;
        this.minProfit[i] = [0,0];
        this.minProfit[i].length = width;
        this.maxProfit[i] = [0,0];
        this.maxProfit[i].length = width;
        for(let j=0; j<width; j++){
            this.plots[i][j] = 0;
            this.iSource[i][j] = -1;
            this.jSource[i][j] = -1;
            this.minProfit[i][j] = 0;
            this.maxProfit[i][j] = 0;
        }
      }
    }

    clearfarm(letta){
        for(let i=0; i<this.height; i++){
            for(let j=0; j<this.width; j++){
                if(this.plots[i][j] != -1){
                    this.plots[i][j] = 0;
                    this.iSource[i][j] = -1;
                    this.jSource[i][j] = -1;
                    this.minProfit[i][j] = 0;
                    this.maxProfit[i][j] = 0;
                
                    document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                }
            }
        }
    }

    canPlace(chosenFarmPlot, chosenFarmPlotDirection, i, j){    //new rules say.. destroy anything it touches other than walls.        
        
    }

    placePlot(chosenFarmPlot, chosenFarmPlotDirection, i, j, letta){
        
    }

    removePlot(i, j, letta){    //BUURRRNNNN
        
    }

    updatePlot(chosenFarmPlot, chosenFarmPlotDirection, i, j, letta){
        
    }
}

let gccGroupA = new gccGroup(13, 8);
gccGroupA.plots[0][0] = -1;
gccGroupA.plots[0][1] = -1;
gccGroupA.plots[0][2] = -1;
gccGroupA.plots[0][3] = -1;
gccGroupA.plots[0][4] = -1;
gccGroupA.plots[1][0] = -1;
gccGroupA.plots[1][1] = -1;
gccGroupA.plots[1][2] = -1;
gccGroupA.plots[2][0] = -1;
let gccGroupB = new group(26,26);
gccGroupB.plots[0][0] = -1;
gccGroupB.plots[0][1] = -1;
gccGroupB.plots[0][2] = -1;
gccGroupB.plots[0][3] = -1;
gccGroupB.plots[0][4] = -1;
gccGroupB.plots[1][0] = -1;
gccGroupB.plots[1][1] = -1;
gccGroupB.plots[1][2] = -1;
gccGroupB.plots[1][3] = -1;
gccGroupB.plots[2][0] = -1;
gccGroupB.plots[2][1] = -1;
gccGroupB.plots[2][2] = -1;
gccGroupB.plots[3][0] = -1;
gccGroupB.plots[3][1] = -1;
gccGroupB.plots[4][0] = -1;

gccGroupB.plots[25][25] = -1;
gccGroupB.plots[25][24] = -1;
gccGroupB.plots[25][23] = -1;
gccGroupB.plots[25][22] = -1;
gccGroupB.plots[25][21] = -1;
gccGroupB.plots[24][25] = -1;
gccGroupB.plots[24][24] = -1;
gccGroupB.plots[24][23] = -1;
gccGroupB.plots[24][22] = -1;
gccGroupB.plots[23][25] = -1;
gccGroupB.plots[23][24] = -1;
gccGroupB.plots[23][23] = -1;
gccGroupB.plots[22][25] = -1;
gccGroupB.plots[22][24] = -1;
gccGroupB.plots[21][25] = -1;
let gccGroupC = new group(6,2);
let gccGroupD = new group(2,1);
let gccGroupE = new group(2,2);
let gccGroupF = new group(4,4);

let gccGroups = [
    gccGroupA,
    gccGroupB,
    gccGroupB,
    gccGroupC,
    gccGroupD,
    gccGroupE,
    gccGroupF
];



document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/4 Leaf Clover.png\">";
document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/16 Leaf Clover.png\">";
document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/64 Leaf Clover.png\">";
function goldCloverClub(){
    if(gccToggle){
        document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/4 Leaf Clover.png\">";
        document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/16 Leaf Clover.png\">";
        document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/64 Leaf Clover.png\">";
        document.getElementById('Farm').style.display = "";
        document.getElementById('CloverFarm').style.display = "none";
        gccToggle = false;
        gccKey = 0;
    }else{
        document.getElementById("gcc4Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold4LeafClover.png\">"
        document.getElementById("gcc16Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold16LeafClover.png\">"
        document.getElementById("gcc64Leaf").innerHTML = "<img class=\"counterBoximg\" src=\"/images/farmPlots/Gold64LeafClover.png\">"
        document.getElementById('Farm').style.display = "none";
        document.getElementById('CloverFarm').style.display = "";
        gccToggle = true;
        gccKey = 0;
    }
}

initializeFarm();
function initializeFarm(){
    //<img class="counterBoximg" src="/images/farmPlots/4 Leaf Clover.png">

    let letta = "A";
    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].plots[i][j] == -1){
                    document.getElementById("plot" + String.fromCharCode(letta.charCodeAt(0) + l) + i + "," + j).className = "plotNull";
                } 
                document.getElementById("plot" + String.fromCharCode(letta.charCodeAt(0) + l) + i + "," + j).onclick = function(){
                    groups[l].updatePlot(chosenFarmSpot, chosenFarmSpotDirection, i, j, String.fromCharCode(letta.charCodeAt(0) + l));
                    calculateBoard();
                }
            }
        }
    }
    letta = "A";
        for(let i=0; i<gccGroups[0].height; i++){
            for(let j=0; j<gccGroups[0].width; j++){
                if(gccGroups[0].plots[i][j] == -1){
                    document.getElementById("gccPlot" + letta + i + "," + j).className = "gccPlotNull";
                } 
                document.getElementById("gccPlot" + letta + i + "," + j).onclick = function(){
                    //gccGroups[l].updatePlot(chosenFarmSpot, chosenFarmSpotDirection, i, j, String.fromCharCode(letta.charCodeAt(0) + l));
                    //calculateBoard();
                }
            }
        }
    document.getElementById("resetFarmButton").onclick = function(){
        for(let l=0; l<6; l++){
            groups[l].clearfarm(String.fromCharCode(letta.charCodeAt(0) + l));
        }
        document.getElementById("playerProfitScore").innerHTML = "";
        calculateBoard();
    }
    document.getElementById("farmPlotButton").onclick = function(){
        chosenFarmSpot = document.getElementById("farmPlotSelect").value;
        chosenFarmSpotDirection = document.getElementById("farmPlotDirectionSelect").value;
    }
    document.getElementById("fertSelect").onclick = function(){
        fertSelected = document.getElementById("fertSelect").checked;
        calculateBoard();
    }
    document.getElementById("strangeSelect").onclick = function(){
        goldCloverClub();
        strangeSelected = document.getElementById("strangeSelect").checked;
        calculateBoard();
    }
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
}

function calculateBoard(){
    minHourlyProfit = 0;
    maxHourlyProfit = 0;
    let cloverVal = 0;
    let cloverTotal = 0;
    let cloverTimeEffect = 0;
    let cloverStrangeEffect = 0;
    let totalPlots = 0;
    for(let l=0; l<40; l++){
        plotCount[l] = 0;
    }

    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                //document.getElementById("plotB5,3").innerHTML += groups[l].plots[i][j];

                if(plotList[Math.max(0,groups[l].plots[i][j])].isCrop){
                    totalPlots++;
                }

                plotCount[groups[l].plots[i][j]]++;

            }
        }
    }

    cloverVal = (1 * plotCount[9]) + (16 * plotCount[10]) + (64 * plotCount[11]);
    cloverTotal = plotCount[9] + plotCount[10] + plotCount[11];
    cloverTimeEffect = (Math.pow(cloverTotal, 3) + 2047) / 2047;
    cloverStrangeEffect = (1 + Math.log2(cloverVal + 1)) * baseStrangeRate;

    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){

                if(plotList[Math.max(0,groups[l].plots[i][j])].isCrop){
                    let yieldBoost = 1;
                    let timeBoost = 1 * cloverTimeEffect;
                    let strawberryBoost = 1;
                    let strawberryHourlyRepeat = 1;

                    groups[l].minProfit[i][j] = plotList[groups[l].plots[i][j]].minYield;
                    groups[l].maxProfit[i][j] = plotList[groups[l].plots[i][j]].maxYield;

                    if(groups[l].uv[i][j] > 0){
                        if(plotList[groups[l].plots[i][j]].isConsumable){
                            yieldBoost *= 1.25;
                        }else{
                            yieldBoost += .25;
                        }
                    }
                    if(groups[l].fert[i][j] > 0){
                        if(plotList[groups[l].plots[i][j]].isConsumable){
                            yieldBoost *= 1.5;
                        }else{
                            yieldBoost += .5;
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

                    groups[l].minProfit[i][j] *= yieldBoost;
                    groups[l].maxProfit[i][j] *= yieldBoost;

                    if((plotList[groups[l].plots[i][j]].namae).localeCompare('Onion') == 0){
                        groups[l].minProfit[i][j] = plotList[groups[l].plots[i][j]].minYield + groups[l].planted[i][j];
                        groups[l].maxProfit[i][j] = plotList[groups[l].plots[i][j]].minYield + groups[l].planted[i][j];
                    }

                    groups[l].minProfit[i][j] *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (plotList[groups[l].plots[i][j]].value - plotList[groups[l].plots[i][j]].price)) / 
                        (plotList[groups[l].plots[i][j]].time * timeBoost); 

                    groups[l].maxProfit[i][j] *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (plotList[groups[l].plots[i][j]].value - plotList[groups[l].plots[i][j]].price)) / 
                        (plotList[groups[l].plots[i][j]].time * timeBoost); 
                        
                        

                    minHourlyProfit += groups[l].minProfit[i][j];
                    maxHourlyProfit += groups[l].maxProfit[i][j];
                }
            }
        }
    }
    
    if(strangeSelected){
        minHourlyProfit *= (1 - cloverStrangeEffect) + (5 * cloverStrangeEffect);
        maxHourlyProfit *= (1 - cloverStrangeEffect) + (5 * cloverStrangeEffect);
    }

    if(fertSelected){
        minHourlyProfit -= (((plotCount[4] * 1) + (plotCount[5] * 3 / 4) + (plotCount[6] * 9 / 9)) * 500 / 24);
        maxHourlyProfit -= (((plotCount[4] * 1) + (plotCount[5] * 3 / 4) + (plotCount[6] * 9 / 9)) * 500 / 24);
    }

    document.getElementById("playerProfitScore").innerHTML = "[MIN: " + (Math.round(100 * minHourlyProfit) / 100) + "]  [MAX: " + (Math.round(100 * maxHourlyProfit) / 100) + "]";
    document.getElementById("playerStrangerateScore").innerHTML = Math.round(100000 * cloverStrangeEffect) / 1000 + "%";
    document.getElementById("playerCloverTimeScore").innerHTML = Math.round(100000 * (1/cloverTimeEffect)) / 1000 + "%";

    document.getElementById("sprinklerCounter").innerHTML = plotCount[1];
    document.getElementById("laneSprinklerCounter").innerHTML = plotCount[8]/3;
    document.getElementById("megauvCounter").innerHTML = plotCount[2];
    document.getElementById("gigauvCounter").innerHTML = plotCount[3]/2;
    document.getElementById("goatFertCounter").innerHTML = plotCount[4];
    document.getElementById("bullFertCounter").innerHTML = plotCount[5]/4;
    document.getElementById("elephantFertCounter").innerHTML = plotCount[6]/9;
    document.getElementById("plantCounter").innerHTML = plotCount[7];
    document.getElementById("4leafcloverCounter").innerHTML = plotCount[9];
    document.getElementById("16leafcloverCounter").innerHTML = plotCount[10];
    document.getElementById("64leafcloverCounter").innerHTML = plotCount[11];
    document.getElementById("cropCounter").innerHTML = totalPlots;

    if(cropListSelected){
        document.getElementById("plotCounter").innerHTML = plotCount[12];
        document.getElementById("CarrotCounter").innerHTML = plotCount[13];
        document.getElementById("GrapeCounter").innerHTML = plotCount[14];
        document.getElementById("GloamrootCounter").innerHTML = plotCount[15];
        document.getElementById("StrawberryCounter").innerHTML = plotCount[16];
        document.getElementById("TurnipCounter").innerHTML = plotCount[17];
        document.getElementById("PotatoCounter").innerHTML = plotCount[18];
        document.getElementById("OnionCounter").innerHTML = plotCount[19];
        document.getElementById("PumpkinCounter").innerHTML = plotCount[20];
        document.getElementById("MelonCounter").innerHTML = plotCount[21];
    }
}

/*


    document.getElementById("playerCheckButton").onclick = function(){
        playerCheck = document.getElementById("playerCheckInput").value;
        document.getElementById("1").innerHTML = "so you only check it every " + playerCheck + " hours???";
    }


*/