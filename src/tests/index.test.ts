import { RootStore } from '../store'
import Cluster from '../store/features/cluster'
import { storeInitialData } from './initialData'

let rootStore: RootStore
let clusterStore: Cluster

beforeEach(() => {
  rootStore = new RootStore(storeInitialData)
  clusterStore = rootStore.cluster
})

describe('Cluster', () => {
  test('startup', () => {
    expect(clusterStore.servers.length).toBe(
      storeInitialData.cluster.servers.length,
    )
  })

  test('add a server', () => {
    clusterStore.addServer()

    expect(clusterStore.servers.length).toBe(
      storeInitialData.cluster.servers.length + 1,
    )
  })

  test('destroy new server', () => {
    clusterStore.destroyServer()

    expect(clusterStore.servers.length).toBe(
      storeInitialData.cluster.servers.length - 1,
    )
  })

  test('destroy server by Id', () => {
    clusterStore.destroyServerById('server-2')

    expect(clusterStore.servers.length).toBe(
      storeInitialData.cluster.servers.length - 1,
    )
    expect(clusterStore.servers.find(server => server.id === 'server-2')).toBe(
      undefined,
    )
  })

  test('remove all servers', () => {
    clusterStore.destroyServers()
    expect(clusterStore.servers.length).toBe(0)
  })
})
