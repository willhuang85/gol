/**
 * GameOfLifeController
 *
 * @description :: Server-side logic for managing Gameoflives
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    nextGeneration: function(req, res) {
        var columns = parseInt(req.param('M'));
        var rows = parseInt(req.param('N'));
        var liveCells = req.param('liveCells');

        var grid = getGrid(columns,rows);
        for (var i = 0; i < liveCells.length; i++) {
            var cell = liveCells[i];
            var cellRow = parseInt(cell[1]);
            var cellCol = parseInt(cell[0]);
            if (cellRow >= rows || cellRow < 0 || cellCol >= columns || cellCol <0) {
                return res.send(500, { error: 'Grid too small' });
            }
            grid[cell[1]][cell[0]] = 1;
        }

        var nextGeneration = GameOfLifeService.getNextGeneration(grid, columns, rows);


        return res.jsonp(nextGeneration);
    },

	nextGeneration2: function(req, res) {
        var columns = parseInt(req.param('M'));
        var rows = parseInt(req.param('N'));
        var liveCells = req.param('liveCells');

        var lcells = _.map(liveCells, function(cell) {return {x:parseInt(cell[0]), y:parseInt(cell[1])}});
        var lcells2 = _.map(liveCells, function(cell) {return {x:parseInt(cell[0]), y:parseInt(cell[1])}});

        for (var i = 0; i < lcells.length; i++) {
            var cell = lcells[i];
            GameOfLife2Service.getNeighborsForCell(cell, lcells);
            GameOfLife2Service.getNeighborsForNeighbors(cell.neighbors, lcells2);
        }

        var next = [];
        for (var i = 0; i < lcells.length; i++) {
            var cell = lcells[i];
            cell.alive = 1;
            if (aliveNextGen(cell)) {
                insert(cell,next);
            }
            for (var j = 0; j < cell.neighbors.length; j++) {
                var neighborCell = cell.neighbors[j];
                if (aliveNextGen(neighborCell)) {
                    insert(neighborCell,next);
                }
            }

        }

        var result = _.filter(next, function(cell) {
            var x = cell[0];
            var y = cell[1];
           if (x > columns || x < 0 || y > rows || y < 0) {
               return false;
           } else {
               return true;
           }
        });


		return res.jsonp(result);
	}
};

var insert = function(cell, next) {
    var c = [cell.x, cell.y];
    if (_.find(next, c) == undefined) {
        next.push(c);
    }
};

var aliveNextGen = function(cell) {
    var count = _.filter(cell.neighbors, 'alive').length;
    count += _.has(cell, 'alive') ? 1 : 0;
    if (count == 3) {
        return true;
    } else if (count == 4) {
        if (_.has(cell,'alive')) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
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

