import { useStaticRendering } from 'mobx-react'
import Cluster from './features/cluster'
import { storeInitialData } from 'src/tests/initialData'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class RootStore {
  public cluster: Cluster

  constructor(initialData?: any) {
    if (initialData) {
      this.cluster = new Cluster(initialData.cluster)
      return
    }

    this.cluster = new Cluster()
  }
}

let store: RootStore | null = null

export function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new RootStore(storeInitialData)
  }
  if (store === null) {
    store = new RootStore(storeInitialData)
    window['store'] = store
  }
  return store
}
