import * as React from 'react'
import { inject } from 'src/utils/storeInject'
// import styles from './styles.scss'

type ServersContollerType = {
  addServer: () => void
  destroyServer: () => void
}

class ServersContoller extends React.Component<ServersContollerType> {
  addServer = (e: React.SyntheticEvent) => {
    e.preventDefault()

    this.props.addServer()
  }

  destroyServer = (e: React.SyntheticEvent) => {
    e.preventDefault()

    this.props.destroyServer()
  }

  render() {
    return (
      <div>
        <button type={'button'} onClick={this.addServer}>
          +
        </button>
        <button type={'button'} onClick={this.destroyServer}>
          -
        </button>
      </div>
    )
  }
}

export default inject(store => ({
  addServer: store.cluster.addServer,
  destroyServer: store.cluster.destroyServer,
}))(ServersContoller)
