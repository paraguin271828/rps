class Game {
  constructor (rounds = 1, moves) {
    this._numRounds = rounds;

    this._player1 = new Player('Player 1');
    this._player2 = new Player('Player 2');

    this._player1.makeMoves = moves;
    this._player2.makeRandomMoves = this._numRounds;

    this._repertoire = ['Rock', 'Paper', 'Scissors'];

    this._moveList = document.getElementsByClassName('moves')[0];
    this._moveList.innerHTML = '';
    this._score = { [this._player1.name]: 0, [this._player2.name]: 0 };

    this._finalScore = '';
  }

  determineWinner (player1, player2) {
    /*
    ** r = 0
    ** p = 1
    ** s = 2

    ** p1   p2   result   winner
    ** r    p    -1       p2
    ** r    s    -2       p1

    ** p   r      1       p1
    ** p   s     -1       p2

    ** s   r      2       p2
    ** s   p      1       p1

    ** p1 winning conditions: -2, 1
    ** p2 winning conditions: -1, 2
    */

    for (let i = 0; i < this._numRounds; i++) {
      console.log(`Round ${i + 1}`);
      if (player1.moves[i] - player2.moves[i] === -2 || player1.moves[i] - player2.moves[i] === 1) {
        console.log(`${this._repertoire[player1.moves[i]]} beats ${this._repertoire[player2.moves[i]]}.`);
        console.log(`${player1.name} wins round ${i + 1}.\n`);

	document.getElementsByClassName('moves')[0].innerHTML += `<p>${this._repertoire[player1.moves[i]]} beats ${this._repertoire[player2.moves[i]]}.<br>${player1.name} wins round ${i + 1}.</p>\n`;
        this._score[this._player1.name]++;

      } else if (player1.moves[i] - player2.moves[i] === -1 || player1.moves[i] - player2.moves[i] === 2) {
        console.log(`${this._repertoire[player2.moves[i]]} beats ${this._repertoire[player1.moves[i]]}.`)

	document.getElementsByClassName('moves')[0].innerHTML += `<p>${this._repertoire[player2.moves[i]]} beats ${this._repertoire[player1.moves[i]]}.<br>${player2.name} wins round ${i + 1}.</p>\n`;

	console.log(`${player2.name} wins round ${i + 1}.\n`);
        this._score[this._player2.name]++;

      } else {
        console.log(`${player1.name} chose ${this._repertoire[player1.moves[i]]} and ${player2.name} chose ${this._repertoire[player2.moves[i]]}.`)
        console.log(`Round ${i + 1} tied.\n`);

	document.getElementsByClassName('moves')[0].innerHTML += `<p>${player1.name} chose ${this._repertoire[player1.moves[i]]} and ${player2.name} chose ${this._repertoire[player2.moves[i]]}.<br>Round ${i + 1} tied.</p>\n`;
      }
    }

    if (this._score[this._player1.name] === this._score[this._player2.name]) this.finalScore = 'Overall games were tied. Noone wins.';
    else this.finalScore = this._score[this._player1.name] > this._score[this._player2.name] ? `Overall winner: ${this._player1.name}.` : `Overall winner: ${this._player2.name}.`;
  }

  get currentScore () {
    return this._score;
  }

  set finalScore (score) {
    this._finalScore = score;
  }

  get finalScore () {
    return this._finalScore;
  }
}

class Player {
  constructor (name) {
    this._name = name;
    this._moves = [];
  }

  set makeMoves (moves) {
    for (let i = 0; i < moves.length; i++) {
      this._moves[i] = moves[i];
    }
  }

  set makeRandomMoves (rounds) {
    for (let i = 0; i < rounds; i++) {
      this._moves[i] = Math.floor(Math.random() * 3);
      // 3 is the number of different moves +1 (starting from 0)
    }
  }

  get moves () {
    return this._moves;
  }

  get name () {
    return this._name;
  }
}

const gameDurationPicker = document.getElementById('roundpicker');

function adjustRounds () {
  const maxRounds = gameDurationPicker.children.length;
  const moves = [];

  for (let i = 0; i < maxRounds; i++) {
    const curEl = document.getElementsByClassName('move')[i];
    const curMove = `round${i + 1}move`;

    i <= gameDurationPicker.value - 1 ? curEl.classList.add('active') : curEl.classList.remove('active');

    if (i <= gameDurationPicker.value - 1) {
      console.log(document.querySelector(`input[name = "${curMove}"]:checked`).value);
      moves.push(document.querySelector(`input[name = "${curMove}"]:checked`).value)
      console.log(moves);
    }
  }
  return moves;
}

const startGame = () => {
  const myGame = new Game(gameDurationPicker.value, adjustRounds());
  myGame.determineWinner(myGame._player1, myGame._player2);
  document.getElementsByClassName('finalscore')[0].innerHTML = myGame.finalScore;
  console.log(myGame.currentScore);
}

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  startGame();
  event.preventDefault();
})

// window.onload = adjustRounds();
