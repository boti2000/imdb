var movie = new Movie();
movie.id = getUrlParameter('id');

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

movie.getMovieDetails(movie.id).then(function (response) {
  displayPageTitle();
  displayMovieDetails(response);
})

function displayMovieDetails(response) {

  var title = document.querySelector(".title");
  title.innerHTML = response.title;

  var year = document.querySelector(".year");
  if (response.year !== 'N/A' && response.year !== undefined && response.year!== "" && response.year !== "undefined") {
    year.innerHTML = "Release date: " + response.year
  } else {
    year.style.display = 'none'
  }

  var rated = document.querySelector(".ratedD");
  if (response.rated == 'N/A' || response.rated == 'UNRATED' || response.rated == 'NOT RATED' || response.rated == undefined || response.rated == "" || response.production == "undefined") {
    rated.style.display = 'none'
  } else {
    rated.innerHTML = "Rated: " + response.rated
  }

  var runtime = document.querySelector(".runtime");
  if (response.runtime !== 'N/A' && response.runtime !== undefined && response.runtime !== "" && response.runtime !== "undefined") {
    runtime.innerHTML = "Runtime: " + response.runtime
  } else {
    runtime.style.display = 'none'
  }

  var genre = document.querySelector(".genre");
  if (response.genre !== 'N/A' && response.genre !== undefined && response.genre !== "" && response.genre !== "undefined") {
    genre.innerHTML = "Genre: " + response.genre
  } else {
    genre.style.display = 'none'
  }

  var director = document.querySelector(".director");
  if (response.director !== 'N/A' && response.director !== undefined && response.director !== "" && response.director !== "undefined") {
    director.innerHTML = "Directed by: " + response.director
  } else {
    director.style.display = 'none'
  }

  var writer = document.querySelector(".writer");
  if (response.writer !== 'N/A' && response.writer !== undefined && response.writer !== "" && response.writer !== "undefined") {
    writer.innerHTML = "Written by: " + response.writer
  } else {
    writer.style.display = 'none'
  }

  var actors = document.querySelector(".actors");
  if (response.actors !== 'N/A' && response.actors !== undefined && response.actors !== "" && response.actors !== "undefined") {
    actors.innerHTML = "Actor List: " + response.actors;
  } else {
    actors.style.display = "none"
  }

  var plot = document.querySelector(".plot")
  if (response.plot !== 'N/A' && response.plot !== undefined && response.plot !== "" && response.plot !== "undefined") {
    plot.innerHTML = "Plot: " + response.plot
  } else {
    plot.style.display = 'none'
  }

  var language = document.querySelector(".language");
  if (response.language !== 'N/A' && response.language !== undefined && response.language !== "" && response.language !== "undefined") {
    language.innerHTML = "Language: " + response.language
  } else {
    language.style.display = 'none'
  }

  var country = document.querySelector(".country");
  if (response.country !== 'N/A' && response.country !== undefined && response.country !== "" && response.country !== "undefined") {
    country.innerHTML = "Country: " + response.country
  } else {
    country.style.display = 'none'
  }

  var awards = document.querySelector(".awards");
  if (response.awards !== 'N/A' && response.awards !== undefined && response.awards !== "" && response.awards !== "undefined") {
    awards.innerHTML = "Awards Received: " + response.awards
  } else {
    awards.style.display = 'none'
  }

  var poster = document.querySelector(".poster");
  if (response.poster == 'N/A' || response.poster == '' || response.poster == undefined || response.poster == "undefined") {
    poster.innerHTML = "<img src='../movie-default-image.jpg'>"
  } else {
    poster.innerHTML = "<img src='" + response.poster + "' alt = 'movie poster'/>"
  }

  var metascore = document.querySelector(".metascore");
  if (response.metascore !== 'N/A' && response.metascore !== undefined && response.metascore !== "" && response.metascore !== "undefined") {
    metascore.innerHTML = "Metascore: " + response.metascore;
  } else {
    metascore.style.display = 'none'
  }

  var rating = document.querySelector(".ratingDetails");
  if (response.rating !== 'N/A' && response.rating !== undefined && response.rating !== "" && response.rating !== "undefined") {
    rating.innerHTML = "IMDB Score: " + response.rating
  } else {
    rating.style.display = 'none'
  }

  var type = document.querySelector(".type");
  if (response.type !== 'N/A' && response.type !== undefined && response.type !== "" && response.type !== "undefined") {
    type.innerHTML = "Type: " + response.type;
  } else {
    type.style.display = 'none'
  }
  
  var dvd = document.querySelector(".dvd");
  if (response.dvd !== 'N/A' && response.dvd !== undefined && response.dvd !== "" && response.dvd !== "undefined") {
    dvd.innerHTML = "DVD: " + response.dvd
  } else {
    dvd.style.display = 'none'
  }

  var boxOffice = document.querySelector(".box-office");
  if (response.boxOffice !== 'N/A' && response.boxOffice !== undefined && response.boxOffice !== "" && response.boxOffice !== "undefined") {
    boxOffice.innerHTML = "Box Office: " + response.boxOffice;
  } else {
    boxOffice.style.display = 'none'
  }

  var production = document.querySelector(".production");
  if (response.production !== 'N/A' && response.production !== undefined && response.production !== "" && response.production !== "undefined") {
    production.innerHTML = "Produced by: " + response.production
  } else {
    production.style.display = 'none'
  }

}

function displayPageTitle() {
  let pageTitle = document.querySelector(".movie-title")
  pageTitle.innerHTML = movie.title
}