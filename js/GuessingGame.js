
function Game() {

	this.playersGuess = null;
	this.pastGuesses = [];

	this.winningNumber = generateWinningNumber();

};

Game.prototype.difference = function() { return Math.abs(this.playersGuess - this.winningNumber); }

Game.prototype.isLower = function() {
	if (this.playersGuess < this.winningNumber) { return true; }
	return false;
}

Game.prototype.playersGuessSubmission = function(inp) {

	if (inp < 1 || inp > 100 || typeof inp != 'number') { throw "That is an invalid guess."; }
	this.playersGuess = inp;

	// try {
	// 	if (inp < 1 || inp > 100 || typeof inp != 'number') { throw "That is an invalid guess."; }
	// 	this.playersGuess = inp;
	// } catch (err) {
	// 	console.log(err);
	// }

	return this.checkGuess();

};

Game.prototype.checkGuess = function() {

	if (this.playersGuess == this.winningNumber) { return 'You Win!'; }

	else if (this.pastGuesses.includes(this.playersGuess)) { return 'You have already guessed that number.'; }

	else {
		this.pastGuesses.push(this.playersGuess);
		if (this.pastGuesses.length >= 5) { return 'You Lose.'; }
		if (this.difference() < 10) { return 'You\'re burning up!'; }
		else if (this.difference() < 25) { return 'You\'re lukewarm.'; }
		else if (this.difference() < 50) { return 'You\'re a bit chilly.'; }
		else { return 'You\'re ice cold!'; }
	}
};

Game.prototype.provideHint = function() {

	var ret = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	return shuffle(ret);

};


function generateWinningNumber() { return Math.floor(Math.random()*100) + 1; };


function shuffle(arr) {

	var m = arr.length, t, i;

	// While there are elements to shuffle
	while (m) {

		// Pick a remaining element
		i = Math.floor(Math.random() * m--);

		// Swap it with current element
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;

	}

	return arr;

};


function newGame() { return new Game(); };
