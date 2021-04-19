import { compose } from 'redux'
import { connect } from 'react-redux'
import { establishConnection } from './withWeb3/reducer'

import withMetamask from './withWeb3/component'
import withLayout from './withLayout/component'

const withPage = (Component) =>
  compose(
    connect(null, {
      initializeWeb3: establishConnection
    }),
    withMetamask,
    withLayout
  )(Component)

export default withPage
