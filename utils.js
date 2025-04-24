const readlineSync = require('readline-sync');
const { renderBoard } = require('./boardUtils');

function greetUser() {
	console.log('Welcome to Battleship 🚢 \n choose a Board Size: ');
	const options = ['4X4', '5X5', '6X6'];
	const boardSize = readlineSync.keyInSelect(options, 'Choose a board size: ');
	return boardSize;
}

function handleUserInput() {
	const index = greetUser();

	if (index === -1) {
		return null;
	}

	const sizes = [4, 5, 6];
	return sizes[index];
}

function userGuess(board) {
	let validGuess = false;
	while (!validGuess) {
		const guess = readlineSync
			.question('Enter your guess (e.g., A1, B3, etc.): ')
			.toUpperCase();
		const row = guess.charCodeAt(0) - 65;
		const col = parseInt(guess[1], 10);

		if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
			const cell = board[row][col];
			if (!cell.hit) {
				cell.hit = true;
				if (cell.type === 'ship') {
					console.log('Hit!');
				} else {
					console.log('Miss!');
				}
				validGuess = true;
				console.table(renderBoard(board));
			} else {
				console.log('You already guessed that spot, try again.');
			}
		} else {
			console.log('Invalid guess, try again.');
		}
	}
}

module.exports = {
	greetUser,
	handleUserInput,
	userGuess,
};
