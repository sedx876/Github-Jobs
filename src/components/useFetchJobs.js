import Axios from 'axios'
import {useReducer, useEffect} from 'react'

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
}


//'http://cors-anywhere.herokuapp.com/   ---put this in front of 
//URL to avoid CORS errors (work around)
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] }
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage }
    default:
      return state
  }
}

export default function useFetchJobs(params, page) {

  const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true })

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    Axios.get(BASE_URL, {
      params: { markdown: true, page: page, ...params }
    }).then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
    }).catch(e => {
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
    })
  }, [params, page])

  return state
}