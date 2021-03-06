import axios from 'axios'
import changeCase from 'change-case'
import slug from 'slug'

export const FETCH_COMINGSOON_MOVIES_PROGRESS = 'FETCH_COMINGSOON_MOVIES_PROGRESS'
export const FETCH_COMINGSOON_MOVIES_SUCCESS = 'FETCH_COMINGSOON_MOVIES_SUCCESS'
export const FETCH_COMINGSOON_MOVIES_FAILURE = 'FETCH_COMINGSOON_MOVIES_FAILURE'

const fetchMoviesInProgress = {
  type: FETCH_COMINGSOON_MOVIES_PROGRESS
}

const movieDataFetched = (data) => ({
  type: FETCH_COMINGSOON_MOVIES_SUCCESS, 
  payload: data,
})

const movieDataFetchFailure = {
  type: FETCH_COMINGSOON_MOVIES_FAILURE,
}

const fetchComingSoonMovies = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesInProgress)
    try {
      const movies = await axios.get('http://localhost:9090/v1/movies/1/upcoming/')
  
      const moviesData = movies.data.map(movie => {
        const sluggedData = slug(changeCase.sentenceCase(movie.name), { lower: true })
        return {...movie, slug: sluggedData}
      })  
      dispatch(movieDataFetched(moviesData))
    } catch(error) {
      dispatch(movieDataFetchFailure)
    }
  }
}

export default fetchComingSoonMovies
