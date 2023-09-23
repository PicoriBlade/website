//(made by Syiv) 🏳️‍⚧️
//disord @syiv 

let playerCheck = 0;
let chosenFarmPlot = 0;
let chosenFarmPlotDirection = 0;
const remove = 0;
var plotList = [];

let minHourlyProfit = 0;
let maxHourlyProfit = 0;

var plotCount = [];

const cropMinYield = [
    20,     //carrot
    6,      //grape
    5,      //gloamroot
    5,      //strawberry
    10,     //turnip
    10,     //potato
    4,      //onion
    1,      //pumpkin
    1       //melon
];
const cropMaxYield = [
    20,     //carrot
    6,      //grape
    10,     //gloamroot
    5,      //strawberry
    30,     //turnip
    10,     //potato
    4,      //onion
    1,      //pumpkin
    1       //melon
];
const cropVal = [
    1,      //carrot
    4,      //grape
    5,      //gloamroot
    2,      //strawberry
    1,      //turnip
    1,      //potato
    3,      //onion
    120,    //pumpkin
    200     //melon
];
const cropTime = [ //in hours
    2,      //carrot
    2,      //grape
    2,      //gloamroot
    2,      //strawberry
    2,      //turnip
    1,      //potato
    3,      //onion
    2,      //pumpkin
    6       //melon
];
const cropPrice = [ //in hours
    0,      //carrot
    0,      //grape
    0,      //gloamroot
    0,      //strawberry
    0,      //turnip
    0,      //potato
    0,      //onion
    50,     //pumpkin
    50      //melon
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

    updatePlot(i, j, letta){
        if(this.plots[i][j] == 0){
            if(chosenFarmPlot == 1){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                this.plots[i][j]=chosenFarmPlot;

                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                        }
                        this.watered[row][col]++;
                    }
                }
            }else if(chosenFarmPlot == 2){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                this.plots[i][j]=chosenFarmPlot;
                this.direction[i][j] = chosenFarmPlotDirection;
                if(chosenFarmPlotDirection == 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"upMega\" src=\"/images/farmPlots/Arrow.png\">"

                    for(let row=Math.max(0, i-3); row<i; row++){
                        if(this.plots[row][j] >= 20 && this.uv[row][j] == 0){
                            document.getElementById("plot" + letta + row + "," + j).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                        }
                        this.uv[row][j]++;
                    }
                }else if(chosenFarmPlotDirection == 1){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"rightMega\" src=\"/images/farmPlots/Arrow.png\">"

                    for(let col=(j+1); col<Math.min(this.width, j+4); col++){
                        if(this.plots[i][col] >= 20 && this.uv[i][col] == 0){
                            document.getElementById("plot" + letta + i + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                        }
                        this.uv[i][col]++;
                    }
                }else if(chosenFarmPlotDirection == 2){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"downMega\" src=\"/images/farmPlots/Arrow.png\">"

                    for(let row=(i+1); row<Math.min(this.height, i+4); row++){
                        if(this.plots[row][j] >= 20 && this.uv[row][j] == 0){
                            document.getElementById("plot" + letta + row + "," + j).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                        }
                        this.uv[row][j]++;
                    }
                }else{
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"leftMega\" src=\"/images/farmPlots/Arrow.png\">"

                    for(let col=Math.max(0, j-3); col<j; col++){
                        if(this.plots[i][col] >= 20 && this.uv[i][col] == 0){
                            document.getElementById("plot" + letta + i + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                        }
                        this.uv[i][col]++;
                    }
                }
            }else if(chosenFarmPlot == 3){
                if((chosenFarmPlotDirection == 1 || chosenFarmPlotDirection == 3) && i < this.height-1){
                    if(chosenFarmPlotDirection == 1 && this.plots[i+1][j] == 0){
                        document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"rightGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        document.getElementById("plot" + letta + (i+1) + "," + j).innerHTML += "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + (i+1) + "," + j).innerHTML += "<img class=\"rightGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        
                        this.plots[i][j]=chosenFarmPlot;
                        this.plots[i+1][j]=chosenFarmPlot;
                        
                        this.iSource[i][j] = i;
                        this.jSource[i][j] = j;
                        this.iSource[i+1][j] = i;
                        this.jSource[i+1][j] = j;
                        this.direction[i][j] = chosenFarmPlotDirection;
                        this.direction[i+1][j] = chosenFarmPlotDirection;

                        for(let row=Math.max(0, i-1); row<Math.min(this.height, i+3); row++){
                            for(let col=(j+1); col<Math.min(this.width, j+3); col++){
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                this.uv[row][col]++;
                            }
                        }
                    }else if(chosenFarmPlotDirection == 3 && this.plots[i+1][j] == 0){
                        document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"leftGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        document.getElementById("plot" + letta + (i+1) + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + (i+1) + "," + j).innerHTML += "<img class=\"leftGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        
                        this.plots[i][j]=chosenFarmPlot;
                        this.plots[i+1][j]=chosenFarmPlot;
                        
                        this.iSource[i][j] = i;
                        this.jSource[i][j] = j;
                        this.iSource[i+1][j] = i;
                        this.jSource[i+1][j] = j;
                        this.direction[i][j] = chosenFarmPlotDirection;
                        this.direction[i+1][j] = chosenFarmPlotDirection;

                        for(let row=Math.max(0, i-1); row<Math.min(this.height, i+3); row++){
                            for(let col=Math.max(0, j-2); col<j; col++){
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                this.uv[row][col]++;
                            }
                        }
                    }
                }
                if((chosenFarmPlotDirection == 0 || chosenFarmPlotDirection == 2) && j < this.width-1){
                    if(chosenFarmPlotDirection == 0 && this.plots[i][j+1] == 0){
                        document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"upGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        document.getElementById("plot" + letta + i + "," + (j+1)).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + (j+1)).innerHTML += "<img class=\"upGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        
                        this.plots[i][j]=chosenFarmPlot;
                        this.plots[i][j+1]=chosenFarmPlot;
                        
                        this.iSource[i][j] = i;
                        this.jSource[i][j] = j;
                        this.iSource[i][j+1] = i;
                        this.jSource[i][j+1] = j;
                        this.direction[i][j] = chosenFarmPlotDirection;
                        this.direction[i][j+1] = chosenFarmPlotDirection;

                        for(let row=Math.max(0, i-2); row<i; row++){
                            for(let col=Math.max(0, j-1); col<Math.min(this.width, j+3); col++){
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                this.uv[row][col]++;
                            }
                        }
                    }else if(chosenFarmPlotDirection == 2 && this.plots[i][j+1] == 0){
                        document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"downGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        document.getElementById("plot" + letta + i + "," + (j+1)).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                        document.getElementById("plot" + letta + i + "," + (j+1)).innerHTML += "<img class=\"downGiga\" src=\"/images/farmPlots/Arrow.png\">"
                        
                        this.plots[i][j]=chosenFarmPlot;
                        this.plots[i][j+1]=chosenFarmPlot;
                        
                        this.iSource[i][j] = i;
                        this.jSource[i][j] = j;
                        this.iSource[i][j+1] = i;
                        this.jSource[i][j+1] = j;
                        this.direction[i][j] = chosenFarmPlotDirection;
                        this.direction[i][j+1] = chosenFarmPlotDirection;

                        for(let row=(i+1); row<Math.min(this.height, i+3); row++){
                            for(let col=Math.max(0, j-1); col<Math.min(this.width, j+3); col++){
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                this.uv[row][col]++;
                            }
                        }
                    }
                }
            }else if(chosenFarmPlot == 4){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                this.plots[i][j]=chosenFarmPlot;

                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                        }
                        this.fert[row][col]++;
                    }
                }
            }else if(chosenFarmPlot == 5){
                if(i < this.height-1 && j < this.width-1){
                    if(this.plots[i][j] == 0 && this.plots[i+1][j] == 0 && 
                        this.plots[i][j+1] == 0 && this.plots[i+1][j+1] == 0){
                        for(let row=i; row<i+2; row++){
                            for(let col=j; col<j+2; col++){
                                document.getElementById("plot" + letta + row + "," + col).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                                this.plots[row][col]=chosenFarmPlot;
                        
                                this.iSource[row][col] = i;
                                this.jSource[row][col] = j;
                            }
                        }

                        for(let row=Math.max(0, i-1); row<Math.min(this.height, i+3); row++){
                            for(let col=Math.max(0, j-1); col<Math.min(this.width, j+3); col++){
                                if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                                }
                                this.fert[row][col]++;
                            }
                        }
                    }
                }
            }else if(chosenFarmPlot == 6){
                if(i < this.height-2 && j < this.width-2){
                    if(this.plots[i][j] == 0 && this.plots[i+1][j] == 0 && this.plots[i+2][j] == 0 && 
                        this.plots[i][j+1] == 0 && this.plots[i+1][j+1] == 0 && this.plots[i+2][j+1] == 0 && 
                        this.plots[i][j+2] == 0 && this.plots[i+1][j+2] == 0 && this.plots[i+2][j+2] == 0){
                            for(let row=i; row<i+3; row++){
                                for(let col=j; col<j+3; col++){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                                    this.plots[row][col]=chosenFarmPlot;
                        
                                    this.iSource[row][col] = i;
                                    this.jSource[row][col] = j;
                                }
                            }
    
                            for(let row=Math.max(0, i-1); row<Math.min(this.height, i+4); row++){
                                for(let col=Math.max(0, j-1); col<Math.min(this.width, j+4); col++){
                                    if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                                        document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                                    }
                                    this.fert[row][col]++;
                                }
                            }
                    }
                }
            }else if(chosenFarmPlot == 7){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                this.plots[i][j]=chosenFarmPlot;

                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        this.planted[row][col]++;
                    }
                }
            }else if(chosenFarmPlot == 8){
                if((chosenFarmPlotDirection == 1 || chosenFarmPlotDirection == 3) && i < this.height-1 && this.plots[i+1][j] == 0 && this.plots[i+2][j] == 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    document.getElementById("plot" + letta + (i+1) + "," + j).innerHTML += "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    document.getElementById("plot" + letta + (i+2) + "," + j).innerHTML += "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    
                    this.plots[i][j]=chosenFarmPlot;
                    this.plots[i+1][j]=chosenFarmPlot;
                    this.plots[i+2][j]=chosenFarmPlot;
                    
                    this.iSource[i][j] = i;
                    this.jSource[i][j] = j;
                    this.iSource[i+1][j] = i;
                    this.jSource[i+1][j] = j;
                    this.iSource[i+2][j] = i;
                    this.jSource[i+2][j] = j;
                    this.direction[i][j] = chosenFarmPlotDirection;
                    this.direction[i+1][j] = chosenFarmPlotDirection;
                    this.direction[i+2][j] = chosenFarmPlotDirection;

                    for(let row=Math.max(0, i-1); row<Math.min(this.height, i+4); row++){
                        for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                            if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                                document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                            }
                            this.watered[row][col]++;
                        }
                    }
                }
                if((chosenFarmPlotDirection == 0 || chosenFarmPlotDirection == 2) && j < this.width-1 && this.plots[i][j+1] == 0 && this.plots[i][j+2] == 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    document.getElementById("plot" + letta + i + "," + (j+1)).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    document.getElementById("plot" + letta + i + "," + (j+2)).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                    
                    this.plots[i][j]=chosenFarmPlot;
                    this.plots[i][j+1]=chosenFarmPlot;
                    this.plots[i][j+2]=chosenFarmPlot;
                    
                    this.iSource[i][j] = i;
                    this.jSource[i][j] = j;
                    this.iSource[i][j+1] = i;
                    this.jSource[i][j+1] = j;
                    this.iSource[i][j+2] = i;
                    this.jSource[i][j+2] = j;
                    this.direction[i][j] = chosenFarmPlotDirection;
                    this.direction[i][j+1] = chosenFarmPlotDirection;
                    this.direction[i][j+2] = chosenFarmPlotDirection;

                    for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                        for(let col=Math.max(0, j-1); col<Math.min(this.width, j+4); col++){
                            if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                                document.getElementById("plot" + letta + row + "," + col).innerHTML += "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                            }
                            this.watered[row][col]++;
                        }
                    }
                    
                }
            }else if(chosenFarmPlot >= 20){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">" +
                document.getElementById("plot" + letta + i + "," + j).innerHTML;
                this.plots[i][j]=chosenFarmPlot;

                if(chosenFarmPlot == 23){
                    for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                        for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                            if(this.plots[row][col] >= 20 && this.plots[row][col] != 23){
                                if(this.strawberried[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML += "<div class=\"plotStrawberried\"> " + (this.strawberried[row][col]+1) + " </div>"
                                }else{
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                        "<div class=\"plotStrawberried\"> " + this.strawberried[row][col] + " </div>",
                                        "<div class=\"plotStrawberried\"> " + (this.strawberried[row][col]+1) + " </div>"
                                        );
                                }
                            }
                            this.strawberried[row][col]++;
                        }
                    }
                }

                if(this.fert[i][j] > 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                }
                if(this.uv[i][j] > 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                }
                if(this.watered[i][j] > 0){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                }
                if(this.strawberried[i][j] > 0 && this.plots[i][j] != 23){
                    document.getElementById("plot" + letta + i + "," + j).innerHTML += "<div class=\"plotStrawberried\"> " + this.strawberried[i][j] + " </div>"
                }
            }else{
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot] + "\">";
                this.plots[i][j]=chosenFarmPlot;
            }
////////////////////////////
//REMOVING STUFF & CLEANUP//
////////////////////////////
        }else if(chosenFarmPlot == 0){
            if(this.plots[i][j] == 1){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;
    
                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        this.watered[row][col]--;
                        if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">",
                                ""
                                );
                        }
                    }
                }
            }else if(this.plots[i][j] == 2){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;

                if(this.direction[i][j] == 0){
                    for(let row=Math.max(0, i-3); row<i; row++){
                        this.uv[row][j]--;
                        if(this.plots[row][j] >= 20 && this.uv[row][j] == 0){
                            document.getElementById("plot" + letta + row + "," + j).innerHTML =
                            document.getElementById("plot" + letta + row + "," + j).innerHTML.replace(
                                "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                ""
                                );
                        }
                    }
                }else if(this.direction[i][j] == 1){
                    for(let col=(j+1); col<Math.min(this.width, j+4); col++){
                        this.uv[i][col]--;
                        if(this.plots[i][col] >= 20 && this.uv[i][col] == 0){
                            document.getElementById("plot" + letta + i + "," + col).innerHTML =
                            document.getElementById("plot" + letta + i + "," + col).innerHTML.replace(
                                "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                ""
                                );
                        }
                    }
                }else if(this.direction[i][j] == 2){
                    for(let row=(i+1); row<Math.min(this.height, i+4); row++){
                        this.uv[row][j]--;
                        if(this.plots[row][j] >= 20 && this.uv[row][j] == 0){
                            document.getElementById("plot" + letta + row + "," + j).innerHTML =
                            document.getElementById("plot" + letta + row + "," + j).innerHTML.replace(
                                "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                ""
                                );
                        }
                    }
                }else{
                    for(let col=Math.max(0, j-3); col<j; col++){
                        this.uv[i][col]--;
                        if(this.plots[i][col] >= 20 && this.uv[i][col] == 0){
                            document.getElementById("plot" + letta + i + "," + col).innerHTML =
                            document.getElementById("plot" + letta + i + "," + col).innerHTML.replace(
                                "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                ""
                                );
                        }
                    }
                }
            }else if(this.plots[i][j] == 3){
                if((this.direction[i][j] == 1 || this.direction[i][j] == 3) && i < this.height-1){
                    if(this.direction[this.iSource[i][j]][this.jSource[i][j]] == 1){
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                        document.getElementById("plot" + letta + (this.iSource[i][j]+1) + "," + this.jSource[i][j]).innerHTML = "";
                        
                        this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                        this.plots[this.iSource[i][j]+1][this.jSource[i][j]]=0;

                        for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+3); row++){
                            for(let col=(this.jSource[i][j]+1); col<Math.min(this.width, this.jSource[i][j]+3); col++){
                                this.uv[row][col]--;
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                        ""
                                        );
                                }
                            }
                        }
                    }else if(this.direction[this.iSource[i][j]][this.jSource[i][j]] == 3){
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                        document.getElementById("plot" + letta + (this.iSource[i][j]+1) + "," + this.jSource[i][j]).innerHTML = "";
                        
                        this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                        this.plots[this.iSource[i][j]+1][this.jSource[i][j]]=0;

                        for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+3); row++){
                            for(let col=Math.max(0, this.jSource[i][j]-2); col<this.jSource[i][j]; col++){
                                this.uv[row][col]--;
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                        ""
                                        );
                                }
                            }
                        }
                    }
                }
                if((this.direction[i][j] == 0 || this.direction[i][j] == 2) && j < this.width-1){
                    if(this.direction[this.iSource[i][j]][this.jSource[i][j]] == 0){
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + (this.jSource[i][j]+1)).innerHTML = "";
                        
                        this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                        this.plots[this.iSource[i][j]][this.jSource[i][j]+1]=0;

                        for(let row=Math.max(0, this.iSource[i][j]-2); row<this.iSource[i][j]; row++){
                            for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+3); col++){
                                this.uv[row][col]--;
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                        ""
                                        );
                                }
                            }
                        }
                    }else if(this.direction[this.iSource[i][j]][this.jSource[i][j]] == 2){
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                        document.getElementById("plot" + letta + this.iSource[i][j] + "," + (this.jSource[i][j]+1)).innerHTML = "";
                        
                        this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                        this.plots[this.iSource[i][j]][this.jSource[i][j]+1]=0;

                        for(let row=(this.iSource[i][j]+1); row<Math.min(this.height, this.iSource[i][j]+3); row++){
                            for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+3); col++){
                                this.uv[row][col]--;
                                if(this.plots[row][col] >= 20 && this.uv[row][col] == 0){
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                    document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                        ""
                                        );
                                }
                            }
                        }
                        
                    }
                }
            }else if(this.plots[i][j] == 4){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;
                
                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        this.fert[row][col]--;
                        if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">",
                                ""
                                );
                        }
                    }
                }
            }else if(this.plots[i][j] == 5){
                for(let row=this.iSource[i][j]; row<Math.min(this.height, this.iSource[i][j]+2); row++){
                    for(let col=this.jSource[i][j]; col<Math.min(this.width, this.jSource[i][j]+2); col++){
                        document.getElementById("plot" + letta + row + "," + col).innerHTML = "";
                        this.plots[row][col]=0;
                    }
                }

                for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+3); row++){
                    for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+3); col++){
                        this.fert[row][col]--;
                        if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">",
                                ""
                                );
                        }
                    }
                }
            }else if(this.plots[i][j] == 6){
                for(let row=this.iSource[i][j]; row<Math.min(this.height, this.iSource[i][j]+3); row++){
                    for(let col=this.jSource[i][j]; col<Math.min(this.width, this.jSource[i][j]+3); col++){
                        document.getElementById("plot" + letta + row + "," + col).innerHTML = "";
                        this.plots[row][col]=0;
                    }
                }

                for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+4); row++){
                    for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+4); col++){
                        this.fert[row][col]--;
                        if(this.plots[row][col] >= 20 && this.fert[row][col] == 0){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">",
                                ""
                                );
                        }
                    }
                }
            }else if(this.plots[i][j] == 7){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;
                
                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        this.planted[row][col]--;
                    }
                }
            }else  if(this.plots[i][j] == 8){
                if((this.direction[this.iSource[i][j]][this.jSource[i][j]] == 1 || this.direction[this.iSource[i][j]][this.jSource[i][j]] == 3)){
                    document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                    document.getElementById("plot" + letta + (this.iSource[i][j]+1) + "," + this.jSource[i][j]).innerHTML = "";
                    document.getElementById("plot" + letta + (this.iSource[i][j]+2) + "," + this.jSource[i][j]).innerHTML = "";
                    
                    this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                    this.plots[this.iSource[i][j]+1][this.jSource[i][j]]=0;      
                    this.plots[this.iSource[i][j]+2][this.jSource[i][j]]=0;                    

                    for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+4); row++){
                        for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+2); col++){
                            this.watered[row][col]--;
                            if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                                document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                    "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">",
                                    ""
                                    );
                            }
                        }
                    }
                }
                if((this.direction[this.iSource[i][j]][this.jSource[i][j]] == 0 || this.direction[this.iSource[i][j]][this.jSource[i][j]] == 2)){
                    
                    document.getElementById("plot" + letta + this.iSource[i][j] + "," + this.jSource[i][j]).innerHTML = "";
                    document.getElementById("plot" + letta + this.iSource[i][j] + "," + (this.jSource[i][j]+1)).innerHTML = "";
                    document.getElementById("plot" + letta + this.iSource[i][j] + "," + (this.jSource[i][j]+2)).innerHTML = "";
                    
                    this.plots[this.iSource[i][j]][this.jSource[i][j]]=0;
                    this.plots[this.iSource[i][j]][this.jSource[i][j]+1]=0;
                    this.plots[this.iSource[i][j]][this.jSource[i][j]+2]=0;

                    for(let row=Math.max(0, this.iSource[i][j]-1); row<Math.min(this.height, this.iSource[i][j]+2); row++){
                        for(let col=Math.max(0, this.jSource[i][j]-1); col<Math.min(this.width, this.jSource[i][j]+4); col++){
                            this.watered[row][col]--;
                            if(this.plots[row][col] >= 20 && this.watered[row][col] == 0){
                                document.getElementById("plot" + letta + row + "," + col).innerHTML =
                                document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                    "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">",
                                    ""
                                    );
                            }
                        }
                    }
                    
                }
            }else if(this.plots[i][j] == 23){
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;
                
                for(let row=Math.max(0, i-1); row<Math.min(this.height, i+2); row++){
                    for(let col=Math.max(0, j-1); col<Math.min(this.width, j+2); col++){
                        this.strawberried[row][col]--;
                        if(this.plots[row][col] >= 20 && this.strawberried[row][col] == 0 && this.plots[row][col] != 23){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<div class=\"plotStrawberried\"> " + (this.strawberried[row][col]+1) + " </div>",
                                ""
                                );
                        }else if(this.plots[row][col] != 23){
                            document.getElementById("plot" + letta + row + "," + col).innerHTML =
                            document.getElementById("plot" + letta + row + "," + col).innerHTML.replace(
                                "<div class=\"plotStrawberried\"> " + (this.strawberried[row][col]+1) + " </div>",
                                "<div class=\"plotStrawberried\"> " + this.strawberried[row][col] + " </div>"
                                );
                        }
                    }
                }
            }else{
                document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                this.plots[i][j]=0;
            }
        }
    }    
}


let groupA = new group(5,3);
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


initializeFarm();
function initializeFarm(){
    plotList[0] = '/images/farmPlots/Empty.png';
    plotList[1] = '/images/farmPlots/Sprinkler.png';
    plotList[2] = '/images/farmPlots/MegaGrow.png';
    plotList[3] = '/images/farmPlots/GigaGrow.png';
    plotList[4] = '/images/farmPlots/GoatFert.png';
    plotList[5] = '/images/farmPlots/BullFert.png';
    plotList[6] = '/images/farmPlots/ElephantFert.png';
    plotList[7] = '/images/farmPlots/Plant.png';
    plotList[8] = '/images/farmPlots/LaneSprinkler.png';
    
    plotList[20] = '/images/farmPlots/Carrot.png';
    plotList[21] = '/images/farmPlots/Grape.png';
    plotList[22] = '/images/farmPlots/Gloamroot.png';
    plotList[23] = '/images/farmPlots/Strawberry.png';
    plotList[24] = '/images/farmPlots/Turnip.png';
    plotList[25] = '/images/farmPlots/Potato.png';
    plotList[26] = '/images/farmPlots/Onion.png';
    plotList[27] = '/images/farmPlots/Pumpkin.png';
    plotList[28] = '/images/farmPlots/Melon.png';
    let letta = "A";
    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].plots[i][j] == -1){
                    document.getElementById("plot" + String.fromCharCode(letta.charCodeAt(0) + l) + i + "," + j).className = "plotNull";
                } 
                document.getElementById("plot" + String.fromCharCode(letta.charCodeAt(0) + l) + i + "," + j).onclick = function(){
                    groups[l].updatePlot(i, j, String.fromCharCode(letta.charCodeAt(0) + l));
                    calculateBoard();
                }
            }
        }
    }
    document.getElementById("resetFarmButton").onclick = function(){
        for(let l=0; l<6; l++){
            groups[l].clearfarm(String.fromCharCode(letta.charCodeAt(0) + l));
        }
        document.getElementById("playerProfitScore").innerHTML = "";
    }
    document.getElementById("farmPlotButton").onclick = function(){
        chosenFarmPlot = document.getElementById("farmPlotSelect").value;
        chosenFarmPlotDirection = document.getElementById("farmPlotDirectionSelect").value;
    }
}

function calculateBoard(){
    minHourlyProfit = 0;
    maxHourlyProfit = 0;
    for(let l=0; l<40; l++){
        plotCount[l] = 0;
    }

    for(let l=0; l<6; l++){
        for(let i=0; i<groups[l].height; i++){
            for(let j=0; j<groups[l].width; j++){
                if(groups[l].plots[i][j] > 20){
                    plotCount[20]++;
                }else{
                    plotCount[groups[l].plots[i][j]]++;
                }

                if(groups[l].plots[i][j] >= 20){
                    let yieldBoost = 1;
                    let timeBoost = 1;
                    let strawberryBoost = 1;
                    let strawberryHourlyRepeat = 1;

                    groups[l].minProfit[i][j] = cropMinYield[groups[l].plots[i][j]-20]
                    groups[l].maxProfit[i][j] = cropMaxYield[groups[l].plots[i][j]-20]

                    if(groups[l].uv[i][j] > 0){
                        if(groups[l].plots[i][j] >= 27){
                            yieldBoost *= 1.25;
                        }else{
                            yieldBoost += .25;
                        }
                    }
                    if(groups[l].fert[i][j] > 0){
                        if(groups[l].plots[i][j] >= 27){
                            yieldBoost *= 1.5;
                        }else{
                            yieldBoost += .5;
                        }
                    }
                    if(groups[l].watered[i][j] > 0){
                        timeBoost *= .8;
                    }
                    if(groups[l].strawberried[i][j] > 0 && groups[l].plots[i][j] != 23){
                        let minutes = 0;
                        let ogMinutes = 0;
                        do{
                            ogMinutes += 30;
                            minutes += 30;
                            if((ogMinutes % (cropTime[3] * 60)) == 0){
                                minutes += 30*groups[l].strawberried[i][j];
                            }
                        }while(!(minutes%(cropTime[groups[l].plots[i][j]-20]*60) == 0 && ogMinutes%(cropTime[groups[l].plots[i][j]-20]*60) == 0 && 
                                ogMinutes >= (cropTime[3] * 60)));
                        strawberryBoost = Math.ceil(minutes / (cropTime[groups[l].plots[i][j]-20]*60));
                        strawberryHourlyRepeat = Math.ceil(ogMinutes / (cropTime[groups[l].plots[i][j]-20]*60));
                        //document.getElementById("plotB5,5").innerHTML = strawberryBoost +","+ strawberryHourlyRepeat +","+ minutes +","+ ogMinutes;
                    }

                    groups[l].minProfit[i][j] *= yieldBoost;
                    groups[l].maxProfit[i][j] *= yieldBoost;

                    if(groups[l].plots[i][j] == 26){
                        groups[l].minProfit[i][j] = cropMinYield[groups[l].plots[i][j]-20] + groups[l].planted[i][j];
                        groups[l].maxProfit[i][j] = cropMinYield[groups[l].plots[i][j]-20] + groups[l].planted[i][j];
                    }

                    groups[l].minProfit[i][j] *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (cropVal[groups[l].plots[i][j]-20] - cropPrice[groups[l].plots[i][j]-20])) / 
                        (cropTime[groups[l].plots[i][j]-20] * timeBoost); 

                    groups[l].maxProfit[i][j] *= 
                        ((strawberryBoost/strawberryHourlyRepeat) * 
                        (cropVal[groups[l].plots[i][j]-20] - cropPrice[groups[l].plots[i][j]-20])) / 
                        (cropTime[groups[l].plots[i][j]-20] * timeBoost);                      

                    minHourlyProfit += groups[l].minProfit[i][j];
                    maxHourlyProfit += groups[l].maxProfit[i][j];
                }
            }
        }
    }
    document.getElementById("playerProfitScore").innerHTML = "MIN: " + minHourlyProfit + "  MAX: " + maxHourlyProfit;

    document.getElementById("sprinklerCounter").innerHTML = plotCount[1];
    document.getElementById("laneSprinklerCounter").innerHTML = plotCount[8]/3;
    document.getElementById("megauvCounter").innerHTML = plotCount[2];
    document.getElementById("gigauvCounter").innerHTML = plotCount[3]/2;
    document.getElementById("goatFertCounter").innerHTML = plotCount[4];
    document.getElementById("bullFertCounter").innerHTML = plotCount[5]/4;
    document.getElementById("elephantFertCounter").innerHTML = plotCount[6]/9;
    document.getElementById("plantCounter").innerHTML = plotCount[7];
    document.getElementById("cropCounter").innerHTML = plotCount[20];
}

/*


    document.getElementById("playerCheckButton").onclick = function(){
        playerCheck = document.getElementById("playerCheckInput").value;
        document.getElementById("1").innerHTML = "so you only check it every " + playerCheck + " hours???";
    }


*/