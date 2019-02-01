var movies = new Movies();

getMovies();
function getMovies() {
  movies.getMovies(12, 0).then(function () {
    displayMovies(movies.items);
    console.log(movies.items)
  });
}

var template = document.getElementById("template");
function displayMovies(response) {
  var moviesContainer = document.getElementById("movies");
  for (var i = 0; i < response.length; i++) {

    var movieClone = template.cloneNode(true);

    movieClone.id = "movie_" + response[i].id;
    movieClone.classList.add('mov');

    var movieTitleElement = movieClone.querySelector(".movie-title");
    movieTitleElement.innerHTML = response[i].title;

    let movie = response[i];
    movieTitleElement.addEventListener("click", function (event) {

      getMovieDetails(event.target, movie);
      window.open("./movieDetails.html?id=" + movie.id,
        '_blank');
    })
    var imageUrl = movieClone.querySelector(".myImage");
    if (response[i].poster == 'N/A' || response[i].poster == '') {
      imageUrl.setAttribute("src", '../movie-default-image.jpg');
    } else {
      imageUrl.setAttribute("src", response[i].poster);
    }

    var movieRatingElement = movieClone.querySelector(".rating");
    if (response[i].rating) {
      movieRatingElement.innerHTML = `Imdb score: ` + response[i].rating;
    }

    var deleteButton = movieClone.querySelector(".movie-delete");
    var confirmDialog = document.getElementById('confirm-dialog');
    deleteButton.addEventListener("click", function (event) {
      var grandpa = event.target.parentNode.parentNode.parentNode;
      var grandpaId = grandpa.id;
      var movieId = grandpaId.replace("movie_", "");
      confirmDialog.showModal();
      if (confirmDialog.open) {
        var cancelConfirmDialogBtn = document.getElementById('cancel-confirm-dialog');
        cancelConfirmDialogBtn.addEventListener('click', function (event) {
          event.preventDefault();
          confirmDialog.close();
        })
        var confirmDelete = document.getElementById("confirmDelete");
        confirmDelete.addEventListener("click", function (event) {
          event.preventDefault();
          movies.deleteMovie(movieId).then(function () {
            confirmDialog.close();
            removeExistentMovies();
            document.getElementById('succes-alert-delete-movie').style.display = 'block';
            hideAlert('succes-alert-delete-movie');
            movies.getMovies(12, 0).then(function () {
              displayMovies(movies.items);
            });
          });
        })
      }
    })

    var editButton = movieClone.querySelector(".movie-edit");
    editButton.addEventListener("click", editMovie);

    moviesContainer.appendChild(movieClone);
  }

  if (movies.numberOfPages > 1) {
    if (categoryDropDown.value && searchInput.value) {
      addPagination(categoryDropDown.value, searchInput.value);
    } else {
      addPagination();
    }
  }

  template.remove();
}

var categoryDropDown = document.getElementById('search-category');
var searchInput = document.getElementById('movie-search');
var searchBtn = document.getElementById('search-button');
searchBtn.addEventListener("click", searchMovie);

function searchMovie() {
  var selectedCategory = categoryDropDown.value;
  var searchInputValue = searchInput.value;
  if (searchInputValue) {
    removeExistentMovies();
    movies.getMovies(12, 0, selectedCategory, searchInputValue).then(function () {
      displayMovies(movies.items);
    });
  } else {
    searchInput.style.border = '2px solid red';
  }
}

function removeExistentMovies() {
  var movieDiv = document.getElementsByClassName('mov');
  while (movieDiv[0]) {
    movieDiv[0].parentNode.removeChild(movieDiv[0]);
  }
  var anchorPageNb = document.getElementsByClassName('anchor-page-nb');
  while (anchorPageNb[0]) {
    anchorPageNb[0].parentNode.removeChild(anchorPageNb[0]);
  }
}

categoryDropDown.addEventListener('change', function () {
  searchInput.style.border = 'none';
  searchInput.value = '';
  removeExistentMovies();
  getMovies();
})

var clearSearchBtn = document.getElementById('clear-search');
clearSearchBtn.addEventListener('click', function () {
  searchInput.style.border = 'none';
  searchInput.value = '';
  removeExistentMovies();
  getMovies();
})


function addPagination(category, searchValue) {
  var pagination = document.getElementById('pagination');
  let anchor;
  var firstPageBtn = document.createElement('a');
  firstPageBtn.innerHTML = '&laquo';
  firstPageBtn.className = 'anchor-page-nb firstPage';
  firstPageBtn.addEventListener('click', function () {
    removeExistentMovies();
    movies.getMovies(12, 0, category, searchValue).then(function () {
      displayMovies(movies.items);
      var firstBtn = document.getElementsByClassName('firstPage')[0];
      document.getElementsByClassName('anchor-page-nb')[1].classList.remove("active");
      firstBtn.className += ' active';
    });
  });
  pagination.appendChild(firstPageBtn);

  for (var i = 1; i <= movies.numberOfPages; i++) {
    anchor = document.createElement('a');
    anchor.innerHTML = i;
    anchor.className = 'anchor-page-nb';
    pagination.appendChild(anchor);
  }
  document.getElementsByClassName('anchor-page-nb')[1].className += ' active';

  Array.from(document.querySelectorAll('.anchor-page-nb:not(.firstPage)')).forEach(function (anchor, index) {
    anchor.addEventListener('click', function (event) {
      removeExistentMovies();
      movies.getMovies(12, (index) * 12, category, searchValue).then(function () {
        displayMovies(movies.items);
        var anchors = document.getElementsByClassName('anchor-page-nb');
        for (var i = 0; i < anchors.length; i++) {
          if (anchors[i].innerHTML === (index + 1).toString()) {
            document.getElementsByClassName('anchor-page-nb')[1].classList.remove("active");
            anchors[i].className += ' active';
          }
        }
      });
    });
  });

  var lastPageBtn = document.createElement('a');
  lastPageBtn.innerHTML = '&raquo;';
  lastPageBtn.className = 'anchor-page-nb lastPage';
  lastPageBtn.addEventListener('click', function () {
    removeExistentMovies();
    movies.getMovies(12, (movies.numberOfPages - 1) * 12, category, searchValue).then(function () {
      displayMovies(movies.items);
      var lastBtn = document.getElementsByClassName('lastPage')[0];
      document.getElementsByClassName('anchor-page-nb')[1].classList.remove("active");
      lastBtn.className += ' active';
    });
  });
  pagination.appendChild(lastPageBtn);
}

var addMovieBtn = document.getElementById('add-movie-button');
var addDialog = document.getElementById('add-dialog');
addMovieBtn.addEventListener('click', function () {
  addDialog.showModal();
  if (addDialog.open) {
    var cancelDialogBtn = document.getElementById('cancel-dialog');
    cancelDialogBtn.addEventListener('click', function (event) {
      event.preventDefault();
      addDialog.close();
      document.getElementById('add-movie-form').reset();
      titleNewMovie.style.border = '1px solid #ccc';
      genreNewMovie.style.border = '1px solid #ccc';
      yearNewMovie.style.border = '1px solid #ccc';
      runtimeNewMovie.style.border = '1px solid #ccc';
    })
  }
})

var addNewMovieBtn = document.getElementById("addNewMovieBtn");
addNewMovieBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addMovie();
});

var titleNewMovie = document.getElementById("title");
var genreNewMovie = document.getElementById("genre");
var yearNewMovie = document.getElementById("year");
var runtimeNewMovie = document.getElementById("runtime");

function addMovie() {
  var posterNewMovie = document.getElementById("poster");
  var typeNewMovie = document.getElementById("type");
  var languageNewMovie = document.getElementById("language");
  var countryNewMovie = document.getElementById("country");
  var imdbRatingNewMovie = document.getElementById("imdb-rating");
  var imdbVotesNewMovie = document.getElementById("imdb-votes");
  var imdbIdNewMovie = document.getElementById("imdb-id");

  if (titleNewMovie.value && genreNewMovie.value && yearNewMovie.value && runtimeNewMovie.value) {
    movies.addMovieRequest(
      titleNewMovie,
      posterNewMovie,
      genreNewMovie,
      typeNewMovie,
      yearNewMovie,
      runtimeNewMovie,
      languageNewMovie,
      countryNewMovie,
      imdbRatingNewMovie,
      imdbVotesNewMovie,
      imdbIdNewMovie
    ).then(
      function (response) {
        addDialog.close();
        document.getElementById('succes-alert-add-movie').style.display = 'block';
        hideAlert('succes-alert-add-movie');
        document.getElementById('add-movie-form').reset();
        removeExistentMovies();
        movies.getMovies(12, 0).then(function () {
          displayMovies(movies.items);
        });
      },
      function (error) {
        displayError(error);
      }
    );
  } else {
    if (titleNewMovie.value == '') {
      titleNewMovie.style.border = '2px solid red';
      titleNewMovie.addEventListener('keyup', function () {
        titleNewMovie.style.border = '1px solid #ccc';
      })
    }
    if (genreNewMovie.value == '') {
      genreNewMovie.style.border = '2px solid red';
      genreNewMovie.addEventListener('keyup', function () {
        genreNewMovie.style.border = '1px solid #ccc';
      })
    }
    if (yearNewMovie.value == '') {
      yearNewMovie.style.border = '2px solid red';
      yearNewMovie.addEventListener('keyup', function () {
        yearNewMovie.style.border = '1px solid #ccc';
      })
    }
    if (runtimeNewMovie.value == '') {
      runtimeNewMovie.style.border = '2px solid red';
      runtimeNewMovie.addEventListener('keyup', function () {
        runtimeNewMovie.style.border = '1px solid #ccc';
      })
    }
  }
}

function editMovie(event) {
  var editDialog = document.getElementById("edit-movie-dialog")
  var source = event.target.parentNode.parentNode.parentNode;
  var sourceId = source.id
  var movieId = sourceId.replace("movie_", "");
  var movie = new Movie();

  movie.getMovieDetails(movieId).then(function (response) {
    console.log(response)
    var inputTitle = document.querySelector(".editTitle");
    if (!response.title) {
      inputTitle.value = '';
    } else {
      inputTitle.value = response.title;
    }

    var inputYear = document.querySelector(".editYear");
    inputYear.value = response.year;

    var inputRated = document.querySelector(".editRated");
    console.log(response.rated)
    if (response.rated === 'undefined') {
      console.log('rated')
      inputRated.value = '';
    } else {
      console.log('not')
      inputRated.value = response.rated;
    }

    var inputRuntime = document.querySelector(".editRuntime");
    if (inputRuntime === 'undefined') {
      inputRuntime.value = '';
    } else {
      inputRuntime.value = response.runtime;
    }

    var inputGenre = document.querySelector(".editGenre");
    if (response.genre === 'undefined') {
      inputGenre.value = '';
    } else {
      inputGenre.value = response.genre;
    }

    var inputDirector = document.querySelector(".editDirector");
    if (response.director === 'undefined') {
      inputDirector.value = '';
    } else {
      inputDirector.value = response.director;
    }

    var inputWriter = document.querySelector(".editWriter");
    if (response.writer === 'undefined') {
      inputWriter.value = '';
    } else {
      inputWriter.value = response.writer;
    }

    var inputActors = document.querySelector(".editActors");
    if (response.actors === 'undefined') {
      inputActors.value = '';
    } else {
      inputActors.value = response.actors;
    }


    var inputPlot = document.querySelector(".editPlot");
    if (response.plot === 'undefined') {
      inputPlot.value = '';
    } else {
      inputPlot.value = response.plot;
    }

    var inputLanguage = document.querySelector(".editLanguage");
    if (response.language === 'undefined') {
      inputLanguage.value = '';
    } else {
      inputLanguage.value = response.language;
    }

    var inputCountry = document.querySelector(".editCountry");
    if (response.country === 'undefined') {
      inputCountry.value = '';
    } else {
      inputCountry.value = response.country;
    }

    var inputAwards = document.querySelector(".editAwards");
    if (response.awards === 'undefined') {
      inputAwards.value = '';
    } else {
      inputAwards.value = response.awards;
    }

    var inputPoster = document.querySelector(".editPoster");
    if (response.poster === 'undefined') {
      inputPoster.value = '';
    } else {
      inputPoster.value = response.poster;
    }

    var inputMetascore = document.querySelector(".editMetascore");
    if (response.metascore === 'undefined') {
      inputMetascore.value = '';
    } else {
      inputMetascore.value = response.metascore;
    }

    var inputRating = document.querySelector(".editRating");
    if (response.rating === 'undefined') {
      inputRating.value = '';
    } else {
      inputRating.value = response.rating;
    }

    var inputType = document.querySelector(".editType");
    if (response.type === 'undefined') {
      inputType.value = '';
    } else {
      inputType.value = response.type;
    }

    var inputDvd = document.querySelector(".editDvd");
    if (response.dvd === 'undefined') {
      inputDvd.value = '';
    } else {
      inputDvd.value = response.dvd;
    }

    var inputBoxOffice = document.querySelector(".editBoxoffice");
    if (response.boxOffice === 'undefined') {
      inputBoxOffice.value = '';
    } else {
      inputBoxOffice.value = response.boxOffice;
    }

    var inputProduction = document.querySelector(".editProduction");
    if (response.production === 'undefined') {
      inputProduction.value = '';
    } else {
      inputProduction.value = response.production;
    }
    editDialog.showModal();
  })


  var updateButton = document.querySelector(".submit-updates")
  updateButton.addEventListener('click', function (event) {
    event.preventDefault();
    var inputTitle = document.querySelector(".editTitle");
    var inputYear = document.querySelector(".editYear");
    var inputRated = document.querySelector(".editRated");
    var inputRuntime = document.querySelector(".editRuntime");
    var inputGenre = document.querySelector(".editGenre");
    var inputDirector = document.querySelector(".editDirector");
    var inputWriter = document.querySelector(".editWriter");
    var inputActors = document.querySelector(".editActors");
    var inputPlot = document.querySelector(".editPlot");
    var inputLanguage = document.querySelector(".editLanguage");
    var inputCountry = document.querySelector(".editCountry");
    var inputAwards = document.querySelector(".editAwards");
    var inputPoster = document.querySelector(".editPoster");
    var inputMetascore = document.querySelector(".editMetascore");
    var inputRating = document.querySelector(".editRating");
    var inputType = document.querySelector(".editType");
    var inputDvd = document.querySelector(".editDvd");
    var inputBoxOffice = document.querySelector(".editBoxoffice");
    var inputProduction = document.querySelector(".editProduction");

    var movie = new Movie({
      _id: movieId,
      Title: inputTitle.value,
      Year: inputYear.value,
      Rated: inputRated.value,
      Runtime: inputRuntime.value,
      Genre: inputGenre.value,
      Director: inputDirector.value,
      Writer: inputWriter.value,
      Actors: inputActors.value,
      Plot: inputPlot.value,
      Language: inputLanguage.value,
      Country: inputCountry.value,
      Awards: inputAwards.value,
      Poster: inputPoster.value,
      Metascore: inputMetascore.value,
      Rating: inputRating.value,
      Type: inputType.value,
      DVD: inputDvd.value,
      boxOffice: inputBoxOffice.value,
      production: inputProduction.value
    });
    movie.updateMovieDetails().then(function () {


      editDialog.close();
      document.querySelector(".edit-movie-form").reset();
      document.getElementById('succes-alert-edit-movie').style.display = 'block';
      hideAlert('succes-alert-edit-movie');
      removeExistentMovies();
      movies.getMovies(12, 0).then(function () {
        displayMovies(movies.items);
        console.log(movies.items)
      });
    })
  })

  var closeButton = document.querySelector(".modal-close");
  closeButton.onclick = function (event) {
    event.preventDefault();
    editDialog.close();
    document.querySelector(".edit-movie-form").reset()
  }

  window.onclick = function (event) {
    if (event.target == editDialog) {
      editDialog.close();
    }
  }
}

function getMovieDetails(clickedButton, movieObject) {
  var grandpa = clickedButton.parentNode.parentNode;
  var grandpaId = grandpa.id;
  var movieId = grandpaId.replace("movie_", "");

  movieObject.getMovieDetails(movieId).then(
    function (response) {
      displayMovieDetails(response);
      console.log(response)
    },
    function (error) {
      displayError(error);
    }
  );
}

function displayError(error) {
  console.log("ADD movie request was rejected with status ",
    error.status);
}

var loginBtn = document.getElementById('loginBtn');
var loginDialog = document.getElementById('login-dialog');
loginBtn.addEventListener('click', function () {
  loginDialog.showModal();
  if (loginDialog.open) {
    var cancelLoginDialogBtn = document.getElementById('cancel-login-dialog');
    cancelLoginDialogBtn.addEventListener('click', function (event) {
      event.preventDefault();
      loginDialog.close();
      document.getElementById('login-form').reset();
      document.getElementById('usernameLoginError').style.display = 'none';
      document.getElementById('usernameLoginWrong').style.display = 'none';
      document.getElementById('passwordLoginError').style.display = 'none';
      document.getElementById('passwordLoginWrong').style.display = 'none';
    })
  }
})

var registerBtn = document.getElementById('registerBtn');
var registerDialog = document.getElementById('register-dialog');
registerBtn.addEventListener('click', function () {
  registerDialog.showModal();
  if (registerDialog.open) {
    var cancelRegisterDialogBtn = document.getElementById('cancel-register-dialog');
    cancelRegisterDialogBtn.addEventListener('click', function (event) {
      event.preventDefault();
      registerDialog.close();
      document.getElementById('register-form').reset();
      document.getElementById('usernameRegisterError').style.display = 'none';
      document.getElementById('takenUsername').style.display = 'none';
      document.getElementById('emailError').style.display = 'none';
      document.getElementById('emailValidError').style.display = 'none';
      document.getElementById('passwordRegisterError').style.display = 'none';
      document.getElementById('rePasswordRegisterError').style.display = 'none';
      document.getElementById('passwordRegisterMatch').style.display = 'none';
    })
  }
})

displayButtonsAfterLogin();
function displayButtonsAfterLogin() {
  var username = localStorage.getItem('username');
  if (getAccessToken()) {
    displayButtons(username);
  }
}

function displayButtons(username) {
  document.getElementById('logged-in').style.display = 'block';
  document.getElementById('logged-in').innerHTML = `<p>You are logged in as<strong><i>${username}</i></strong>!</p>`;
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('registerBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'block';
  document.getElementById('add-movie-button').style.display = 'block';

  Array.from(document.getElementsByClassName('movie-edit')).forEach(function (btn) {
    btn.style.display = 'block';
  });

  Array.from(document.getElementsByClassName('movie-delete')).forEach(function (btn) {
    btn.style.display = 'block';
  });
}

function hideButtonsAfterLogout() {
  document.getElementById('logged-in').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('registerBtn').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('add-movie-button').style.display = 'none';

  Array.from(document.getElementsByClassName('movie-edit')).forEach(function (btn) {
    btn.style.display = 'none';
  });

  Array.from(document.getElementsByClassName('movie-delete')).forEach(function (btn) {
    btn.style.display = 'none';
  });
}

function hideAlert(alertId) {
  $(`#${alertId}`).fadeTo(2000, 500).slideUp(500, function () {
    $(`#${alertId}`).slideUp(500);
  });
}