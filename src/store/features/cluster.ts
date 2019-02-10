import * as uuid from 'uuid/v4'
import { observable, action, computed } from 'mobx'
import Application, {
  ApplicationInitialDataType,
} from 'src/store/features/application'
import Server, { ServerInitialDataType } from './server'
import { INITIAL_SERVERS_AMOUNT } from 'src/constants'

type CluserInitialDataType = {
  id: string
  createdAt: string
  servers: ServerInitialDataType[]
  applications: ApplicationInitialDataType[]
}

class Cluster {
  id?: string
  createdAt?: Date

  readonly servers = observable<Server>([])
  readonly applications = observable<Application>([])

  constructor(initialData?: CluserInitialDataType) {
    if (initialData) {
      this.rehydrate(initialData)
      return
    }

    this.id = uuid()
    this.createdAt = new Date()
    this.startup()
  }

  @action
  rehydrate = (initialData: CluserInitialDataType) => {
    this.id = initialData.id
    this.createdAt = new Date(initialData.createdAt)
    initialData.servers.forEach(server => this.servers.push(new Server(server)))
    initialData.applications.forEach(application =>
      this.applications.push(new Application(application)),
    )
  }

  @action
  addServer = (server?: ServerInitialDataType) => {
    const newServer = new Server(server)
    this.servers.push(newServer)
    return newServer.id
  }

  @action
  destroyServers = () => {
    this.servers.clear()
  }

  @action
  destroyServer = () => {
    const destroyedServer: Server | undefined = this.servers.pop()

    if (destroyedServer) {
      destroyedServer.applicationIds.forEach(applicationId => {
        const server = this.getServerById(this.getCapableServerId)
        if (server && this.canStartAnApp) {
          server.applicationIds.push(applicationId)
          return
        }

        this.removeApplicationById(applicationId)
      })
    }
  }

  @action
  addApplication = (application: ApplicationInitialDataType) => {
    if (!this.canStartAnApp) {
      return
    }

    if (this.getCapableServerId) {
      const server = this.getServerById(this.getCapableServerId) as Server
      const newApplication = new Application(application)
      this.applications.push(newApplication)
      server.applicationIds.push(newApplication.id)
    }
  }

  @action
  removeApplication = () => {
    const removedApplication = this.applications.pop() as Application

    this.servers.forEach((server: Server) => {
      const indexOfApp = server.applicationIds.indexOf(removedApplication.id)
      if (indexOfApp > -1) {
        server.applicationIds.splice(indexOfApp, 1)
      }
    })
  }

  @action
  removeApplicationById = (applicationId: string) => {
    const applicationIndex = this.getApplicationIndexById(applicationId)

    this.applications.splice(applicationIndex, 1)
  }

  @action
  destroyServerById(id: string) {
    const serverIndex = this.getServerIndexById(id)

    this.servers.splice(serverIndex, 1)
  }

  getServerById(id: string): Server | null {
    return this.servers.find((server: Server) => server.id === id) || null
  }

  getApplicationById(id: string): Application | null {
    return (
      this.applications.find(
        (application: Application) => application.id === id,
      ) || null
    )
  }

  getApplicationIndexById(id: string): number {
    return this.applications.findIndex(
      (application: Application) => application.id === id,
    )
  }

  getServerIndexById(id: string): number {
    return this.servers.findIndex((server: Server) => server.id === id)
  }

  startup() {
    for (let i = 0; i < INITIAL_SERVERS_AMOUNT; i++) {
      this.addServer()
    }
  }

  @computed
  get getCapableServerId(): string | null {
    const sortedByRunnedAppsServers: Server[] = this.servers
      .slice()
      .sort(
        (serverA: Server, serverB: Server) =>
          serverA.applicationIds.length - serverB.applicationIds.length,
      )

    const firstCapableServer = sortedByRunnedAppsServers[0]

    if (firstCapableServer && firstCapableServer.applicationIds.length < 2) {
      return firstCapableServer.id as string
    }

    return null
  }

  @computed
  get canStartAnApp(): boolean {
    return Boolean(
      this.servers.find((server: Server) => server.applicationIds.length < 2),
    )
  }
}

export default Cluster
