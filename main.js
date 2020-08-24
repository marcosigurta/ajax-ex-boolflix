function searchMovie() {
    var target = $('#btn-search');
    target.click(getMovie);
}

function getMovie() {
    var target = $('#search');
    var query = target.val();

    $.ajax({

        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {

            'api_key': '79046421d59752f7368909444ae124d0',
            'query': query
        },

        success: function (data) {
            var movies = data['results'];

            var target = $('#results');
            target.text('');
            var template = $('#template').html();
            var compiled = Handlebars.compile(template);

            for (var i = 0; i < movies.length; i++) {
                var movie = movies[i];
                var vote = movie['vote_average'];

                vote = Math.ceil(vote / 2);
                var voteHTML = '';
                
                var poster = movie['poster_path'];
                movie.poster = getPosterHTML(poster);

                for (j = 0; j < 5; j++) {
                    if (j < vote) {
                        voteHTML += '<i class="fas fa-star" />'
                    } else {
                        voteHTML += '<i class="far fa-star" />'
                    }
                }

                movie.stars = voteHTML;

                var lang = movie['original_language'];
                if (lang === 'it' || lang === 'en') {
                    movie.flag = `<img class="flag" src="img/${lang}.png">`;

                } else {
                    movie.flag = lang;
                }


                var movieHTML = compiled(movie);
                target.append(movieHTML)
            }
        }

    })
}

function getPosterHTML(poster) {

};



function init() {
    searchMovie();
}


$(document).ready(init);