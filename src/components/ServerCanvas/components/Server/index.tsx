import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import Application from '../Application'
import styles from './styles.scss'

type ServerType = {
  id: string
  server: any
}

const Server: React.FunctionComponent<ServerType> = ({ server }) => {
  const applicationsEls = server.applicationIds.map((appId: string) => (
    <Application id={appId} />
  ))
  return <div className={styles.container}>{applicationsEls}</div>
}

export default inject(
  (store, { id }: any) => {
    return {
      server: store.cluster.getServerById(id),
    }
  },
  { observe: true },
)(Server)
