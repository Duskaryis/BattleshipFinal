function isWithinBoard(board, orientation, startRow, startCol, shipSize) {
	if (orientation === 'horizontal') {
		return startCol + shipSize - 1 < board[0].length;
	} else if (orientation === 'vertical') {
		return startRow + shipSize - 1 < board.length;
	}
	return false;
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

module.exports = {
	isWithinBoard,
	renderBoard,
};
