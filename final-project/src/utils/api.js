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
      },

    //  getMovieInfo: async (path) => {
    //     const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}?api_key=${apiKey}&language=en-US&append_to_response=credits,reviews`);
    //    // console.log(response);
    //     return response;
    //  },

     getSearchResults: async(search) => {
         const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1&include_adult=false}`);
         return response;
     }
 }