var sourcelast = $('#TemplateLast').html();
var templatelast = Handlebars.compile(sourcelast);

var source   = $('#TemplateDescription').html();
var template = Handlebars.compile(source);

function post(were, from) {

	$.getJSON('../data/'+from+'.html', function(data){

		$(were).append(template(data));
		for (var i = 0; i < data.news.length; i++) {
		$('.titles').append(templatelast(data.news[i]));
		filllastnews();
		};
	});
	
}

function getnews(){

post('.other ul', 'other');
post('.culture ul', 'culture');
post('.hi-tech ul', 'hitech');
post('.politics ul', 'politics');
	
}
