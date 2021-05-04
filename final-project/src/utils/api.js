 import axios from 'axios';

//Required API key from the .env file. 
require("dotenv").config();

const apiKey = process.env.REACT_APP_API_KEY;


 //API REQUESTS
 // eslint-disable-next-line

 export default {
     getMovie: async () => {
         const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
         return response;
     },

    
     getMovieDetail: async (path) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}?api_key=${apiKey}&language=en-US`);
        return response; 
     },

     getMovieCastAndCrew: async (path) => {
         const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}/credits?api_key=${apiKey}&language=en-US`);
         return response;
     },

     getMovieReviews: async (path) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}/reviews?api_key=${apiKey}&language=en-US&page=1`);
        return response;
     }
 }