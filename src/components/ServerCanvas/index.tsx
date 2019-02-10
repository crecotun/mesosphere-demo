import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import ServerModel from 'src/store/features/server'
import Server from './components/Server'
import styles from './styles.scss'

type ServerCanvasType = {
  servers: ServerModel[]
}

const ServerCanvas: React.FunctionComponent<ServerCanvasType> = ({
  servers,
}) => {
  if (!servers) {
    return null
  }
  const serversEl = servers.map(server => (
    <li key={server.id} className={styles.server}>
      <Server id={server.id} />
    </li>
  ))
  return (
    <div className={styles.container}>
      <strong className={styles.title}>Server Canvas</strong>
      <ul className={styles.servers}>{serversEl}</ul>
    </div>
  )
}

export default inject(
  store => ({
    servers: store.cluster.servers,
  }),
  { observe: true },
)(ServerCanvas)
