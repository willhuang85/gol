jQuery(function($){

	$('#getNext').click(function(){
		var liveCells = [[2,1],[2,2],[2,3]]; 
		var data = {
			'M': 5,
			'N': 5,
			'liveCells' : liveCells
		};

		$.ajax({
			url: '/nextGeneration',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: data,
			success: function(response) {
				$('#response').text(response);
			} 
		});

	});
});