'use strict'

var apiKey = '6a6b135f174bebc7f821ea45772553b8';

$(function() {
	var genreID = getURLParameter("genres");
	var movieID = getURLParameter("movies");
	loadMovieSpecs(genreID, movieID);
});

function loadMovieSpecs(genreID, movieID) {
	var method = '/movie/';
	var queryStr = '?api_key=' + apiKey + '&language=en-US';
	$.ajax({
		type : 'GET',
		url : 'https://api.themoviedb.org/3' + method + movieID + queryStr,
		dataType: 'json',
		success : function(data) {	
				
			var movie = data;
			var poster = movie.poster_path;
			poster = "http://image.tmdb.org/t/p/w500" + poster;
			 
			var allGenres = "";
			movie.genres.forEach(genre => { 
				allGenres += genre.name + ", "; 
			});
			
			var companies = "";
			movie.production_companies.forEach(company => {
				companies += company.name + ", ";
			});
			var spokenLang = "";
			movie.spoken_languages.forEach(spoken => {
				spokenLang += spoken.name + ", ";
			});
			
			$(".header-name")[0].innerHTML = movie.title.replace(/%20/g, ' ').replace(/%27/g, '\'');
			var budget = movie.budget;
			budget = (budget).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			  });
  
			var dateProduction = movie.release_date;
			var runtime = movie.runtime + " mins";
						
			$('<div class ="tagline col-md-12 col-lg-12 col-sm-12 col-xs-12">'+movie.tagline+'</div>').appendTo(".movies");
			$('<div class = ""><img src='+poster+' class ="img-poster col-md-6 col-lg-6 col-sm-12 col-xs-12"><div class ="properties col-md-6 col-lg-6 col-sm-12 col-xs-12"><ul><li>Status : '+movie.status+'</li><li>Companies : '+companies+'</li><li>budget : '+budget+'</li><li>genres : '+allGenres+'</li><li>spoken languages : '+spokenLang+'</li><li>Production Date : '+movie.release_date+'</li><li>runtime : '+runtime+'</li><li>vote average : '+movie.vote_average+'</li><li>votes : '+movie.vote_count+'</li></ul></div><br><br></div>').appendTo(".movies");	
			
			$('<div class ="movie_overview col-md-12 col-lg-12 col-sm-12 col-xs-12">Overview: '+movie.overview+'</div>').appendTo(".movies");
		},
		error : function(code, message) {
			alert("Cannot find movie.");
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

function addHighlight(a) {	
    a.childNodes[0].setAttribute("style", "color: rgb(179, 0, 0);");
	a.childNodes[1].setAttribute("style", "color: rgb(179, 0, 0);");
	a.childNodes[2].setAttribute("style", "color: rgb(179, 0, 0);");	
}

function removeHighlight(a) {
	a.childNodes[0].setAttribute("style", "color: white;");
	a.childNodes[1].setAttribute("style", "color: white;");
	a.childNodes[2].setAttribute("style", "color: white;");	
}
