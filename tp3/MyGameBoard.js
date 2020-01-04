class MyGameBoard extends CGFobject {
    /**
     * Constructor of the class MyGameBoard.
     * @param {CGFscene} scene Scene of the application.
     */
    constructor(scene) {
        super(scene);

        this.handler = new MyHandler();

        this.boardCells = [];
        this.currentBoard = [
            [["blue","wn","bt"], ["blue","bn","wt"], ["blue","wn","bt"], ["blue","bn","wt"], ["blue","wn","bt"]],
            [["empty",null,"wt"], ["empty",null,"bt"], ["empty",null,"wt"], ["empty",null,"bt"], ["empty",null,"wt"]],
            [["empty",null,"bt"], ["empty",null,"wt"], ["empty",null,"bt"], ["empty",null,"wt"], ["empty",null,"bt"]],
            [["empty",null,"wt"], ["empty",null,"bt"], ["empty",null,"wt"], ["empty",null,"bt"], ["empty",null,"wt"]],
            [["red","wn","bt"], ["red","bn","wt"], ["red","wn","bt"], ["red","bn","wt"], ["red","wn","bt"]]
        ];

        var width = 5;
        var height = 5;

        for (var i = 0; i < height; i++) {
            let boardCellsList = []
            
            for (var j = 0; j < width; j++) {
                let pieceList = this.getPieceList(i,j);
              
                let piece = new ChameleonPiece(scene,pieceList);
                piece.setCoordinates(j ,i);
                console.log(j,i);

                boardCellsList.push(new BoardCell(scene, j, i,i, j,piece));
            }
            this.boardCells.push(boardCellsList);
        }
    };

    /**
     * MyGameBoard Display function. Displays all the MyGameBoard cells and registers them for picking.
     */
    display() {
        var degToRad = Math.PI / 180;

        this.scene.pushMatrix();

        this.scene.translate(-2.5, 0, -2.5);

        for (var i = 0; i < this.boardCells.length; i++) {
            for (var j = 0; j < this.boardCells[i].length; j++) {
                this.scene.registerForPick(j*5+i+1, this.boardCells[i][j]);
                this.boardCells[i][j].display();
                
                if(this.boardCells[i][j].getPiece() != null){
                    this.boardCells[i][j].getPiece().display();
                }
            }
        }
        this.scene.popMatrix();

    }

    removePieceTile(row,column){
        this.boardCells[row][column].setPiece(null);
        
    }
    getPieceList(row,column){
        return this.currentBoard[row][column];
    }

    getTileByCoords(){

    }

    async movePiece(row, column,newRow,newColumn){
        //TODO
        let piece = this.boardCells[row][column].getPiece();

        let valid = await this.handler.move(piece.team, row, column, newRow, newColumn);
        
        if(!valid){
            console.log("Jogada Inválida");
            return null;
        }

        console.log("passou");
        let gameMove = new MyGameMove(this.scene,piece,this.boardCells[row][column],this.boardCells[newRow][newColumn],this);

        //team, board
       //if(this.handler.move(Team, row, col, newRow, newCol, this.currentBoard) != NULL)
        if(piece != null){
            let coords = this.boardCells[newRow][newColumn].getCoords();
            this.removePieceTile(row,column);
            this.boardCells[newRow][newColumn].setPiece(piece);
            piece.setCoordinates(coords[0],coords[2]);
           console.log (this.boardCells[newRow][newColumn].getCoords());
        }
        
        return gameMove;  
    }
}