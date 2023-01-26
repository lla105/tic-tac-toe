import { Status } from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];
    currentTurn!: number;
    gameStatus: Status;
    winSituationsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0],
    ]
    winSituationsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0],
    ]
    public constructor() {
        this.gameStatus = Status.STOP;
        this.gameField = [ 0,0,0,0,0,0,0,0,0];
    }

    gameStart(): void {
        this.gameField = [ 0,0,0,0,0,0,0,0,0];
        this.currentTurn = this. randomPlayerStart();
        console.log(this.currentTurn);
        this.gameStatus = Status.START;
    }

    randomPlayerStart() : number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    setField(position: number, value: number): void {
        this.gameField[position] = value; // value is always be 1 or 2
        // console.log(this.gameField);
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one'; 
        // if currentTurn=2, return string 'player-two', else 'player-one'
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
        // if currentTurn=2, set it to 1. else if it's 1, set to 2.
    }

    arrayEquals(a: Array<any>, b:Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length===b.length && 
        a.every( (value, index) => value===b[index]);
    }

    async checkGameEndWinner(): Promise<boolean> {
        let isWinner = false;

        const checkarray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo; 
        const currentarray: number[] = [];
        this.gameField.forEach( (subfield, index) => { // => { .. } is a 'call back function'
            if ( subfield !== this.currentTurn ) {
                currentarray[index] = 0; //if the box # !=current player, set it as 0
            } else {
                currentarray[index] = subfield; // if box# = current player, set it to player #
            } 
        });
        console.log(currentarray);// we end up with an array[9] w/ only player # & its position

        checkarray.forEach( (checkfield, checkindex) => {
            if ( this.arrayEquals(checkfield, currentarray) ) {
                isWinner = true;
            }
        })
        if ( isWinner) {
            this.gameEnds();
            return true;
        } else {
            return false;
        }
    }
    async checkGameEndFull(): Promise<boolean> {
        let isFull = true;
        if(this.gameField.includes(0)) {
            isFull = false;
        }
        if(isFull) {
            console.log('field is full');
            this.gameEnds();
            return true;
        } else {
            return false;
        }
    }

    gameEnds(): void {
        this.gameStatus = Status.STOP;
    }
    // this.game.checkGameEndWinner();

}
