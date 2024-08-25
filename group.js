//////////////////////////////////
// i is like a y value
//    or... the height
//
// j is like an x value
//    or... the width
//
// For example here is a 4(height) x 3(width) board
//    0,0  0,1  0,2
//    1,0  1,1  1,2
//    2,0  2,1  2,2
//    3,0  3,1  3,2
//
// plots
//    this is the id of the current item in the plot
//    -1 would be a blank, 0 empty
//    any whole number above 0 is an item
//
// uv / fert / watered / strawberried / planted
//    these are counters that determine how many of each effect a plot is recieving
//    only the strawberried effect is visible to the user, but each is nessecary
//    to keep track while *removing and *placing the .png effects on the tile
//
//    For Example:
//     When watered reaches 0 then it should remove the .png, but if it was already
//     1 or above and then increments again, we dont want to add another water .png
//
// direction
//    This stores which direction the item is facing.  Not particularly useful for
//    most items, but for the gigagrow and lane sprinkler, it is helpful to know
//    when removing them
//
// iSource / jSource
//    these are for "multiblock" structures like the gigagrow or elephant fert.
//    When removing a plot it is nessecary to know where the source plot is
//    so that you know where to center the structure that you are removing
//
///////////////////////////////////



class group {
    ///////////////////////////////////
    // constructor(height, width)
    //   this long constructor chunk sets up all the 2d arrays for the mentioned
    //   values.  could it be simplified? perhapsss
    ///////////////////////////////////
        constructor(height, width, heightOffset, widthOffset) {    
          //this.chosenFarmPlot = 0;
          //this.chosenFarmPlotDirection = 0;
          //this.chosenRow = 0;
          //this.chosenCol = 0;
          //this.letta = 'A';

          this.width = width;
          this.height = height;
          this.heightOffset = heightOffset;
          this.widthOffset = widthOffset;
          this.plots = [[0,0],[0,0]];
          this.uv = [[0,0],[0,0]];
          this.fert = [[0,0],[0,0]];
          this.watered = [[0,0],[0,0]];
          this.strawberried = [[0,0],[0,0]];
          this.planted = [[0,0],[0,0]];
          this.breedTotal = [[0,0],[0,0]];
          this.babies = [[0,0],[0,0]];
          this.breedSpotList = [[[0]]];
          this.breedChanceList = [[[0]]];
          this.direction = [[0,0],[0,0]];
          this.iSource = [[0,0],[0,0]];
          this.jSource = [[0,0],[0,0]];
    
          this.plots.length = width;
          this.uv.length = width;
          this.fert.length = width;
          this.watered.length = width;
          this.strawberried.length = width;
          this.breedTotal.length = width;
          this.babies.length = width;
          this.breedSpotList.length = width;
          this.breedChanceList.length = width;
          this.planted.length = width;
          this.direction.length = width;
          this.iSource.length = width;
          this.jSource.length = width;
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
            this.breedTotal[i] = [[0]];
            this.breedTotal[i].length = width;
            this.babies[i] = [[0]];
            this.babies[i].length = width;
            this.breedSpotList[i] = [[0]];
            this.breedSpotList[i].length = width;
            this.breedChanceList[i] = [[0]];
            this.breedChanceList[i].length = width;
            this.direction[i] = [0,0];
            this.direction[i].length = width;
            this.iSource[i] = [0,0];
            this.iSource[i].length = width;
            this.jSource[i] = [0,0];
            this.jSource[i].length = width;
            for(let j=0; j<width; j++){
                this.plots[i][j] = 0;
                this.uv[i][j] = 0;
                this.fert[i][j] = 0;
                this.watered[i][j] = 0;
                this.strawberried[i][j] = 0;
                this.planted[i][j] = 0;
                this.breedTotal[i][j] = 0;
                this.babies[i][j] = 0;
                this.direction[i][j] = -1;
                this.iSource[i][j] = i;
                this.jSource[i][j] = j;

                this.breedSpotList[i][j] = [0,0];
                this.breedSpotList[i][j].length = plotList.length;
                this.breedChanceList[i][j] = [0,0];
                this.breedChanceList[i][j].length = plotList.length;
                for(let k=0; k<plotList.length; k++){
                    this.breedSpotList[i][j][k] = 0;
                    this.breedChanceList[i][j][k] = 0;
                }
            }
          }
        }
    
    ///////////////////////////////////
    // clearfarm(letta)
    //
    //   This is pretty simple it just resets everything to default and clears all the plots
    //   no need to call *removPlot on anything here because *removePlot is meant to carefully
    //   clear out one item at a time, but *clearFarm just nukes the whole farm
    ///////////////////////////////////
        clearfarm(letta){       
            for(let i=0; i<this.height; i++){
                for(let j=0; j<this.width; j++){
                    if(this.plots[i][j] != -1){
                        this.plots[i][j] = 0;
                        this.direction[i][j] = -1;
                        this.iSource[i][j] = i;
                        this.jSource[i][j] = j;
                    
                        document.getElementById("plot" + letta + i + "," + j).innerHTML = "";
                    }
                    // I moved these outside of the If because what if you overflow the counter 
                    // intentionally and it cant reset the blank tiles effect counters to 0
                    this.uv[i][j] = 0;
                    this.fert[i][j] = 0;
                    this.watered[i][j] = 0;
                    this.strawberried[i][j] = 0;
                    this.planted[i][j] = 0;
                    this.breedTotal[i][j] = 0;
                    this.babies[i][j] = 0;
                    
                    for(let k=0; k<plotList.length; k++){
                        this.breedSpotList[i][j][k] = 0;
                        this.breedChanceList[i][j][k] = 0;
                    }
                }
            }
        }
    
    ///////////////////////////////////
    // canPlace(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol)
    //
    //   pulls the [structure + its size + its source coords relative to the structure] of of the chosen structure to place
    //   THEN gets the row and coll offsets from this so we know what to add to row/col to shift it onto
    //   the correct spot on the board
    //
    //   the for loops run through the loaded structures data and removes stuff depending on what is being read
    //      Structure: 2d array:  
    //       x = part of structure
    //       z = empty   
    //       {w,u,f,s,p,b} = structure effect{watered, uv'd, fertilized, strawberried, planted, breed spot}    
    //
    //   if the x its reading from the structure array collides with something it shouldnt
    //   then it returns false.  
    //   if it doesnt return false from finding a problem, then it returns true, that it will be able to place here
    ///////////////////////////////////
        canPlace(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol){    //its ok to destroy anything it touches other than walls.        
            let structure = plotList[chosenFarmPlot].Structure(chosenFarmPlotDirection);
            let sRowLen = structure.length;      //short for structure row length
            let sColLen = structure[0].length;
    
            let source = plotList[chosenFarmPlot].source(chosenFarmPlotDirection);  //it returns and array as a coordinate: [row,col]
            let rowOffset = (chosenRow - source[0]*2); 
            let colOffset = (chosenCol - source[1]*2); 
    
            for(let row=0; row<sRowLen; row++){
                for(let col=0; col<sColLen; col++){
                    if((structure[row][col]).localeCompare('x') == 0){
                        if((rowOffset + row*2) < 0){//collides with top...
                            return false;
                        }
                        if((colOffset + col*2) < 0){//collides with left...
                            return false;
                        }
                        if((rowOffset + row*2+1) >= this.height){//collides with bottom...
                            return false;
                        }
                        if((colOffset + col*2+1) >= this.width){//collides with right...
                            return false;
                        }
                        if(this.plots[rowOffset + row*2][colOffset + col*2] == -1 ||
                            this.plots[rowOffset + row*2 + 1][colOffset + col*2] == -1 ||
                            this.plots[rowOffset + row*2][colOffset + col*2 + 1] == -1 ||
                            this.plots[rowOffset + row*2 + 1][colOffset + col*2 + 1] == -1){//collies with special blocked out sections...
                            return false;
                        }
                    }
                }
            }
            return true;    // so if we didnt hit a wall then.. good to go i guess
        }
    
    ///////////////////////////////////
    // isOccupied(row, col)
    //
    //   checks all 9 spaces centered on a plot to see if its empty or not
    ///////////////////////////////////
        isOccupied(row, col){  
            for(let i = -1; i<2; i++){
                for(let j = -1; j<2; j++){
                    if(row + i >= 0 && col +j >= 0){
                        if(this.plots[row + i][col + j] > 0){
                            return true;
                        }
                    }
                }
            }
            return false;    // so if we didnt find anything then.. good to go i guess
        }
    
    ///////////////////////////////////
    // wideRemove(chosenFarmPlot, chosenFarmPlotDirection, row, col)
    //
    //   runs off clear places same code but clears too. pretty handy
    ///////////////////////////////////
        wideRemove(chosenFarmPlot, chosenFarmPlotDirection, row, col, letta){  
            for(let i = -1; i<2; i++){
                for(let j = -1; j<2; j++){
                    if(row + i >= 0 && col +j >= 0){
                        if(this.plots[row + i][col + j] >= 0){
                            this.removePlot(chosenFarmPlot, chosenFarmPlotDirection, (row + i), (col + j), letta);  
                        }
                    }
                }
            }
        }
    
    ///////////////////////////////////
    // regularRemove(chosenFarmPlot, chosenFarmPlotDirection, row, col)
    //
    //   runs off wideRemove same code but smaller and targets one 2x2 plot for just erasing
    ///////////////////////////////////
    regularRemove(chosenFarmPlot, chosenFarmPlotDirection, row, col, letta){  
            for(let i = -1; i<1; i++){
                for(let j = -1; j<1; j++){
                    if(row + i >= 0 && col +j >= 0){
                        if(this.plots[row + i][col + j] >= 0){
                            this.removePlot(chosenFarmPlot, chosenFarmPlotDirection, (row + i), (col + j), letta);  
                        }
                    }
                }
            }
        }
    
    
    ////////////////////////////////////
    // placePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta)
    //
    //   pulls the [structure + its size + its source coords relative to the structure] of of the chosen structure to place
    //   THEN gets the row and coll offsets from this so we know what to add to row/col to shift it onto
    //   the correct spot on the board
    //
    //   the for loops run through the loaded structures data and removes stuff depending on what is being read
    //      Structure: 2d array:  
    //       x = part of structure
    //       z = empty   
    //       {w,u,f,s,p,b} = structure effect{watered, uv'd, fertilized, strawberried, planted, breed spot}    
    //
    //   placing effects: {w,u,f,s,p}
    //     runs off the same principle where if adding to the effect counter would increase it 
    //     past 0, it places the corresponding png on the farm plot otherwise it leaves it
    //     The only difference is strawberry shows the active count, so it will update that up up 
    //     to the max of 8 because only 8 of anything can be placed directly next to a plot
    //
    //   placing a plot: x
    //     checks if its following the gcc easter egg password
    //     clears out anything in the way when placing a multiblock
    //     sets the [i/jSource + direction + plotid] correctly in the group
    //     places the png in the plot
    //     ...if its a uv then places the correct arrow effect for each direction
    //     ...if its a crop then also adds any effects on tile if present
    ////////////////////////////////////
    
        placePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta){
            let structure = plotList[chosenFarmPlot].Structure(chosenFarmPlotDirection);
            let sRowLen = structure.length;      //short for structure row length
            let sColLen = structure[0].length;
    
            let source = plotList[chosenFarmPlot].source(chosenFarmPlotDirection);  //it returns and array as a coordinate: [row,col]
            let rowOffset = (chosenRow - source[0]*2); 
            let colOffset = (chosenCol - source[1]*2); 
    
            for(let row=0; row<sRowLen; row++){
                for(let col=0; col<sColLen; col++){
                    if(!((rowOffset + row*2) < 0) &&
                       !((colOffset + col*2) < 0) &&
                       !((rowOffset + row*2) >= this.height) &&
                       !((colOffset + col*2) >= this.width)){
                        if(!(this.plots[rowOffset + row*2][colOffset + col*2] == -1)){
    
                            if((structure[row][col]).localeCompare('x') == 0){ 
                                /*
                                if(this.plots[rowOffset + row*2][colOffset + col*2] == 10 &&//this checks a plot and if 
                                   chosenFarmPlot == 10 &&      //a 16 leaf has been placed on top of itself 3 times, it changes
                                   (letta).localeCompare('A') == 0 &&   //all 3 clovers to look gold. idk its fun
                                   (rowOffset + row*2) == 0 &&
                                   (colOffset + col*2) == 5){
                                    gccKey++;
                                    if(gccKey == 3){
                                        goldCloverClub();
                                    }
                                }
                                */
    
                                //this clears out anything in the way when placing a plot
                                this.wideRemove(chosenFarmPlot, chosenFarmPlotDirection, (rowOffset + row*2), (colOffset + col*2), letta);
                                
        
                                this.iSource[rowOffset + row*2][colOffset + col*2] = chosenRow;
                                this.jSource[rowOffset + row*2][colOffset + col*2] = chosenCol;
                                this.direction[rowOffset + row*2][colOffset + col*2] = chosenFarmPlotDirection;
                                this.plots[rowOffset + row*2][colOffset + col*2]=chosenFarmPlot;

                                let multi = plotList[chosenFarmPlot].multiblockOverlay(chosenFarmPlotDirection, row, col);
                                let multiRotation = multi[0];
                                let multiName = multi[1];

                                document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                    "<img class=\"multiOverlay\" style=\"rotate: " + multiRotation + "\" src=\"/images/farmPlots/" + multiName + ".png\">"
        
                                document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                    "<img class=\"plotMainItem\" src=\""+ plotList[chosenFarmPlot].img + "\">";
        
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isUV){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                        "<img class=\"" + plotList[chosenFarmPlot].arrow(chosenFarmPlotDirection) + "\" src=\"/images/farmPlots/Arrow.png\">"
                                }

        
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop){
                                    if(this.fert[rowOffset + row*2][colOffset + col*2] > 0){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                                    }
                                    if(this.uv[rowOffset + row*2][colOffset + col*2] > 0){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                    }
                                    if(this.watered[rowOffset + row*2][colOffset + col*2] > 0){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">"
                                    }
                                    if(this.strawberried[rowOffset + row*2][colOffset + col*2] > 0 && 
                                       !(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isStrawberry)){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<div class=\"plotStrawberried\"> " + this.strawberried[rowOffset + row*2][colOffset + col*2] + " </div>"
                                    }
                                }

                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isBreedable){
                                    for(let x=1; x<5; x++){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<img class=\"plotBreed" + x + "\" style=\"filter:invert(77%) sepia(10%) saturate(1308%) hue-rotate(305deg) brightness(0%) contrast(102%)\" src=\"/images/farmPlots/heart.png\">"
                                    }
                                }
                            }
                            if((structure[row][col]).localeCompare('w') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.watered[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                        "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">";
                                }
                                this.watered[rowOffset + row*2][colOffset + col*2]++;
                            }
                            if((structure[row][col]).localeCompare('u') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.uv[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">"
                                }
                                this.uv[rowOffset + row*2][colOffset + col*2]++;
                            }
                            if((structure[row][col]).localeCompare('f') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.fert[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                        "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">"
                                }
                                this.fert[rowOffset + row*2][colOffset + col*2]++;
                            }
                            if((structure[row][col]).localeCompare('p') == 0){
                                this.planted[rowOffset + row*2][colOffset + col*2]++;
                            }
                            if((structure[row][col]).localeCompare('s') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                   !(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isStrawberry)){
                                    if(this.strawberried[rowOffset + row*2][colOffset + col*2] == 0){
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML += 
                                            "<div class=\"plotStrawberried\"> " + (this.strawberried[rowOffset + row*2][colOffset + col*2]+1) + " </div>"
                                    }else{
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                        document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                            "<div class=\"plotStrawberried\"> " + this.strawberried[rowOffset + row*2][colOffset + col*2] + " </div>",
                                            "<div class=\"plotStrawberried\"> " + (this.strawberried[rowOffset + row*2][colOffset + col*2]+1) + " </div>"
                                            );
                                    }
                                }
                                this.strawberried[rowOffset + row*2][colOffset + col*2]++;
                            }
                            if((structure[row][col]).localeCompare('b') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].namae.includes(plotList[chosenFarmPlot].namae)){
                                    this.breedChanceList[rowOffset + row*2][colOffset + col*2][chosenFarmPlot]++;
                                    this.breedChanceList[chosenRow][chosenCol][chosenFarmPlot]++;
                                    //its gonna place a baby of itself so it should check and see if its ok
                                    if(this.canPlace(chosenFarmPlot, chosenFarmPlotDirection, rowOffset + row*2, chosenCol)){
                                        this.breedTotal[rowOffset + row*2][chosenCol]++;
                                        this.breedSpotList[rowOffset + row*2][chosenCol][chosenFarmPlot]++;
                                    }
                                    //its gonna place a baby of itself so it should check and see if its ok
                                    if(this.canPlace(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, colOffset + col*2)){
                                        this.breedTotal[chosenRow][colOffset + col*2]++;
                                        this.breedSpotList[chosenRow][colOffset + col*2][chosenFarmPlot]++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    
    ///////////////////////////// 
    // removePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta)
    // 
    //   gets the [plot + direction + source coords on the board] of of the chosen structure to remove
    //   then pulls the [structure + its size + its source coords relative to the structure]
    //   THEN gets the row and coll offsets from this so we know what to add to row/col to shift it onto
    //   the correct spot on the board
    //
    //   the for loops run through the loaded structures data and removes stuff depending on what is being read
    //      Structure: 2d array:  
    //       x = part of structure
    //       z = empty   
    //      {w,u,f,s,p,b} = structure effect{watered, uv'd, fertilized, strawberried, planted, breed spot}    
    //
    //   removing effects: {w,u,f,s,p}
    //     mostly run off the same principal where if removing an effect would decrease its counter
    //     to 0, then it will find the img for the effect and remove it off the farm plot. otherwise it leaves it
    //     The only difference is since strawberry shows the active count, it will update that down until
    //     it hits zero, where it does remove it completely
    //
    //   removing plots: x
    //     clears the cell
    //     ...sets [i/jSource + direction] back to -1
    //     ...[plot id] back to 0
    /////////////////////////////
        removePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta){    
            let rPlot = this.plots[chosenRow][chosenCol];
            let rPlotDirection = 0;
            if(rPlot != 0){
                rPlotDirection = this.direction[this.iSource[chosenRow][chosenCol]][this.jSource[chosenRow][chosenCol]];
            }
            let rSource = [this.iSource[chosenRow][chosenCol],this.jSource[chosenRow][chosenCol]];  //it stores as a coordinate: [row,col]
            let rRow = rSource[0];
            let rCol = rSource[1];
    
            let structure = plotList[rPlot].Structure(rPlotDirection);
            let sRowLen = structure.length;      //short for structure row length
            let sColLen = structure[0].length;
    
            let source = plotList[rPlot].source(rPlotDirection);  //it returns and array as a coordinate: [row,col]
            let rowOffset = (rRow - source[0]*2); 
            let colOffset = (rCol - source[1]*2); 
    
            for(let row=0; row<sRowLen; row++){
                for(let col=0; col<sColLen; col++){
                    if(!((rowOffset + row*2) < 0) &&
                       !((colOffset + col*2) < 0) &&
                       !((rowOffset + row*2) >= this.height) &&
                       !((colOffset + col*2) >= this.width)){
                        if(!(this.plots[rowOffset + row*2][colOffset + col*2] == -1)){
    
                            if((structure[row][col]).localeCompare('x') == 0){
                                document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML = "";
            
                                this.plots[rowOffset + row*2][colOffset + col*2]=0;
                                this.iSource[rowOffset + row*2][colOffset + col*2] = rowOffset + row*2;
                                this.jSource[rowOffset + row*2][colOffset + col*2] = colOffset + col*2;
                                this.direction[rowOffset + row*2][colOffset + col*2] = -1;
                            }
                            if((structure[row][col]).localeCompare('w') == 0){
                                this.watered[rowOffset + row*2][colOffset + col*2]--;
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.watered[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                        "<img class=\"plotWatered\" src=\"/images/farmPlots/watered.png\">",
                                        ""
                                        );
                                }
                            }
                            if((structure[row][col]).localeCompare('u') == 0){
                                this.uv[rowOffset + row*2][colOffset + col*2]--;
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.uv[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                        "<img class=\"plotUv\" src=\"/images/farmPlots/uv.png\">",
                                        ""
                                        );
                                }
                            }
                            if((structure[row][col]).localeCompare('f') == 0){
                                this.fert[rowOffset + row*2][colOffset + col*2]--;
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                    this.fert[rowOffset + row*2][colOffset + col*2] == 0){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                        "<img class=\"plotFert\" src=\"/images/farmPlots/fert.png\">",
                                        ""
                                        );
                                }
                            }
                            if((structure[row][col]).localeCompare('p') == 0){
                                this.planted[rowOffset + row*2][colOffset + col*2]--;
                            }
                            if((structure[row][col]).localeCompare('s') == 0){
                                this.strawberried[rowOffset + row*2][colOffset + col*2]--;
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isCrop && 
                                   this.strawberried[rowOffset + row*2][colOffset + col*2] == 0 && 
                                   !(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isStrawberry)){
            
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                        "<div class=\"plotStrawberried\"> " + (this.strawberried[rowOffset + row*2][colOffset + col*2]+1) + " </div>",
                                        ""
                                        );
                                }else if(!(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].isStrawberry)){
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML =
                                    document.getElementById("plot" + letta + (rowOffset + row*2) + "," + (colOffset + col*2)).innerHTML.replace(
                                        "<div class=\"plotStrawberried\"> " + (this.strawberried[rowOffset + row*2][colOffset + col*2]+1) + " </div>",
                                        "<div class=\"plotStrawberried\"> " + this.strawberried[rowOffset + row*2][colOffset + col*2] + " </div>"
                                        );
                                }
                            }
                            if((structure[row][col]).localeCompare('b') == 0){
                                if(plotList[this.plots[rowOffset + row*2][colOffset + col*2]].namae.includes(plotList[rPlot].namae)){
                                    this.breedChanceList[rowOffset + row*2][colOffset + col*2][chosenFarmPlot]--;
                                    this.breedChanceList[chosenRow][chosenCol][chosenFarmPlot]--;
                                    
                                    //its gonna place a baby of itself so it should check and see if its ok
                                    if(this.canPlace(rPlot, chosenFarmPlotDirection, rowOffset + row*2, rCol)){
                                        this.breedTotal[rowOffset + row*2][rCol]--;
                                        this.breedSpotList[rowOffset + row*2][rCol][rPlot]--;
                                    }
                                    //its gonna place a baby of itself so it should check and see if its ok
                                    if(this.canPlace(rPlot, chosenFarmPlotDirection, rRow, colOffset + col*2)){
                                        this.breedTotal[rRow][colOffset + col*2]--;
                                        this.breedSpotList[rRow][colOffset + col*2][rPlot]--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ///////////////////////////// 
    // updatePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta)
    // 
    //   checks if it can place and if so, then checks if its clear or not
    //     if its clearing, removes the plot and all effects with it
    //     if not, places all of the plots squares and all efffects with it
    /////////////////////////////
        updatePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta){
            //this.chosenFarmPlot = chosenFarmPlot;
            //this.chosenFarmPlotDirection = chosenFarmPlotDirection;
            //this.chosenRow = chosenRow;
            //this.chosenCol = chosenCol;
            //this.letta = letta;
            //document.getElementById("plotB5,3").innerHTML += i + "," + j;
            if(plotList[chosenFarmPlot].canFreePlace){
                if(this.canPlace(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol)){
                    this.placePlot(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta);
                }
            }else if(chosenFarmPlot == 0){// this is where id put the event for the remove/rotate popup
                //console.log(chosenRow + "," + chosenCol + "," + letta);
                this.regularRemove(chosenFarmPlot, chosenFarmPlotDirection, chosenRow, chosenCol, letta);  
            }else if(this.canPlace(chosenFarmPlot, chosenFarmPlotDirection, 
                                   Math.ceil((chosenRow + this.heightOffset - 1)/2)*2 - this.heightOffset, 
                                   Math.ceil((chosenCol + this.widthOffset - 1)/2)*2 - this.widthOffset)){
                this.placePlot(chosenFarmPlot, chosenFarmPlotDirection, 
                               Math.ceil((chosenRow + this.heightOffset - 1)/2)*2 - this.heightOffset, 
                               Math.ceil((chosenCol + this.widthOffset - 1)/2)*2 - this.widthOffset, letta);
            }
        }
    }


    // let plotElement = document.getElementById("plot" + letta + i + "," + j);
                    // let removeButton = document.createElement("input");
                    // let rotateButton = document.createElement("input");
                    // removeButton.id = "plotRemove";
                    // removeButton.source = "/images/farmPlots/Remove.png";
                    // removeButton.onclick = this.removePlot(i,j,letta);
                    // rotateButton.id = "plotRotate";
                    // rotateButton.source = "/images/farmPlots/Rotate.png";
                    // plotElement.appendChild(removeButton);
                    // plotElement.appendChild(rotateButton);
    
                    // document.getElementById("plot" + letta + i + "," + j).innerHTML += //place the buttons to choose remove/rotate
                    //                     "<button id=\"plotRemove\" src=\"/images/farmPlots/Remove.png\">" +
                    //                     "<button id=\"plotRotate\" src=\"/images/farmPlots/Rotate.png\">"
                    // document.getElementById("plotRotate").onclick = function(){//chosen remove (((its not clicking...
                    //     this.removePlot(chosenRow, chosenCol, letta);
                    //     calculateBoard();
                    // }
                    // document.getElementById("plotRemove").onclick = function(){//chosen rotate (((its not clicking...
                    //     if(chosenFarmSpotDirection == 3){//set new rotation
                    //         chosenFarmSpotDirection = 0;
                    //     }else{
                    //         chosenFarmSpotDirection++;
                    //     }
    
                    //     if(this.canPlace(chosenFarmPlot, chosenFarmSpotDirection, chosenRow, chosenCol)){
                    //         this.placePlot(chosenFarmPlot, chosenFarmSpotDirection, chosenRow, chosenCol, letta);
                    //     }else{//if cant rotate, just remove the buttons
                    //         document.getElementById("plot" + letta + i + "," + j).innerHTML =
                    //         document.getElementById("plot" + letta + i + "," + j).innerHTML.replace(
                    //             "<img id=\"plotRemove\" src=\"/images/farmPlots/Remove.png\">" +
                    //             "<img id=\"plotRotate\" src=\"/images/farmPlots/Rotate.png\">",
                    //             ""
                    //             );
                    //     }
                    //     calculateBoard();
                    // }
    
                    //gonna comment this out for now........