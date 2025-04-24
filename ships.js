const { isWithinBoard } = require('./boardUtils');

function checkOrientation() {
	let number = Math.floor(Math.random() * 2);
	if (number === 0) {
		return 'horizontal';
	} else {
		return 'vertical';
	}
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

module.exports = {
	checkOrientation,
	isOverlap,
	placeShipOnBoard,
	checkShipPlacement,
	getShipsCountForBoard,
	placeShips,
};
