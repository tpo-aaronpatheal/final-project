 import React, { useState, useEffect } from 'react';
 import { useLocation } from 'react-router-dom';
 import api from '../utils/api';

 const Context = React.createContext();

 export const ContextProvider = props => {

    //get path to pass to API calls
    let path = useLocation().pathname.substring(1);

    const [movies, setMovies] = useState([{
        id: '',
        title: '',
        image: '',
        overview: '',
    }]);

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

    useEffect(() => {
        let getMovieDetails = async() => {
            try{
                let director;
                let actors = [];
                let reviews = [];
                let detailResponse = await api.getMovieDetail(path);
                let castResponse = await api.getMovieCastAndCrew(path);
                let reviewsResponse = await api.getMovieReviews(path);
                
                for (let i = 0; i < castResponse.data.crew.length; i++){
                    if(castResponse.data.crew[i].job === 'Director')
                        director = castResponse.data.crew[i].name
                }
                
                for(let i = 0; i < 5; i++){
                    actors.push(castResponse.data.cast[i].name)
                }

                 for(let i = 0; i < 2; i++){
                     if(reviewsResponse.data.results.length !== 0){
                     let movieReview = [
                        reviewsResponse.data.results[i].content,
                     ]
                     reviews.push(movieReview)
                     } 
                }
                    
                let movieDetails = {
                    title: detailResponse.data.title,
                    overview: detailResponse.data.overview,
                    runningTime: detailResponse.data.runtime,
                    rating: detailResponse.data.vote_average,
                    director: director,
                    actors: actors,
                    image: detailResponse.data.poster_path,
                    reviews: reviews 
                    };
                console.log(movieDetails);
                setMovieDetails(movieDetails);  
            } catch (error) {
                console.log(error);
            }
        }
        getMovieDetails();
    }, [path])


    const value = {
        movies,
        movieDetails,
        actions: {
            setMovies,
            setMovieDetails,
        }
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;