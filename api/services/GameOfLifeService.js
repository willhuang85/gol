var _ = require('lodash');
module.exports = {

    getNextGeneration: function(currentGeneration, columns, rows) {
        var next = [];
        var liveCells = currentGeneration.map(function(arr) {
            return arr.slice();
        });
        currentGeneration.forEach(function(cell){
            cell.alive = true;
            getNeighborsForCell(cell, false, liveCells, columns, rows);
            cell.neighbors.forEach(function(neighbor) {
                populateNext(neighbor, next);

            });
            populateNext(cell, next);
        });
        return next;

    }
};

var populateNext = function(cell, next) {
    if (cell.numOfAliveNeighbors == 3) {
        if (_.find(next, cell) == undefined) {
            next.push(cell);
        }
    } else if (cell.numOfAliveNeighbors == 4) {
        if (cell.alive) {
            if (_.find(next, cell) == undefined) {
                next.push(cell);
            }
        }
    }
};

var getNeighborsForCell = function(cell, stop, liveCells, c, r) {
    var x = cell[0];
    var y = cell[1];
    cell.neighbors = [];
    if (x-1 >= 0 && x-1 < c && y-1 >=0 && y-1 < r)
        addToNeighbors(cell.neighbors, [x-1,y-1], liveCells);

    if (x >= 0 && x < c && y-1 >=0 && y-1 < r)
        addToNeighbors(cell.neighbors, [x,y-1], liveCells);

    if (x+1 >= 0 && x+1 < c && y-1 >=0 && y-1 < r)
        addToNeighbors(cell.neighbors, [x+1,y-1], liveCells);

    if (x-1 >= 0 && x-1 < c && y >=0 && y < r)
        addToNeighbors(cell.neighbors, [x-1,y], liveCells);

    if (x+1 >= 0 && x+1 < c && y >=0 && y < r)
        addToNeighbors(cell.neighbors, [x+1,y], liveCells);

    if (x-1 >= 0 && x-1 < c && y+1 >=0 && y+1 < r)
        addToNeighbors(cell.neighbors, [x-1,y+1], liveCells);

    if (x >= 0 && x < c && y+1 >=0 && y+1 < r)
        addToNeighbors(cell.neighbors, [x,y+1], liveCells);

    if (x+1 >= 0 && x+1 < c && y+1 >=0 && y+1 < r)
        addToNeighbors(cell.neighbors, [x+1,y+1], liveCells);

    var count = 0;
    cell.neighbors.forEach(function(neighbor){
       if (neighbor.alive)
            count++;
    });
    if (cell.alive) {
        count++;
    }
    cell.numOfAliveNeighbors = count;

    if (stop != true) {
        cell.neighbors.forEach(function(neighbor) {
            getNeighborsForCell(neighbor, true, liveCells, c, r);
        });
    }
};

var addToNeighbors = function(neighbors, cell, liveCells) {
    liveCells.forEach(function(lcell) {
        if (cell[0] == lcell[0] && cell[1] == lcell[1]) {
            cell.alive = true;
        }
    });
    neighbors.push(cell);
};