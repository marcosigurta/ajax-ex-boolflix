
function showDetails() {
    $(document).on('click', '.movie', function () {

        $(this).find('.movieContent').toggle().addClass('opacityON');

    });

    $(document).on('mouseleave', '.movie', function () {

        $(this).find('.movieContent').hide();
    });
};

function addAjaxCall() {

    var target = $('#btn')

    target.click(getDatas);

    target.click(function () {

        var leftPos = $('#movieContainer').scrollLeft();
        $("#movieContainer").animate({ scrollLeft: leftPos - 10000 }, 300);

        var leftPos = $('#seriesContainer').scrollLeft();
        $("#seriesContainer").animate({ scrollLeft: leftPos - 10000 }, 300);
    });

};

function getDatas() {

    var target = $('#search');
    var query = target.val();

    if (query !== '') {

        $('main').show();
        getData(query);
        getSeries(query);
        target.val('');

    }


    console.log(query);

};

function getSeries(query) {

    $.ajax({


        url: 'https://api.themoviedb.org/3/search/tv',
        method: "GET",
        data: {
            'api_key': '9c26a94876af3046fb5408ed8ff332e3',
            'query': query
        },

        success: function (data) {

            var series = data['results'];




            var target = $('#seriesContainer');

            target.html('');

            var template = $('#series-template').html();
            var compiled = Handlebars.compile(template);


            for (let i = 0; i < series.length; i++) {


                var serie = series[i];

                var over = serie['overview'];

                var le = over.length;

                if (le > 0) {

                    serie.over = over.substring(0, 300);

                    if (le > 350) {
                        serie.over = over.substring(0, 300) + '<span>[...]</span>';
                    }

                }

                var vote = serie['vote_average'];
                var lang = serie['original_language'];

                serie.stars = getStars(vote);
                serie.lang = getLang(lang);


                var serieHTML = compiled(serie);
                target.append(serieHTML);

            };
        },

        error: function (err) {

            console.log('err', err);
        }


    });
};

function getData(query) {


    $.ajax({


        url: 'https://api.themoviedb.org/3/search/movie',
        method: "GET",
        data: {
            'api_key': '9c26a94876af3046fb5408ed8ff332e3',
            'query': query
        },

        success: function (data) {

            var movies = data['results'];

            var target = $('#movieContainer');

            target.html('');


            var template = $('#movie-template').html();
            var compiled = Handlebars.compile(template);


            for (let i = 0; i < movies.length; i++) {

                var movie = movies[i];

                var over = movie['overview'];

                var le = over.length;

                if (le > 0) {

                    movie.over = over.substring(0, 300);

                    if (le > 350) {
                        movie.over = over.substring(0, 300) + '<span>[...]</span>';
                    }

                };

                var vote = movie['vote_average'];
                var lang = movie['original_language'];

                movie.stars = getStars(vote);
                movie.lang = getLang(lang);


                var movieHTML = compiled(movie);
                target.append(movieHTML);

            };
        },

        error: function (err) {

            console.log('err', err);
        }


    });
};

function getStars(vote) {

    vote = Math.ceil(vote / 2);
    var voteHTML = '';

    for (let j = 0; j < 5; j++) {

        if (j < vote) {

            voteHTML += '<i class="fa fa-star"></i>'

        } else {

            voteHTML += '<i class="far fa-star"></i>'
        }
    };

    return voteHTML;
};

function getLang(lang) {


    if (lang === 'it' || lang === 'en') {

        lang = `<img src="img/${lang}.png" alt="">`;

    } else {

        lang = lang;
    };

    return lang;



};

function leftScroll() {

    $("#iMovieLeft").click(function () {
        var leftPos = $('#movieContainer').scrollLeft();
        $("#movieContainer").animate({ scrollLeft: leftPos - 1000 }, 300);
    });

    $("#iMovieRight").click(function () {
        var leftPos = $('#movieContainer').scrollLeft();
        $("#movieContainer").animate({ scrollLeft: leftPos + 1000 }, 300);
    });


    $("#iSeriesLeft").click(function () {
        var leftPos = $('#seriesContainer').scrollLeft();
        $("#seriesContainer").animate({ scrollLeft: leftPos - 1000 }, 300);
    });

    $("#iSeriesRight").click(function () {
        var leftPos = $('#seriesContainer').scrollLeft();
        $("#seriesContainer").animate({ scrollLeft: leftPos + 1000 }, 300);
    });

};





function init() {
    leftScroll();
    addAjaxCall();
    showDetails();
}

$(document).ready(init);
