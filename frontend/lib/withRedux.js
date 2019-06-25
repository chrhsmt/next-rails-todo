import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import withRedux from 'next-redux-wrapper'

export const initStore = (initialState = {}) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
};

export default withRedux(initStore)
