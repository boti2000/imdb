function getAccessToken() {
  return localStorage.getItem('AccesToken');
}

function Movie(options = {}) {
  this.id = options._id;
  this.title = options.Title;
  this.year = options.Year;
  this.rated = options.Rated;
  this.runtime = options.Runtime;
  this.genre = options.Genre;
  this.director = options.Director;
  this.writer = options.Writer;
  this.actors = options.Actors;
  this.plot = options.Plot;
  this.language = options.Language;
  this.country = options.Country;
  this.awards = options.Awards;
  this.poster = options.Poster;
  this.metascore = options.Metascore;
  this.rating = options.imdbRating;
  this.type = options.Type;
  this.dvd = options.DVD;
  this.boxOffice = options.boxOffice;
  this.production = options.production;
}

var apiRootUrl = "https://ancient-caverns-16784.herokuapp.com/movies/";

Movie.prototype.getMovieDetails = function (movieId) {
  var that = this;
  return $.ajax({
    url: apiRootUrl + movieId,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    that.id = response._id;
    that.title = response.Title;
    that.year = response.Year;
    that.rated = response.Rated;
    that.runtime = response.Runtime;
    that.genre = response.Genre;
    that.director = response.Director;
    that.writer = response.Writer;
    that.actors = response.Actors;
    that.plot = response.Plot;
    that.language = response.Language;
    that.country = response.Country;
    that.awards = response.Awards;
    that.poster = response.Poster;
    that.metascore = response.Metascore;
    that.rating = response.imdbRating;
    that.type = response.Type;
    that.dvd = response.DVD;
    that.boxOffice = response.BoxOffice;
    that.production = response.Production;
    return that
  });
};

Movie.prototype.updateMovieDetails = function () {
  var that = this
  console.log("something", that, this)
  return $.ajax({
    url: apiRootUrl + that.id,
    method: "PUT",
    headers: { 
      "X-Auth-Token": getAccessToken() 
    },
    data: {
      Title: that.title,
      Year: that.year,
      Rated: that.rated,
      Runtime: that.runtime,
      Genre: that.genre,
      Director: that.director,
      Writer: that.writer,
      Actors: that.actors,
      Plot: that.plot,
      Language: that.language,
      Country: that.country,
      Awards: that.awards,
      Poster: that.poster,
      Metascore: that.metascore,
      imdbRating: that.rating,
      Type: that.type,
      DVD: that.dvd,
      BoxOffice: that.boxOffice,
      Production: that.production
    }
  })
}