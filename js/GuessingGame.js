
function Game() {

	this.playersGuess = null;
	this.pastGuesses = [];

	this.winningNumber = generateWinningNumber();

	this.hint = this.provideHint();

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

	if (this.pastGuesses.includes(this.playersGuess)) { return 'You have already guessed that number.'; }

	this.pastGuesses.push(this.playersGuess);

	if (this.playersGuess == this.winningNumber) { return 'You Win!'; }

	else {
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


// JQuery

function makeGuess(game) {

	var guess = parseInt($('#players-input').val());
	$('#players-input').val("");
	console.log(guess);

	return game.playersGuessSubmission(guess);

};

function guessHandler(game, guess_ret) {

	if (guess_ret == 'You have already guessed that number.') { $('#title').text('Guess Again!'); } 

	$('#guess-list li:nth-child(' + game.pastGuesses.length + ')').text(game.playersGuess);

	if (guess_ret == 'You Lose.' || guess_ret == 'You Win!') {
		$('#title').text(guess_ret);
		$('#subtitle').text('Click reset to try again.');
		$('#hint, #submit').prop("disabled", true);
		$('#players-input').attr("disabled", "disabled");
	} else {
		if (game.isLower()) { $('#title').text('Guess Higher!'); }
		else { $('#title').text('Guess Lower!'); }
		$('#subtitle').text(guess_ret);
	}

};

$(document).ready(function() { 

	var game = newGame();
	// console.log(game.winningNumber);
	var guess_ret;

	$('#submit').click(function(e) {
		guess_ret = makeGuess(game);
		guessHandler(game, guess_ret);
	});

	$('#players-input').keypress(function(event) {
		if (event.which == 13 && guess_ret != 'You Win!' && guess_ret != 'You Lose.') {
			guess_ret = makeGuess(game);
			guessHandler(game, guess_ret);
		}
	});

	$('#hint').click(function(e) {
		$('#title').text('Solution is one of: ' + game.hint);
	});

	$('#reset').click(function(e) {
		$('#title').text('Guessing Game!');
		$('#subtitle').text('Guess a number between 1-100');
		$('.guess').text("-");
		$('#players-input').removeAttr("disabled");
		game = newGame();
		$('#hint, #submit').prop("disabled", false);
	});

});
