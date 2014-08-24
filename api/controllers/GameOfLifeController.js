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

