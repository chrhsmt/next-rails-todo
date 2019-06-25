// @flow
import { updateViewer } from './viewer'
import type { ViwereType } from '../reducers/viewer'

export const logInPageDidMount = (viewer: ViwereType) => {
  return (dispatch) => {
    dispatch(updateViewer(viewer));
  }
}
