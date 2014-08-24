
module.exports = {

    getNextGeneration: function(currentGeneration, columns, rows) {
        var nextGeneration = [];
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (isAlive(i, j, currentGeneration)) {
                    nextGeneration.push([j,i]);
                }
            }
        }
        return nextGeneration;
    }
};

var isAlive = function(row, column, currentGeneration) {
    var count = getNeighborCount(column, row, currentGeneration);
    if (count == 3) {
        return true;
    } else if (count == 4) {
        if (currentGeneration[row][column] == 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

var getNeighborCount = function(column, row, currentGeneration) {
    var count = 0;
    var line;
    if (row-1 >= 0) {
        line = currentGeneration[row-1];
        count+= countNeighborsInRow(column, line);
    }

    line = currentGeneration[row];
    count+= countNeighborsInRow(column, line);

    if (row+1 < currentGeneration.length) {
        line = currentGeneration[row+1];
        count+= countNeighborsInRow(column, line);
    }
    return count;

};

var countNeighborsInRow = function(column, line) {
    var count = 0;
    if (column-1 >= 0) {
        count += line[column-1];
    }
    count += line[column];
    if (column+1 < line.length) {
        count+= line[column+1];
    }
    return count;
};