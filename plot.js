class plot {
    constructor(shape, namae,  time, value, price, minYield, maxYield) {
        this.shape = shape;
        this.img = '/images/farmPlots/' + namae + '.png';
        this.namae = namae; //japanese for "name" idk
        this.time = time;
        this.value = value;
        this.price = price;
        this.minYield = minYield;
        this.maxYield = maxYield;

        this.isCrop = false;    
        this.isSprinkler = false;
        this.isUV = false;
        this.isFert = false;
        this.isPlant = false;
        this.isStrawberry = false;
        this.isBreedable = false;
        this.isConsumable = false;

        this.isSeedCapped = false;  

        this.isMultiblock = false;
        this.isDirectional = false;

        this.canFreePlace = false;
        this.isClover = this.namae.includes("Clover");

        let xCount = 0;

        for(let row=0; row<this.shape.length; row++){
            for(let col=0; col<shape[row].length; col++){
                if((shape[row][col]).localeCompare('w') == 0){
                    this.isSprinkler = true;
                }
                if((shape[row][col]).localeCompare('u') == 0){
                    this.isUV = true;
                }
                if((shape[row][col]).localeCompare('f') == 0){
                    this.isFert = true;
                }
                if((shape[row][col]).localeCompare('p') == 0){
                    this.isPlant = true;
                }
                if((shape[row][col]).localeCompare('s') == 0){
                    this.isStrawberry = true;
                }
                if((shape[row][col]).localeCompare('b') == 0){
                    this.isBreedable = true;
                }
                if((shape[row][col]).localeCompare('x') == 0){
                    xCount++;
                }
            }
        }

        if(xCount > 1){
            this.isMultiblock = true;
        }
        if(maxYield > 0){
            this.isCrop = true;
        }
        if(price > 0){
            this.isConsumable = true;
        }
    }

    multiblockOverlay(direction, row, col){
        let s = [['z']];
        s = this.Structure(direction);
        let left = false;
        let top = false;
        let right = false;
        let bottom = false;

        if(col > 0){
            if((s[row][col-1]).localeCompare('x') == 0){
                left = true;
            }
        }
        if(row > 0){
            if((s[row-1][col]).localeCompare('x') == 0){
                top = true;
            }
        }
        if(col < (s[row].length - 1)){
            if((s[row][col+1]).localeCompare('x') == 0){
                right = true;
            }
        }
        if(row < (s.length - 1)){
            if((s[row+1][col]).localeCompare('x') == 0){
                bottom = true;
            }
        }


        if(!(right || left || top || bottom)){
            return ["0deg","alone"];
        }

        if((right && left) || (top && bottom)){
            return ["0deg","surrounded"];
        }

        if(right && bottom){
            return ["0deg","angle"];
        }
        if(left && bottom){
            return ["90deg","angle"];
        }
        if(left && top){
            return ["180deg","angle"];
        }
        if(right && top){
            return ["270deg","angle"];
        }

        if(bottom){
            return ["0deg","edge"];
        }
        if(left){
            return ["90deg","edge"];
        }
        if(top){
            return ["180deg","edge"];
        }
        if(right){
            return ["270deg","edge"];
        }

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

    Structure(direction){
        let rowLength = this.shape.length;
        let colLength = this.shape[0].length;
        let s = [['z']];
        
        if(direction == 0){         //up
            return this.shape;
        }else if(direction == 1){   //right
            s.length = colLength;
            for(let row=1; row<(colLength+1); row++){
                s[row-1] = [['z']];
                s[row-1].length = rowLength;
                for(let col=1; col<(rowLength+1); col++){
                    s[row-1][col-1] = this.shape[rowLength-col][colLength-row];
                }
            }
            return s;       
        }else if(direction == 2){   //down
            s.length = rowLength;
            for(let row=1; row<(rowLength+1); row++){
                s[row-1] = [['z']];
                s[row-1].length = colLength;
                for(let col=1; col<(colLength+1); col++){
                    s[row-1][col-1] = this.shape[rowLength-row][colLength-col];
                }
            }
            return s;   
        }else if(direction == 3){   //left
            s.length = colLength;
            for(let row=0; row<colLength; row++){
                s[row] = [['z']];
                s[row].length = rowLength;
                for(let col=0; col<rowLength; col++){
                    s[row][col] = this.shape[col][row];
                }
            }
            return s;   
        }
    }

    source(direction){//just return the first X available that we see? reading each row left to right like english
        let s = this.Structure(direction);

        if(direction == 0){         //up
            for(let row=0; row<s.length; row++){
                for(let col=0; col<s[row].length; col++){
                    if((s[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 1){   //right
            for(let row=0; row<s.length; row++){
                for(let col=0; col<s[row].length; col++){
                    if((s[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 2){   //down
            for(let row=0; row<s.length; row++){
                for(let col=0; col<s[row].length; col++){
                    if((s[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }else if(direction == 3){   //left
            for(let row=0; row<s.length; row++){
                for(let col=0; col<s[row].length; col++){
                    if((s[row][col]).localeCompare('x') == 0){
                        return [row,col];
                    }
                }
            }
        }
    }
    updatePlot()
    {

    }
}