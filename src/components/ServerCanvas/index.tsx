import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import Server from 'src/store/features/server'
// import styles from './styles.scss'

type ServerCanvasType = {
  servers: Server[]
}

const ServerCanvas: React.FunctionComponent<ServerCanvasType> = ({
  servers,
}) => {
  if (!servers) {
    return null
  }
  const serversEl = servers.map(el => (
    <div>
      {el.id}
      {el.applicationIds.toString()}
    </div>
  ))
  return <div>{serversEl}</div>
}

export default inject(
  store => ({
    servers: store.cluster.servers,
  }),
  { observe: true },
)(ServerCanvas)
