// @flow
import { updateViewer } from './viewer'
import type { ViwereType } from '../reducers/viewer'

export const withLoginDidMount = (viewer: ViwereType) => {
  return (dispatch) => {
    dispatch(updateViewer(viewer));
  }
}
