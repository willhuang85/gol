jQuery(function($){

	$('#getNext').click(function(){
//		var liveCells = [[2,1],[2,2],[2,3]];

        var input = $('#myInput').val();
        var M = $('#M').val();
        var N = $('#N').val();
        if (!input || !M || !N)
            return;
        var liveCells = $.parseJSON($('#myInput').val());
		var data = {
			'M': M,
			'N': N,
			'liveCells' : liveCells
		};

		$.ajax({
			url: '/nextGeneration2',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: data,
			success: function(response) {
				$('#response').text(JSON.stringify(response));
			},
            error: function(x) {
                $('#response').text(JSON.parse(x.responseText).error);
            }
		});

	});




});