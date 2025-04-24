const { placeShips } = require('./ships');
const { handleUserInput } = require('./utils');

function getBoardSize(size) {
	let board = [];
	for (let rows = 0; rows < size; rows++) {
		let row = [];
		for (let cols = 0; cols < size; cols++) {
			row.push({ type: 'empty', id: 0, hit: false });
		}
		board.push(row);
	}
	return board;
}

function generateBoard() {
	const size = handleUserInput();
	if (size === null) {
		console.log('You chose to quit, goodbye!');
		return;
	}
	const board = getBoardSize(size);
	placeShips(board, size);
	return board;
}

module.exports = {
	getBoardSize,
	generateBoard,
};
