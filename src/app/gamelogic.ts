import { Status } from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];
    currentTurn!: number;
    gameStatus: Status;

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
        this.gameField[position] = value;
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
}