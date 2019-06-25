// @flow
import * as types from '../constants/ActionTypes'
import type { ViwereType } from '../reducers/viewer'

export const updateViewer = (viewer: ViwereType) => ({
  type: types.UPDATE_VIEWER,
  payload: {
    viewer
  }
});
