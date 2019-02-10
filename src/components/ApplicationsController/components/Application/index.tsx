import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import { ApplicationImage } from 'src/types'
import styles from './styles.scss'

type ApplicationsControllerType = {
  applicationInfo: {
    name: string
    initials: string
    image: ApplicationImage
  }
  canAddApplication: boolean
  removeApplication: () => void
  addApplication: () => void
}

const ApplicationsController: React.FunctionComponent<
  ApplicationsControllerType
> = ({
  applicationInfo,
  canAddApplication,
  removeApplication,
  addApplication,
}) => {
  const className = `${styles.container} ${styles[applicationInfo.image]}`
  const addButtonClass = `${styles.button} ${styles.removeButton}`
  const removeButtonClass = `${styles.button} ${styles.addButton}`

  return (
    <div className={className}>
      <span>{applicationInfo.name}</span>

      <div className={styles.buttons}>
        <button
          type={'button'}
          className={removeButtonClass}
          onClick={removeApplication}
        >
          -
        </button>
        <button
          type={'button'}
          className={addButtonClass}
          onClick={addApplication}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default inject(
  (store, { applicationInfo }: any) => ({
    canAddApplication: store.cluster.canStartAnApp,
    removeApplication: () =>
      store.cluster.removeApplication(applicationInfo.image),
    addApplication: () =>
      store.cluster.addApplication({ image: applicationInfo.image }),
  }),
  { observe: true },
)(ApplicationsController)
