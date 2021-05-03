 import axios from 'axios';

 //const url = 'https://api.themoviedb.org/3/movie/550?api_key=558a544a861d63ace61234363095de4d';

 //API REQUESTS
 // eslint-disable-next-line

 export default {
     getMovie: async () => {
         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=558a544a861d63ace61234363095de4d&language=en-US&page=1');
         return response;
     }
 }