'use strict'

var apiKey = '6a6b135f174bebc7f821ea45772553b8';
$(function() {	
	loadAllGenres();
});

function loadAllGenres() {
	var method = '/genre/movie/list';
	var queryStr = '?api_key=' + apiKey + '&language=en-US';
	$.ajax({
		type : 'GET',
		url : 'https://api.themoviedb.org/3'+method+queryStr,
		dataType: 'json',
		success : function(data) {			
			var genres = data.genres;
			genres.forEach(function(genre, index){
				$(".all-genres").append('<a href = "topMovies.html?genres=' + genre.id + '" onmouseover = "addHighlight(this)" onmouseleave = "removeHighlight(this)" class = "box-genres col-md-7 col-lg-7 col-sm-7 col-xs-7 col-md-push-3 col-lg-push-3 col-sm-push-3 col-xs-push-3"><h1 class = "index col-md-5 col-lg-5 col-sm-5 col-xs-5">' + (index + 1) +'.</h1>' +'<p class = "box-name-genres">' + genre.name +'</p></a><div class = row-space-genres></div>');
			});

			$(".all-genres").append('<div class = "empty col-md-9 col-lg-9 col-sm-9 col-xs-9 col-md-push-3 col-lg-push-3 col-sm-push-3 col-xs-push-3"></div>');
		}, 
		error : function(code, message) {
			alert("Cannot load genres.");
		}
	});
}

function addHighlight(a) {	
    a.childNodes[0].setAttribute("style", "color: rgb(179, 0, 0);");
	a.childNodes[1].setAttribute("style", "color: rgb(179, 0, 0);");	
}

function removeHighlight(a) {
	a.childNodes[0].setAttribute("style", "color: white;");
	a.childNodes[1].setAttribute("style", "color: white;");	
}

function searchMovie() {
		var searchWord = $('.search-word')[0].value.trim();
		window.location.replace("search.html?search="+searchWord);
		return;
	}
	
	
