import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import viewer from './viewer'

const reducer = combineReducers({
  form,
  viewer
});

export default reducer;
