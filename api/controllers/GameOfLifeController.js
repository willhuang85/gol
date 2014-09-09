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

        liveCells = _.map(liveCells, function(cell) {
           return [parseInt(cell[0]), parseInt(cell[1])];
        });

        var next = GameOfLifeService.getNextGeneration(liveCells, columns, rows);
        res.jsonp(next);

	}
};



