import * as React from 'react'
import ServersContoller from '../ServersController'
import ApplicationsController from '../ApplicationsController'
// import styles from './styles.scss'

const Sidebar: React.FunctionComponent = () => {
  return (
    <div>
      <ServersContoller />
      <ApplicationsController />
    </div>
  )
}

export default Sidebar
