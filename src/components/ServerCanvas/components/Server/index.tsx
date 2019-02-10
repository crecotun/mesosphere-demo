import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import Application from '../Application'
import styles from './styles.scss'

type ServerType = {
  id: string
  server: any
  destroyServer: () => void
}

const Server: React.FunctionComponent<ServerType> = ({
  server,
  destroyServer,
}) => {
  const applicationsEls = server.applicationIds.map((appId: string) => (
    <Application key={appId} id={appId} />
  ))
  return (
    <div className={styles.container} onClick={destroyServer}>
      {applicationsEls}
    </div>
  )
}

export default inject(
  (store, { id }: any) => {
    return {
      server: store.cluster.getServerById(id),
      destroyServer: () => store.cluster.destroyServerById(id),
    }
  },
  { observe: true },
)(Server)
