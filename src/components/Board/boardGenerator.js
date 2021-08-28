export default (width, height, bombNum) => {
	const grid = [];
	const bombIndexes = [];
	for (let j = 0; j < height; j++) {
		const row = [];
		for (let i = 0; i < width; i++) {
			row.push({
				x: i,
				y: j,
				value: 0,
				isHidden: true,
			});
		}
		grid.push(row);
	}

	let bombCount = 0
	while(bombCount < bombNum) {
		let x = Math.trunc(Math.random() * width);
		let y = Math.trunc(Math.random() * height);
		if(grid[y][x].value !== '💣') {
			grid[y][x].value = '💣';
			bombIndexes.push([y, x]);
			bombCount++;

			let top = grid?.[y - 1]?.[x]?.value;
			let bottom = grid?.[y + 1]?.[x]?.value;
			let right = grid?.[y]?.[x + 1]?.value;
			let left = grid?.[y]?.[x - 1]?.value;
			let topRight = grid?.[y - 1]?.[x + 1]?.value;
			let topLeft = grid?.[y - 1]?.[x - 1]?.value;
			let bottomRight = grid?.[y + 1]?.[x + 1]?.value;
			let bottomLeft = grid?.[y + 1]?.[x - 1]?.value;
			
			if (top !== undefined && top !== '💣' ) grid[y - 1][x].value++;
			if (bottom !== undefined && bottom !== '💣' ) grid[y + 1][x].value++;
			if (right !== undefined && right !== '💣' ) grid[y][x + 1].value++;
			if (left !== undefined && left !== '💣' ) grid[y][x - 1].value++;
			if (topRight !== undefined && topRight !== '💣' ) grid[y - 1][x + 1].value++;
			if (topLeft !== undefined && topLeft !== '💣' ) grid[y - 1][x - 1].value++;
			if (bottomRight !== undefined && bottomRight !== '💣' ) grid[y + 1][x + 1].value++;
			if (bottomLeft !== undefined && bottomLeft !== '💣' ) grid[y + 1][x - 1].value++;
			
		}
	}
	
	return [grid, bombIndexes];
}