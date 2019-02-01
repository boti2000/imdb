function getAccessToken() {
    return localStorage.getItem('AccesToken');
}

function Movies() {
    this.items = [];
    this.numberOfPages = 0;
    this.currentPage = 0;
}

var movieUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
Movies.prototype.getMovies = function (take, skip, category, searchParam) {
    var me = this;
    var urlMoviesPaginated;
    if (!category || !searchParam) {
        urlMoviesPaginated = movieUrl + `?take=${take}&skip=${skip}`;
    } else {
        urlMoviesPaginated = movieUrl + `?${category}=${searchParam}&take=${take}&skip=${skip}`;
    }
    return $.get(urlMoviesPaginated).then(function (response) {
        me.items = [];
        for (var i = 0; i < response.results.length; i++) {
            var movie = new Movie(response.results[i]);
            me.items.push(movie);
        }
        me.numberOfPages = response.pagination.numberOfPages;
        me.currentPage = response.pagination.currentPage;
    },
        function (error) {
            console.log(
                "GET movies request was rejected with status ",
                error.status
            );
        })
};

Movies.prototype.addMovieRequest = function (
    title,
    poster,
    genre,
    type,
    year,
    runtime,
    language,
    country,
    imdbRating,
    imdbVotes,
    imdbId
) {
    return $.ajax({
        url: movieUrl,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': getAccessToken()
        },
        data: {
            Title: title.value,
            Poster: poster.value,
            Genre: genre.value,
            Type: type.value,
            Year: year.value,
            Runtime: runtime.value,
            Language: language.value,
            Country: country.value,
            imdbRating: imdbRating.value,
            imdbVotes: imdbVotes.value,
            imdbID: imdbId.value
        }
    })
}

Movies.prototype.deleteMovie = function (movieId) {
    return $.ajax({
        headers: {
            'X-Auth-Token': getAccessToken()
        },
        url: movieUrl + '/' + movieId,
        method: "DELETE",
    });
}
