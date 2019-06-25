// @flow
import update from 'immutability-helper'

export type ViewerType = {
  loggedIn: boolean,
  user: {
    id: string,
    name: string
  }
};

const viewer = (state: ViewerType = {}, action) => {
  switch (action.type) {
    case 'UPDATE_VIEWER':
      return update(state, { $merge: action.payload.viewer });

    default:
      return state
  }
};

export default viewer
