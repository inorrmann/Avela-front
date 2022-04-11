import axios from 'axios';

export default {
  addMovie: (name, likes) => {
    return axios.post('/api/movies', {name, likes});
  },

  findMovies: () => {
    return axios.get('/api/movies/all')
  },

  likeMovie: (id, likes) => {
    return axios.put('api/movies', {id, likes});
  }
}
