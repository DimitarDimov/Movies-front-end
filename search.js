'use strict'

var apiKey = '6a6b135f174bebc7f821ea45772553b8';

$(function() {
	var word = getURLParameter("search");
	loadResults(word);
});

function loadResults(word) {
	var method = '/search/movie';
	var api = '?api_key=' + apiKey + '&language=en-US';
	$.ajax({
		type : 'GET',
		url : 'https://api.themoviedb.org/3/search/movie?api_key=6a6b135f174bebc7f821ea45772553b8&language=en-US&query='+word+"&page=1&include_adult=false",
		dataType: 'json',
		success : function(data) {			
            
            var movies = data.results;
            			
			var title = "";
			var voteCount = 0;
			var voteAverage = 0.0;
			var poster = "";
            var overview = "";
            var wordChanged = word.replace(/%20/g, ' ');
            
			$(".header-name")[0].innerHTML = "Searched: "+wordChanged;
			movies.forEach(function(movie, index)
			{
                poster = movie.poster_path;
                if(poster == null){
                    poster = "no-image-available.png";
                }else{
				poster = "http://image.tmdb.org/t/p/w154" + poster; 
                }
                if(movie.overview.length > 260){
				overview = movie.overview.substring(0,260)+"...";
				}
				else{
					overview = movie.overview;
				}
				$(".results").append('<a href = "movies.html?genres=' + movie.genre_ids[0] + '&movies=' + movie.id + '" onmouseover = "highlightAlbum(this)" onmouseleave = "removeHighlight(this)" class = "box-movies col-md-9 col-lg-9 col-sm-9 col-xs-9 col-md-push-2 col-lg-push-2 col-sm-push-2 col-xs-push-2"><h1 class = "index col-md-1 col-lg-1 col-sm-1 col-xs-1">' + (index + 1) + '</h1><h2 class = "movie-name">' + movie.title +'</h2><img class = "box-img" src="' + poster + '"/><h3 class = "count col-md-5 col-lg-5 col-sm-5 col-xs-5 pull-right">Average: ' + movie.vote_average +' from ' + movie.vote_count +' votes.</h3><h4 class = "overview col-md-8 col-lg-8 col-sm-8 col-xs-8 pull-right">Overview: ' + overview +'</h4></a>');
			})
			$(".results").append('<div class = "empty col-md-8 col-lg-9 col-sm-8 col-xs-8 col-md-push-3 col-lg-push-3 col-sm-push-3 col-xs-push-3"></div>');

			},
		error : function(code, message) {
			alert("Cannot load movies from this gender");
		}
	});
}

function getURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');

	for (var index = 0; index < sURLVariables.length; index++) {
		var sParameterName = sURLVariables[index].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function highlightAlbum(a) {	
    a.childNodes[0].setAttribute("style", "color: rgb(179, 0, 0);");
	a.childNodes[3].setAttribute("style", "color: rgb(179, 0, 0);");
	a.childNodes[4].setAttribute("style", "color: rgb(179, 0, 0);");	
}

function removeHighlight(a) {
	a.childNodes[0].setAttribute("style", "color: white;");
	a.childNodes[3].setAttribute("style", "color: white;");
	a.childNodes[4].setAttribute("style", "color: white;");	
}
