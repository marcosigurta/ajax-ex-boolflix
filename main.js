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
            var template = $('#template').html();
            var compiled = Handlebars.compile(template); 

            for (var i = 0; i < movies.length; i++) {
                var movie = movies[i];

                var movieHTML = compiled({
                    titolo: movie['title'],
                    img: movie['poster_path']
                });
                target.append(movieHTML)
            }
        }
        
   })
}








function init() {
    searchMovie();
}


$(document).ready(init);