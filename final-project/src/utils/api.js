 import axios from 'axios';

//Required API key from the .env file. 
require("dotenv").config();

const apiKey = process.env.REACT_APP_API_KEY;
const url = 'http://localhost:5000/api/'


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

     getSearchResults: async(search, page) => {
         const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=false}`);
         return response;
     },

     getUpcomingMovies: async(firstDay, lastDay) => {
         const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&primary_release_date.gte=${firstDay}&primary_release_date.lte=${lastDay}&with_release_type=3%7C2`);
         return response;
     },

     getTvAiringToday: async() => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1-5`);
        return response;
     },

     getUser: async (path, email, password) => {
        const decodedPassword = atob(password);
        const response = await axios.get(`${url}${path}`, {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
        return response;
    },

     postCreateUser: async (path, firstName, lastName, emailAddress, password) => {

        const response = await axios.post(`${url}${path}`, {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password
        });
        return await response;

    },

 }