/**
 * GameOfLifeController
 *
 * @description :: Server-side logic for managing Gameoflives
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	nextGeneration: function(req, res) {
        var columns = req.param('M');
        var rows = req.param('N');
        var liveCells = req.param('liveCells');

        var grid = getGrid(columns,rows);
        for (var i = 0; i < liveCells.length; i++) {
            var cell = liveCells[i];
            var cellRow = cell[1];
            var cellCol = cell[0];
            if (cellRow >= rows || cellRow < 0 || cellCol >= columns || cellCol <0) {
                return res.send(500, { error: 'Grid too small' });
            }
            grid[cell[1]][cell[0]] = 1;
        }

        var nextGeneration = GameOfLifeService.getNextGeneration(grid, columns, rows);


		return res.jsonp(nextGeneration);
	}
};

var getGrid = function(columns, rows) {
    grid = [];
    for (var row = 0; row < rows; row++) {
        grid[row] = [];
        for (var column = 0; column < columns; column++) {
            grid[row][column] = 0;
        }
    }
    return grid;
};

