import * as React from 'react'
// import styles from './styles.scss'

import { AVAILABLE_APPS } from 'src/constants/index'
import Application from './components/Application'

const ApplicationsController: React.FunctionComponent = () => {
  const availableAppsEls = AVAILABLE_APPS.map((app: any) => (
    <Application applicationInfo={app} key={app.image} />
  ))
  return <div>{availableAppsEls}</div>
}

export default ApplicationsController
