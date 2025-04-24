function isWithinBoard(board, orientation, startRow, startCol, shipSize) {
	if (orientation === 'horizontal') {
		return startCol + shipSize - 1 < board[0].length;
	} else if (orientation === 'vertical') {
		return startRow + shipSize - 1 < board.length;
	}
	return false;
}

function generateRowLabels(size) {
	return Array.from({ length: size }, (_, i) => String.fromCharCode(65 + i));
}

function renderBoard(board) {
	const size = board.length;
	const rowLabels = generateRowLabels(size);
	const renderedBoard = rowLabels.reduce((acc, label, rowIndex) => {
		acc[label] = board[rowIndex].map((cell) => {
			if (cell.hit) {
				return cell.type === 'ship' && cell.id === 3
					? '🔵'
					: cell.type === 'ship' && cell.id === 2
					? '🟠'
					: '❌';
			}
			return '-';
		});
		return acc;
	}, {});
	return renderedBoard;
}

module.exports = {
	isWithinBoard,
	renderBoard,
};
