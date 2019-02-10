import * as uuid from 'uuid/v4'
import { observable, action } from 'mobx'
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
      console.log(destroyedServer.applicationIds)
    }
  }

  @action
  addApplication = (application: ApplicationInitialDataType) => {
    const newApplication = new Application(application)
    this.applications.push(newApplication)
  }

  destroyServerById(id: string) {
    const serverIndex = this.getServerIndexById(id)

    this.servers.splice(serverIndex, 1)
  }

  getServerById(id: string): Server | null {
    return this.servers.find((server: Server) => server.id === id) || null
  }

  getServerIndexById(id: string): number {
    return this.servers.findIndex((server: Server) => server.id === id)
  }

  startup() {
    for (let i = 0; i < INITIAL_SERVERS_AMOUNT; i++) {
      this.addServer()
    }
  }
}

export default Cluster
