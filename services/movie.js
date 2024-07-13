const fetchMovieApi = async (path) => {
    const url = `${path}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    };
  
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    } catch (err) {
      console.error('error:' + err);
      return null;
    }
    
} 

async function getCategories() {
    return fetchMovieApi('https://api.themoviedb.org/3/genre/movie/list');
  }

  async function getTopRated() {
    return fetchMovieApi('https://api.themoviedb.org/3/movie/top_rated');

  }

  async function getPopular() {
    return fetchMovieApi('https://api.themoviedb.org/3/movie/popular');
  }

  const getSingleCategory = async(genreId) =>{
    return fetchMovieApi(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`);
  }

  const getMovie = async (movieId) => {
    return fetchMovieApi(`https://api.themoviedb.org/3/movie/${movieId}`);
    }

export {getSingleCategory, getPopular, getTopRated, getCategories, getMovie};