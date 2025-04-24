const { generateBoard } = require('./boardHelpers.js');
const { renderBoard } = require('./boardUtils.js');
const { userGuess } = require('./utils.js');

function gameLoop(board) {
	let remainingShips = board
		.flat()
		.filter((cell) => cell.type === 'ship' && !cell.hit).length;

	while (remainingShips > 0) {
		console.log('\nYour current board:');
		console.table(renderBoard(board));
		userGuess(board);
		remainingShips = board
			.flat()
			.filter((cell) => cell.type === 'ship' && !cell.hit).length;
	}

	console.log(
		`
========
__   _______ _   _   _    _ _____ _   _
\\ \\ / /  _  | | | | | |  | |_   _| \\ | |
 \\ V /| | | | | | | | |  | | | | |  \\| |
  \\ / | | | | | | | | |/\\| | | | | . ' |
  | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
  \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
========
		`
	);
}

function main() {
	const board = generateBoard();
	gameLoop(board);
}

main();
