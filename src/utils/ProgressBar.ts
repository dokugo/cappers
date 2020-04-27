import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../store/rootReducer'

NProgress.configure({
  template: `
    <div
      class="bar"
      role="bar"
      style="height: 4px; background: rgb(56, 151, 240);">
    </div>
  `,
})

const ProgressBar: FC<Props> = ({
  isGetDataLoading,
  isPostDeleteLoading,
  isPostUpdateLoading,
}) => {
  isGetDataLoading || isPostUpdateLoading || isPostDeleteLoading
    ? NProgress.start()
    : NProgress.done()

  return null
}

const mapStateToProps = (
  state: RootState
): {
  isGetDataLoading: boolean
  isPostUpdateLoading: boolean
  isPostDeleteLoading: boolean
} => ({
  isGetDataLoading: state.posts.isLoading.getData,
  isPostUpdateLoading: state.posts.isLoading.postUpdate,
  isPostDeleteLoading: state.posts.isLoading.postDelete,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(ProgressBar)
