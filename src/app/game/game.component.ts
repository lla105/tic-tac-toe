import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }
  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    if (information !=null) { // check if this is ok
      information.innerHTML = currentPlayer;
    }
  }

  async clickSubfield( subfield: any ): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position'); // position of box
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn)
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color); // set class of that subfield

      // await this.game.checkGameEndWinner();
      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if(this.game.gameStatus == 0 && end ) {
          if (information != null) {
            information.innerHTML = 'The winner is player number ' + this.game.currentTurn;
          }
        } 
      });
      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
        if (information != null) {
          information.innerHTML = currentPlayer;
        }
      }
    }
  }
}
