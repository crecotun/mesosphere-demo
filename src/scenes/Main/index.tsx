import * as React from 'react'
import styles from './styles.scss'
import Sidebar from 'src/components/Sidebar'
import ServerCanvas from 'src/components/ServerCanvas'

const Main: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.canvas}>
        <ServerCanvas />
      </div>
    </div>
  )
}

export default Main
