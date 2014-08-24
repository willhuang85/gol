var _ = require('lodash');
module.exports = {
    getNeighborsForCell: function(cell, liveCells) {
        var x = _.parseInt(cell.x);
        var y = _.parseInt(cell.y);
        var neighbors = [];

        addToAllCells({x:x-1,y:y-1}, neighbors, liveCells);
        addToAllCells({x:x,y:y-1}, neighbors, liveCells);
        addToAllCells({x:x+1,y:y-1}, neighbors, liveCells);
        addToAllCells({x:x-1,y:y}, neighbors, liveCells);
        addToAllCells({x:x+1,y:y}, neighbors, liveCells);
        addToAllCells({x:x-1,y:y+1}, neighbors, liveCells);
        addToAllCells({x:x,y:y+1}, neighbors, liveCells);
        addToAllCells({x:x+1,y:y+1}, neighbors, liveCells);

        cell.neighbors = neighbors;
    },

    checkNeighborsForAliveness: function(neighbors, liveCells) {
        for (var i = 0; i < neighbors.length; i++) {
            var cell = neighbors[i];
            this.getNeighborsForCell(cell, liveCells);
        }
    }
};

var addToAllCells = function(cell, neighbors, liveCells){
    if (_.find(neighbors, cell) == undefined) {
        if (_.find(liveCells, cell)) {
            cell.alive = 1;
        }
        neighbors.push(cell);
    }
};
