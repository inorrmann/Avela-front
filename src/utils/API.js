import axios from 'axios';

export default {
  addLeague: (name, latitude, longitude, budget) => {
    return axios.post('/api/leagues', {name, latitude, longitude, budget});
  },

  findLeague: (query) => {
    return axios.get('/api/leagues/', { params: query })
  }
}