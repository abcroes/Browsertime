var React = require('react'),
    Stars = require('../components/Stars'),
    MovieItem = require('../components/MovieItem')

var Movie = React.createClass({

    getInitialState: function() {
        return {
            movies: [],
            isLoaded: false
        };
    },

    componentDidMount: function() {
        $.get('/api/movies', function(result) {
            if (this.isMounted()) {
                this.setState({
                    movies: result,
                    isLoaded: true
                });
            }
        }.bind(this));
    },

	render: function() {
        console.log(this.state.movies)
		return (
            <div className="container top">
                <div className="row">
                {
                    !this.state.isLoaded ?
                        <img className="col-md-offset-5 col-md-2 col-xs-offset-5 col-xs-2" src="http://placehold.it/300x300" />
                    : this.state.movies.map(function(movie, i){
                        var moviesUrl = "/movies" + movie.url.slice(0, -1);
                        return (<MovieItem className="col-md-2 col-xs-4" cover={movie.images[0]} title={movie.title} rating={movie.rating} url={moviesUrl} />)
                    })
                }
                </div>
            </div>
		);
	}
});

module.exports = Movie;
