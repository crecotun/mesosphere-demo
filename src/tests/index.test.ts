import { RootStore } from '../store'
import Cluster from '../store/features/cluster'
import { storeInitialData } from './initialData'

let rootStore: RootStore
let clusterStore: Cluster

beforeEach(() => {
  rootStore = new RootStore(storeInitialData)
  clusterStore = rootStore.cluster
})

describe('Cluster base operations', () => {
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

describe('Adding applications functionality', () => {
  test('add application', () => {
    clusterStore.addApplication({ id: 'application-11', image: 'rails' })
    expect(
      clusterStore
        .getServerById('server-2')
        .applicationIds.indexOf('application-11') > -1,
    ).toBe(true)
  })

  test('remove last added application', () => {
    clusterStore.removeApplication('spark')

    expect(clusterStore.getApplicationById('application-4')).toBe(null)
    expect(
      clusterStore
        .getServerById('server-4')
        .applicationIds.indexOf('application-4') === -1,
    ).toBe(true)
  })

  test('try to add more than possible apps', () => {
    clusterStore.addApplication({ id: 'application-5', image: 'rails' })
    clusterStore.addApplication({ id: 'application-6', image: 'rails' })
    clusterStore.addApplication({ id: 'application-7', image: 'rails' })
    clusterStore.addApplication({ id: 'application-8', image: 'rails' })
    clusterStore.addApplication({ id: 'application-9', image: 'rails' })

    expect(clusterStore.getApplicationById('application-9')).toBe(null)
  })

  // when removing a server and it's not possible to add an app to other server, destroy the app
})
