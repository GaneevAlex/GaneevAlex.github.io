
function sorting() {
	var list = $('.titles li');

	list.sort(function(a, b){

		return Number(a.getAttribute('name')) <= Number(b.getAttribute('name'));
	});

	$('.titles').html(list);
}