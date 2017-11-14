var identify = 13; //number news
function filllastnews() {
	sorting();
	if ($('.title').length > 9) {
		$('.titles li:last').remove();
	}
};

function addonpage(data) {
	$('.'+data.news[0].theme+' ul').prepend(template(data));
	$('.titles').prepend(templatelast(data.news[0]));
	identify++;
	console.log(identify);
	filllastnews();
}

function publish() {
	$("input[name='publish']").click(function(){

		//check required
		for (var i = 0; i <= 2; i++) {
			if ($("[required]")[i].value == "") {
				alert("Fill all required elements please");
				return false;
			}
		}
		
			currenttime();
			var article = {/*[identify]:{}*/};
			
			article.number = identify;
			article/*[identify]*/.theme = $("select[name='theme']").val();
			article/*[identify]*/.title = $("input[name='title']").val();
			article/*[identify]*/.author = $("input[name='author']").val();
			article/*[identify]*/.description = $(".addnews textarea").val();
			article/*[identify]*/.date = $("#postingdate").val();
			var news = {'news':[article]};
			$('.addnews > form')[0].reset();
			addonpage(news);

	});
}