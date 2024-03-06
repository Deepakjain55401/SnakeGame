
        let canvas = document.querySelector('canvas');
        let ctx =canvas.getContext('2d');


        let cellsize =50; //height & width ka kaam krega for each cell
        

        let snakeCells=[[0,0]];// 2d array to store starting points of snake ka reactangle

        let boardHeight =600;
        let boardWidth =1000;
        let direction ='right';
        let gameOver= false; //wall se touch hone ke baad ho jaye true

        let foodCells =generateFood();
        let Score =0;
        //bar bar repeat
        let intervalId = setInterval(function(){
            update();
            draw();
            generateFood()
        },200);

        //key down event

        document.addEventListener('keydown',function(event){
            if(event.key==='ArrowDown'){direction='down'}
            else if(event.key==='ArrowUp'){direction='up'}
            else if(event.key ==='ArrowLeft'){direction='left'}
            else{direction='right'};
        });

        //function to draw snake
        function draw(){

            if(gameOver === true){
                clearInterval(intervalId) //accepts an id
                ctx.fillStyle='Green';
                ctx.font='50px monospace';
                ctx.fillText('Game Over !' ,400,400);
                return;
            }

            //draw snake
            ctx.clearRect(0,0,boardWidth,boardHeight );
            for(let cell of snakeCells){
                ctx.fillStyle = 'red';
                ctx.fillRect(cell[0],cell[1],cellsize,cellsize);
                ctx.strokeStyle ='orange';
                ctx.strokeRect(cell[0],cell[1],cellsize,cellsize);
            }
    
            //draw food
            ctx.fillStyle='green';
            ctx.fillRect(foodCells[0] , foodCells[1], cellsize ,cellsize);
            //draw score
            ctx.font='25px monospace';
            ctx.fillText(`Score: ${Score}`,20,30);
    
        }
        //function to update snake
        function update(){
           let headX= snakeCells[snakeCells.length-1][0];
           let headY= snakeCells[snakeCells.length-1][1];

        //    let newheadX=headX + cellsize;
        //    let newheadY=headY;

        let newHeadX;
        let newHeadY;

        if(direction === 'right'){
             newHeadX= headX+cellsize;
             newHeadY =headY;
             if(newHeadX===boardWidth || khelkhatam(newHeadX ,newHeadY)){gameOver=true}
        }
        else if(direction === 'left'){
             newHeadX =headX-cellsize;
             newHeadY =headY;
             if(newHeadX<0 || khelkhatam(newHeadX ,newHeadY)){gameOver=true}
        }
        else if( direction === 'up'){
             newHeadX=headX;
             newHeadY =headY-cellsize;
             if(newHeadY<0 || khelkhatam(newHeadX ,newHeadY)){gameOver =true}
        }
        else{
             newHeadX =headX;
             newHeadY =headY+cellsize;
             if(newHeadY===boardHeight || khelkhatam(newHeadX ,newHeadY)){gameOver=true}
        }

           snakeCells.push([newHeadX , newHeadY]);
           if(newHeadX === foodCells[0] && newHeadY ===foodCells[1]){
            foodCells =generateFood();
            Score+=1;
           }
           else{
           snakeCells.shift();
           }
        }

        function generateFood(){
            return[
                Math.round((Math.random()*(boardWidth-cellsize))/cellsize)*cellsize,
                Math.round((Math.random()*(boardHeight-cellsize))/cellsize)*cellsize,
            ];
        }
        function khelkhatam(newHeadX ,newHeadY){
            for(let item of snakeCells){
                if(item[0]===newHeadX && item[1]=== newHeadY){
                    return true;
                }
            }
            return false;
        }
        
   
