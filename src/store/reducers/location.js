import { SET_LOCATION } from '../actions/locationAction'

const location = (state = {}, action) => {
  switch(action.type) {
  case SET_LOCATION: return action.payload
  default: return state
  }
}

export default location