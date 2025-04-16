const readlineSync = require('readline-sync');

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

function renderBoard(board) {
	return board.map((row) =>
		row.map((cell) => {
			if (cell.hit) {
				return cell.type === 'ship' && cell.id === 3
					? '🔵'
					: cell.type === 'ship' && cell.id === 2
					? '🟠'
					: '❌';
			}
			return '-';
		})
	);
}

function generateBoard() {
	const size = handleUserInput();
	if (size === null) {
		console.log('You chose to quit, goodbye!');
		return;
	}
	const board = getBoardSize(size);
	placeShips(board, size);
	gameLoop(board);
}

function checkOrientation() {
	let number = Math.floor(Math.random() * 2);
	if (number === 0) {
		return 'horizontal';
	} else {
		return 'vertical';
	}
}

function isWithinBoard(board, orientation, startRow, startCol, shipSize) {
	if (orientation === 'horizontal') {
		return startCol + shipSize - 1 < board[0].length;
	} else if (orientation === 'vertical') {
		return startRow + shipSize - 1 < board.length;
	}
	return false;
}

function isOverlap(board, startRow, startCol, shipSize, orientation) {
	if (orientation === 'horizontal') {
		for (let i = 0; i < shipSize; i++) {
			if (
				startCol + i >= board.length ||
				board[startRow][startCol + i].type !== 'empty'
			) {
				return true;
			}
		}
	}
	if (orientation === 'vertical') {
		for (let i = 0; i < shipSize; i++) {
			if (
				startRow + i >= board.length ||
				board[startRow + i][startCol].type !== 'empty'
			) {
				return true;
			}
		}
		return false;
	}
}

function placeShipOnBoard(board, startRow, startCol, orientation, shipSize) {
	if (orientation === 'horizontal') {
		for (let i = 0; i < shipSize; i++) {
			board[startRow][startCol + i] = {
				type: 'ship',
				id: shipSize,
				hit: false,
			};
		}
	} else {
		for (let i = 0; i < shipSize; i++) {
			board[startRow + i][startCol] = {
				type: 'ship',
				id: shipSize,
				hit: false,
			};
		}
	}
}

function checkShipPlacement(board, orientation, shipSize) {
	let placed = false;
	while (!placed) {
		const startRow = Math.floor(Math.random() * board.length);
		const startCol = Math.floor(Math.random() * board[0].length);
		const withinBoard = isWithinBoard(
			board,
			orientation,
			startRow,
			startCol,
			shipSize
		);
		const overlap = isOverlap(board, startRow, startCol, shipSize, orientation);
		if (withinBoard && !overlap) {
			placeShipOnBoard(board, startRow, startCol, orientation, shipSize);
			placed = true;
		}
	}
}

function getShipsCountForBoard(size) {
	let large, small;

	switch (size) {
		case 4:
			large = 1;
			small = 1;
			break;

		case 5:
			large = 1;
			small = 2;
			break;

		case 6:
			large = 2;
			small = 2;
			break;
	}
	return { large, small };
}

function placeShips(board, size) {
	const { large, small } = getShipsCountForBoard(size);
	for (let i = 0; i < large; i++) {
		const orientation = checkOrientation();
		checkShipPlacement(board, orientation, 3);
	}
	for (let i = 0; i < small; i++) {
		const orientation = checkOrientation();
		checkShipPlacement(board, orientation, 2);
	}
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

generateBoard();
