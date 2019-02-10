import * as React from 'react'
import styles from './styles.scss'

import { AVAILABLE_APPS } from 'src/constants/index'
import Application from './components/Application'

const ApplicationsController: React.FunctionComponent = () => {
  const availableAppsEls = AVAILABLE_APPS.map((app: any) => (
    <li key={app.image} className={styles.applicationItem}>
      <Application applicationInfo={app} />
    </li>
  ))
  return (
    <div>
      <strong className={styles.title}>Available Apps</strong>
      <ul>{availableAppsEls}</ul>
    </div>
  )
}

export default ApplicationsController
