import * as React from 'react'
import ApplicationModel from 'src/store/features/application'
import { inject } from 'src/utils/storeInject'
import styles from './styles.scss'
import { AVAILABLE_APPS } from 'src/constants/index'

type ApplicationType = {
  applicationInfo: {
    name: string
    initials: string
  }
  application: ApplicationModel
  id: string
}

const Application: React.FunctionComponent<ApplicationType> = ({
  applicationInfo,
  application,
}) => {
  const containerClass = `${styles.container} ${styles[application.image]}`
  return (
    <div className={containerClass}>
      <span className={styles.initials}>{applicationInfo.initials}</span>
      <span className={styles.name}>{applicationInfo.name}</span>
    </div>
  )
}

export default inject(
  (store, { id }) => {
    const application = store.cluster.getApplicationById(id) as ApplicationModel
    const applicationInfo = AVAILABLE_APPS.find(
      appInfo => appInfo.image === application.image,
    )
    return {
      applicationInfo,
      application: store.cluster.getApplicationById(id),
    }
  },
  { observe: true },
)(Application)
