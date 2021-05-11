 import React, { useState, useEffect } from 'react';
 import { useLocation } from 'react-router-dom';
 import api from '../utils/api';

 const Context = React.createContext();

 export const ContextProvider = props => {

    //get path to pass to API calls
    let path = useLocation().pathname.substring(1);

    //setting movie state so movies can be displayed on the homepage
    const [movies, setMovies] = useState([{
        id: '',
        title: '',
        image: '',
        overview: '',
    }]);

    //make api call to get the movie data that will display on the homepage and use to update the movies state. 
    useEffect(() => {
        let moviesArr = [];
        let getMovie = async() => {
            try{
                let response = await api.getMovie();
                for(let i = 0; i < 3; i++){
                    let movie = {
                        id: response.data.results[i].id,
                        title: response.data.results[i].title,
                        image: response.data.results[i].poster_path,
                        overview: response.data.results[i].overview,
                    }
                moviesArr.push(movie);
            }
                //console.log(moviesArr);
                value.actions.setMovies(moviesArr);

            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    }, []);

    //This state will control what is rendered on the movie details page. 
    const [movieDetails, setMovieDetails] = useState({
        title: '',
        overview: '',
        runningTime: '',
        rating: '',
        director: '',
        actors: [],
        reviews: [],
        image: '',
    });

    //make api calls to get detailed movie info. 
    useEffect(() => {
        let getMovieDetails = async() => {
            try{
                let director;
                let actors = [];
                let reviews = [];
                let detailResponse = await api.getMovieDetail(path);
                let castResponse = await api.getMovieCastAndCrew(path);
                let reviewsResponse = await api.getMovieReviews(path);
                
                //loop over the movie cast and if the job title is 'Director', save response to director variable.
                for (let i = 0; i < castResponse.data.crew.length; i++){
                    if(castResponse.data.crew[i].job === 'Director')
                        director = castResponse.data.crew[i].name
                }
                
                //loop over the movie cast and display the first five. If there is less than 5, then display what is available. 
                //Conditional prevents page from breaking if there are no cast members listed in the db. 
                if (castResponse.data.cast.length !== 0){ 
                    for(let i = 0; i < castResponse.data.cast.length && i < 5; i++){
                        actors.push(castResponse.data.cast[i].name)
                    }
                }

                //loop over the movie reviews and display the first two. If there is less than 2, then display what is available. 
                //Conditional prevents page from breaking if there are no reviews listed in the db. 
                if(reviewsResponse.data.results.length !== 0){
                    for(let i = 0; i < reviewsResponse.data.results.length && i < 2; i++){
                    let movieReview = [
                        reviewsResponse.data.results[i].content,
                    ]
                     reviews.push(movieReview)
                     } 
                }
                 
                //save the response information to the movieDetails variable and use to update the movieDetails state. 
                let movieDetails = {
                    title: detailResponse.data.title ? detailResponse.data.title : null,
                    overview: detailResponse.data.overview ? detailResponse.data.overview : null,
                    runningTime: detailResponse.data.runtime ? detailResponse.data.runtime : null,
                    rating: detailResponse.data.vote_average ? detailResponse.data.vote_average : null,
                    director: director,
                    actors: actors,
                    image: detailResponse.data.poster_path,
                    reviews: reviews 
                    };
                setMovieDetails(movieDetails);  
            } catch (error) {
                console.log(error);
            }
        }
        getMovieDetails();
    }, [path])

    //state to render the search results when a user searches for a movie title.
    const [searchResults, setSearchResults] = useState([{
        id: '',
        title: '',
        year: '',
        image: '',
    }]);

    //state to render the upcoming movies 3 months rolling. 
    const [ upcoming, setUpcoming ] = useState([{
        id: '',
        title: '', 
        release: ''
    }]);

    //displays 4 upcoming movies 3 months rolling. 
	useEffect(() => {
        const getPremiers = async () => {
            let movieList = [];
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            let d = new Date();
            //Formats the first and last day of the first, second, and third months which will be passed into the api calls
			let firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let lastDay = new Date(d.getFullYear(), d.getMonth() + 1 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let nextFirstDay = new Date(d.getFullYear(), d.getMonth() + 1, 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let nextLastDay = new Date(d.getFullYear(), d.getMonth() + 2 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let finalFirstDay = new Date(d.getFullYear(), d.getMonth() + 2, 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let finalLastDay = new Date(d.getFullYear(), d.getMonth() + 3 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			try {
                //api calls to obtain list of 4 movies from each of the 3 upcoming months. 
				let response = await api.getUpcomingMovies(firstDay, lastDay);
					for (let i = 0; i < 4; i++) {
						let movie = {
							id: response.data.results[i].id,
							title: response.data.results[i].title,
							release: response.data.results[i].release_date
						}
						movieList.push(movie);
					}
				let response2 = await api.getUpcomingMovies(nextFirstDay, nextLastDay);
					for (let i = 0; i < 4; i++) {
					let movie = {
						id: response2.data.results[i].id,
						title: response2.data.results[i].title,
						release: response2.data.results[i].release_date
					}
					movieList.push(movie);
				}
				let response3 = await api.getUpcomingMovies(finalFirstDay, finalLastDay);
					for (let i = 0; i < 4; i++) {
						let movie = {
							id: response3.data.results[i].id,
							title: response3.data.results[i].title,
							release: response3.data.results[i].release_date
						}
						movieList.push(movie);
                    }
                    //update state with the movieList array which currently stores all of the upcoming movies. 
				await setUpcoming(movieList);
			} catch (error) {
				console.log(error);
			}
		}
    	getPremiers();
    }, [])

    const [buttonCount, setButtonCount] = useState();

    const value = {
        movies,
        movieDetails,
        searchResults,
        upcoming,
        buttonCount,
        actions: {
            setMovies,
            setMovieDetails,
            setSearchResults,
            setUpcoming,
            setButtonCount,
        }
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;